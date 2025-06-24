const { useState, useEffect } = React;

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function AppCard({ app }) {
  return (
    <a
      href={`/apps/${slugify(app.name)}/`}
      className="block transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="p-4 bg-white rounded-xl shadow-lg space-y-2 neo">
        <h2 className="font-semibold text-lg">{app.name}</h2>
        <p className="text-sm text-gray-700">{app.description}</p>
        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
          {app.category}
        </span>
      </div>
    </a>
  );
}

function App() {
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetch('/api/apps')
      .then((res) => res.json())
      .then((data) => setApps(data));
  }, []);

  const categories = Array.from(new Set(apps.map((a) => a.category)));

  const filteredApps = apps.filter((app) => {
    const matchesName = app.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? app.category === category : true;
    return matchesName && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-100 neo text-center font-bold text-xl">
        ✨ Apps That Matter
      </header>
      <main className="flex-1 p-4 space-y-4">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <input
            className="flex-1 p-2 border rounded-xl neo"
            placeholder="Search apps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-2 border rounded-xl neo"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredApps.map((app) => (
            <AppCard key={app.name} app={app} />
          ))}
        </div>
      </main>
      <footer className="p-4 bg-gray-100 neo text-center">
        &copy; {new Date().getFullYear()} Apps That Matter
      </footer>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
