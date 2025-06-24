function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-100 neo text-center font-bold text-xl">
        ✨ Apps That Matter
      </header>
      <main className="flex-1 p-4 flex flex-col items-center">
        {children}
      </main>
      <footer className="p-4 bg-gray-100 neo text-center">
        &copy; {new Date().getFullYear()} Apps That Matter
      </footer>
    </div>
  );
}

