// src/pages/SubscriptionSuccess.tsx
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SubscriptionSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // Optional: verify session or show user-specific data
      console.log("Session ID:", sessionId);
    }
  }, [sessionId]);

  return <h1>🎉 Subscription Successful!</h1>;
};

export default SubscriptionSuccess;
