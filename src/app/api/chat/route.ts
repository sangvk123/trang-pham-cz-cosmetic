import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import productsJson from '@/data/products.json';
import { categories } from '@/data/categories';

// Lazy init — avoid crash if key is missing at module load
let _client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  }
  return _client;
}

// Build a concise product catalog for the system prompt
function buildCatalog(): string {
  const lines: string[] = [];

  for (const cat of categories) {
    lines.push(`\n## ${cat.name.en} (${cat.name.vi} / ${cat.name.cs})`);
    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        const prods = productsJson.filter(
          (p) => p.subcategory === sub.id
        );
        if (prods.length === 0) continue;
        lines.push(`### ${sub.name.en} (${sub.name.vi})`);
        for (const p of prods) {
          lines.push(
            `- [${p.id}] ${p.name} | ${p.brand} | ${p.price} CZK | ${p.inStock ? 'In stock' : 'Out of stock'} | slug: ${p.slug}`
          );
        }
      }
    }
    // Products directly in category (no subcategory)
    const directProds = productsJson.filter(
      (p) => p.category === cat.id && !p.subcategory
    );
    for (const p of directProds) {
      lines.push(
        `- [${p.id}] ${p.name} | ${p.brand} | ${p.price} CZK | ${p.inStock ? 'In stock' : 'Out of stock'} | slug: ${p.slug}`
      );
    }
  }

  return lines.join('\n');
}

const catalog = buildCatalog();

const SYSTEM_PROMPT = `You are the shopping assistant for Trang Pham Cosmetics, a Korean beauty (K-Beauty) e-commerce store based in Prague, Czech Republic. Your name is "Trợ lý Trang Pham".

## Store Info
- Store: Trang Pham Cosmetics
- Location: Prague, Czech Republic
- Phone/Zalo: (+420) 607 715 020
- Facebook: https://www.facebook.com/trangptt.2011
- Email: info@trangphamcosmetics.cz
- Free shipping for orders over 1,500 CZK
- 14-day return policy
- Current promo: 10% off first order with code WELCOME10

## Your Role
- Help customers find products, give skincare advice, answer questions about orders/shipping
- Be friendly, concise, and helpful. Use emoji sparingly (1-2 per message max)
- Respond in the SAME LANGUAGE the customer writes in (Vietnamese, Czech, or English)
- When recommending products, include the product name, price, and the product page link in this format: [Product Name](/products/slug-here)
- When suggesting products, recommend max 3-4 most relevant ones
- You can suggest adding products to cart
- If the customer asks something outside your scope (medical advice, competitor products, etc.), politely redirect

## Product Catalog
${catalog}

## Important Rules
- Only recommend products from the catalog above. Never invent products.
- Always include prices in CZK when mentioning products
- Keep responses SHORT (2-4 sentences max, unless listing products)
- If you don't know something specific about a product (ingredients, exact usage), say so and suggest contacting via Facebook for details
- For order placement: customers add to cart on the website, then contact via Facebook/Zalo to complete the order`;

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages required' },
        { status: 400 }
      );
    }

    // Limit conversation length server-side as well
    const trimmedMessages = messages.slice(-30);

    const response = await getClient().messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: trimmedMessages,
    });

    const text =
      response.content[0].type === 'text' ? response.content[0].text : '';

    return NextResponse.json({ reply: text });
  } catch (error: unknown) {
    console.error('Chat API error:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    const errName = error instanceof Error ? error.constructor.name : 'Error';
    return NextResponse.json(
      { error: errMsg, type: errName },
      { status: 500 }
    );
  }
}
