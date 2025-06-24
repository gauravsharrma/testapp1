const { useState, useEffect } = React;

function App() {
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetch('/api/apps')
      .then(res => res.json())
      .then(data => setApps(data));
  }, []);

  const categories = Array.from(new Set(apps.map(a => a.category)));

  const filteredApps = apps.filter(app => {
    const matchesName = app.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? app.category === category : true;
    return matchesName && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-100 neo text-center font-bold text-xl">Apps That Matter</header>
      <main className="flex-1 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          <input
            className="p-2 border rounded neo flex-1"
            placeholder="Search apps..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="p-2 border rounded neo"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredApps.map(app => (
            <div key={app.name} className="p-4 bg-gray-100 rounded neo">
              <h2 className="font-semibold text-lg">{app.name}</h2>
              <p className="text-sm">{app.description}</p>
              <span className="text-xs text-gray-600">{app.category}</span>
            </div>
          ))}
        </div>
      </main>
      <footer className="p-4 bg-gray-100 neo text-center">&copy; {new Date().getFullYear()} Apps That Matter</footer>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
