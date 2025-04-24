
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">About Us</h1>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6 text-foreground">
          <p>
            Welcome to our Crypto Price Tracker! We provide real-time cryptocurrency
            price tracking and market data analysis tools to help you stay informed
            about the crypto market.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">Our Mission</h2>
          <p>
            Our mission is to provide accurate, up-to-date cryptocurrency market data
            in an easy-to-understand format, helping both newcomers and experienced
            traders make informed decisions.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Real-time price updates</li>
            <li>Price change tracking (1h, 24h, 7d)</li>
            <li>Market cap and volume information</li>
            <li>Supply statistics</li>
            <li>7-day price charts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
