const { useState } = React;

function EMICalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [tenureType, setTenureType] = useState('months');
  const [result, setResult] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const nVal = parseFloat(tenure);
    if (isNaN(P) || isNaN(annualRate) || isNaN(nVal) || P <= 0 || annualRate <= 0 || nVal <= 0) {
      setResult(null);
      return;
    }
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = tenureType === 'years' ? nVal * 12 : nVal;
    const numerator = P * monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
    const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1;
    const emi = numerator / denominator;
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - P;
    setResult({ emi, totalInterest, totalPayment });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-center mb-4">EMI Calculator</h1>
      <div className="bg-gray-100 p-4 rounded neo space-y-4">
        <div className="space-y-2">
          <label className="block">Loan Amount (₹)</label>
          <input
            type="number"
            className="w-full p-2 rounded border neo"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block">Annual Interest Rate (%)</label>
          <input
            type="number"
            className="w-full p-2 rounded border neo"
            value={rate}
            onChange={e => setRate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block">Tenure</label>
          <div className="flex space-x-2">
            <input
              type="number"
              className="flex-1 p-2 rounded border neo"
              value={tenure}
              onChange={e => setTenure(e.target.value)}
            />
            <select
              className="p-2 rounded border neo"
              value={tenureType}
              onChange={e => setTenureType(e.target.value)}
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded neo"
          onClick={calculateEMI}
        >
          Calculate
        </button>
      </div>
      {result && (
        <div className="bg-gray-100 p-4 rounded neo space-y-2">
          <div>EMI per month: <span className="font-semibold">₹{result.emi.toFixed(2)}</span></div>
          <div>Total interest payable: <span className="font-semibold">₹{result.totalInterest.toFixed(2)}</span></div>
          <div>Total repayment: <span className="font-semibold">₹{result.totalPayment.toFixed(2)}</span></div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(
  <Layout>
    <div className="w-full max-w-md">
      <EMICalculator />
    </div>
  </Layout>,
  document.getElementById('root')
);
