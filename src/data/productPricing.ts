export type ProductPlanId = 'week' | 'monthly' | 'lifetime' | 'onetime';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  priceUsd: number;
  priceNote: string;
}

const monthlyPlan: ProductPlan = {
  id: 'monthly',
  label: 'Monthly',
  priceUsd: 35,
  priceNote: 'Full access for 30 days',
};

const lifetimePlan: ProductPlan = {
  id: 'lifetime',
  label: 'Lifetime',
  priceUsd: 150,
  priceNote: 'One-time payment, lifetime access',
};

/** Lite, Pro, Elite, tiers hub */
const cheatTierPlans: ProductPlan[] = [monthlyPlan, lifetimePlan];

/** HWID Spoofer — monthly only */
const spooferPlans: ProductPlan[] = [monthlyPlan];

/** UGC & Skin Changer */
const utilityDualPlans: ProductPlan[] = [monthlyPlan, lifetimePlan];

export function getProductPlans(productSlug: string): ProductPlan[] {
  if (productSlug === 'hwid-spoofer') return spooferPlans;
  if (productSlug === 'ugc' || productSlug === 'skin-changer') return utilityDualPlans;
  return cheatTierPlans;
}

export function formatPlanPrice(usd: number): string {
  return `$${usd.toFixed(2)}`;
}

export function checkoutUrlWithPlan(baseUrl: string, planId: ProductPlanId): string {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}plan=${planId}`;
}
