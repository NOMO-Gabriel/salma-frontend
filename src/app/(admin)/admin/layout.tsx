export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Ici on pourra ajouter une Sidebar plus tard */}
      <main className="flex-1">
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
          <span className="font-bold text-salma-primary">SALMA ADMIN</span>
          <button className="text-sm text-red-600">Déconnexion</button>
        </header>
        {children}
      </main>
    </div>
  );
}