import React, { useState } from 'react';
import './LoanCalculator.css';

export const LoanCalculator = () => {
  const [amount, setAmount] = useState(20000);
  const [months, setMonths] = useState(36);

  const monthlyPayment = Math.round((amount / months) * 1.12);

  return (
    <div className="loan-calculator" id="loan">
      <h2>Кредитний калькулятор CarPoint</h2>
      <div className="calc-group">
        <label>Сума кредиту: ${amount}</label>
        <input 
          type="range" 
          min="1000" 
          max="50000" 
          step="1000" 
          value={amount} 
          onChange={(e) => setAmount(Number(e.target.value))} 
        />
      </div>
      <div className="calc-group">
        <label>Термін: {months} місяців</label>
        <input 
          type="range" 
          min="6" 
          max="60" 
          step="6" 
          value={months} 
          onChange={(e) => setMonths(Number(e.target.value))} 
        />
      </div>
      <div className="calc-result">
        Орієнтовний платіж: <strong>${monthlyPayment} / міс</strong>
      </div>
    </div>
  );
};