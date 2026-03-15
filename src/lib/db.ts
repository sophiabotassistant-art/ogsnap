// Database schema for OGSnap
// Using Neon PostgreSQL (serverless)

export interface User {
  id: string;
  email: string;
  name?: string;
  plan: 'free' | 'starter' | 'pro' | 'scale';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  apiKey: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Usage {
  id: string;
  userId: string;
  month: string; // YYYY-MM format
  imageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiRequest {
  id: string;
  userId: string;
  template: string;
  params: Record<string, string>;
  cached: boolean;
  responseTimeMs: number;
  createdAt: Date;
}

// Plan limits
export const PLAN_LIMITS = {
  free: { images: 100, overage: 0 },
  starter: { images: 5000, overage: 0.002 },
  pro: { images: 25000, overage: 0.001 },
  scale: { images: 100000, overage: 0.0008 },
} as const;

// SQL schema for reference (to run in Neon dashboard)
export const SQL_SCHEMA = `
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'scale')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  api_key TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  month TEXT NOT NULL, -- YYYY-MM format
  image_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, month)
);

CREATE TABLE api_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  template TEXT NOT NULL,
  params JSONB,
  cached BOOLEAN DEFAULT false,
  response_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_api_key ON users(api_key);
CREATE INDEX idx_usage_user_month ON usage(user_id, month);
CREATE INDEX idx_requests_user ON api_requests(user_id);
`;

// Generate a random API key
export function generateApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const prefix = 'og_';
  let key = '';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return prefix + key;
}
