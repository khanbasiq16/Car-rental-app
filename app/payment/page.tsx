"use client";
import Checkoutform from "@/components/Payment/Checkoutform";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Page() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
  
    fetch("/api/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 10.99 }), 
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options: any = {
    clientSecret,
    appearance: { theme: "stripe" },
  };

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <Checkoutform />
    </Elements>
  ) : (
    <p className="text-center">Loading payment form...</p>
  );
}
