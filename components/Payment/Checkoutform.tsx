"use client";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useState } from "react";

export default function Checkoutform() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
    const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      console.error(error.message);
      setMessage(error.message || "Payment failed");
    }

    setLoading(false);
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Complete Your Payment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
        <PaymentElement />

        <button
          type="submit"
          disabled={!stripe || !elements || loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Processing..." : `Pay Now ${carAmount}`}
        </button>

        {message && <div className="text-red-500 text-sm text-center">{message}</div>}
      </form>
    </div>
  );
}
