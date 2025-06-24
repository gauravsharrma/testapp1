const { useState } = React;

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setBmi(null);
      return;
    }
    const hMeters = h / 100;
    setBmi(w / (hMeters * hMeters));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-center mb-4">BMI Calculator</h1>
      <div className="bg-gray-100 p-4 rounded neo space-y-4">
        <div className="space-y-2">
          <label className="block">Weight (kg)</label>
          <input
            type="number"
            className="w-full p-2 rounded border neo"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block">Height (cm)</label>
          <input
            type="number"
            className="w-full p-2 rounded border neo"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded neo"
          onClick={calculateBMI}
        >
          Calculate
        </button>
      </div>
      {bmi && (
        <div className="bg-gray-100 p-4 rounded neo">
          Your BMI: <span className="font-semibold">{bmi.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(
  <Layout>
    <div className="w-full max-w-md">
      <BMICalculator />
    </div>
  </Layout>,
  document.getElementById('root')
);

