import subscriptionData from '../data/subscriptionData.json';

export const getPlans = () => subscriptionData.plans;
export const getAddOns = () => subscriptionData.addOns;
export const getBillingCycles = () => subscriptionData.billing.cycles;
export const getFeatures = () => subscriptionData.features;

export const calculatePrice = (
  planId: string, 
  isYearly: boolean, 
  extraScans: number = 0
) => {
  const plan = subscriptionData.plans[planId as keyof typeof subscriptionData.plans];
  const basePrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const extraScanPrice = isYearly 
    ? subscriptionData.addOns.extraScans.yearlyPrice 
    : subscriptionData.addOns.extraScans.monthlyPrice;
  
  return basePrice + (extraScanPrice * extraScans);
};

export const getScanLimit = (planId: string) => {
  const plan = subscriptionData.plans[planId as keyof typeof subscriptionData.plans];
  return plan.scanLimit;
};

export const getExtraScanQuantity = () => subscriptionData.addOns.extraScans.quantity;

export const getPlanFeatures = (planId: string) => {
  const plan = subscriptionData.plans[planId as keyof typeof subscriptionData.plans];
  return plan.features;
};

export const getSupportLevel = (planId: string) => {
  const plan = subscriptionData.plans[planId as keyof typeof subscriptionData.plans];
  return subscriptionData.features.supportLevels[plan.supportLevel as keyof typeof subscriptionData.features.supportLevels];
};

export const getResolution = (planId: string) => {
  const plan = subscriptionData.plans[planId as keyof typeof subscriptionData.plans];
  return plan.resolution;
};

export const getExportFormats = (planId: string) => {
  const plan = subscriptionData.plans[planId as keyof typeof subscriptionData.plans];
  return plan.exportFormats;
}; 