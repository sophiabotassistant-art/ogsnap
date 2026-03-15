// Rate limiting with Upstash Redis

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis client (uses UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Rate limiters for different tiers
export const rateLimiters = {
  // Free tier: 10 requests per minute
  free: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    analytics: true,
    prefix: 'ratelimit:free',
  }),
  
  // Starter tier: 60 requests per minute
  starter: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '1 m'),
    analytics: true,
    prefix: 'ratelimit:starter',
  }),
  
  // Pro tier: 120 requests per minute
  pro: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(120, '1 m'),
    analytics: true,
    prefix: 'ratelimit:pro',
  }),
  
  // Scale tier: 300 requests per minute
  scale: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(300, '1 m'),
    analytics: true,
    prefix: 'ratelimit:scale',
  }),
  
  // Anonymous: 5 requests per minute (for playground)
  anonymous: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    analytics: true,
    prefix: 'ratelimit:anon',
  }),
};

export type PlanType = keyof typeof rateLimiters;

// Check rate limit for a user
export async function checkRateLimit(identifier: string, plan: PlanType = 'anonymous') {
  const limiter = rateLimiters[plan] || rateLimiters.anonymous;
  const result = await limiter.limit(identifier);
  
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

// Image caching with Redis
export async function getCachedImage(key: string): Promise<string | null> {
  try {
    return await redis.get(key);
  } catch {
    return null;
  }
}

export async function setCachedImage(key: string, imageUrl: string, ttlSeconds = 86400): Promise<void> {
  try {
    await redis.setex(key, ttlSeconds, imageUrl);
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

// Generate cache key from request params
export function generateCacheKey(params: Record<string, string>): string {
  const sorted = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&');
  return `img:${Buffer.from(sorted).toString('base64').slice(0, 64)}`;
}
