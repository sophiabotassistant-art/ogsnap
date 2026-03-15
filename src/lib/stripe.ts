// Stripe integration for OGSnap

// Price IDs (to be created in Stripe dashboard)
export const STRIPE_PRICES = {
  starter: process.env.STRIPE_PRICE_STARTER || 'price_starter',
  pro: process.env.STRIPE_PRICE_PRO || 'price_pro',
  scale: process.env.STRIPE_PRICE_SCALE || 'price_scale',
} as const;

// Stripe webhook events we care about
export const WEBHOOK_EVENTS = [
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.paid',
  'invoice.payment_failed',
] as const;

// Map Stripe price IDs to plan names
export function getPlanFromPriceId(priceId: string): 'starter' | 'pro' | 'scale' | null {
  const entries = Object.entries(STRIPE_PRICES);
  for (const [plan, id] of entries) {
    if (id === priceId) {
      return plan as 'starter' | 'pro' | 'scale';
    }
  }
  return null;
}

// Stripe checkout session config
export function getCheckoutConfig(plan: 'starter' | 'pro' | 'scale', customerId?: string) {
  return {
    mode: 'subscription' as const,
    payment_method_types: ['card'] as const,
    line_items: [
      {
        price: STRIPE_PRICES[plan],
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`,
    ...(customerId ? { customer: customerId } : {}),
  };
}
