import React, { useState } from 'react';
import Plans from './Plans';
import AddOns from './AddOn';
import Payment from './Payment';
import UserService from '../service/userServce';
const Home = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const [extraScans, setExtraScans] = useState(0);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handlePlanSelect = (plan: string | null) => {
    setSelectedPlan(plan);
    setExtraScans(0); // reset add-ons when switching plans
  };

  const userInfo = UserService.getTokenParsed();
  
  const handlePay = async () => {
    if (!selectedPlan) {
      setPaymentError("Please select a plan before proceeding to payment.");
      return;
    }
  
    const totalScans = 100 + extraScans; // Or however you calculate base scans
    const totalAmount = (isYearly ? 10000 : 1000) + (extraScans * 200); // adjust if needed
  
    setIsPaying(true);
    setPaymentError(null);
  
    try {
      const res = await fetch('http://localhost:4321/api/payments/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentUser: userInfo?.preferred_username || 'unknown',
          plan: selectedPlan,
          isYearly,
          extraScans,
          totalScans,
          totalAmount,
        }),
      });
  
      const data = await res.json();
      if (data.data?.url) {
        window.location.href = data.data.url;
      } else {
        setPaymentError("Unable to create checkout session.");
      }
    } catch (err) {
      console.error(err);
      setPaymentError("Something went wrong.");
    } finally {
      setIsPaying(false);
    }
  };
  

  return (
    <>
      {/* Always show Plans */}
      <Plans
        selectedPlan={selectedPlan}
        onPlanSelect={handlePlanSelect}
        onIsYearlyChange={setIsYearly}
      />

      {/* Always show AddOns, but disable interactivity if no plan selected */}
      <AddOns
        selectedPlan={selectedPlan}
        isYearly={isYearly}
        extraScans={extraScans}
        setExtraScans={selectedPlan ? setExtraScans : () => {}}
      />

      {/* Always show Payment */}
      <Payment
        onPay={handlePay}
        isPaying={isPaying}
        error={paymentError}
      />
    </>
  );
};

export default Home;
