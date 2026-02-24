"use client";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold font-sans">Gestion des Bourses</h1>
        <button className="bg-salma-primary text-white px-4 py-2 rounded-lg">
          + Ajouter une bourse
        </button>
      </header>

      {/* Tableau vide pour collaborateur B */}
      <div className="bg-salma-surface border border-salma-border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-salma-bg border-b border-salma-border">
            <tr>
              <th className="p-4">Titre</th>
              <th className="p-4">Pays</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 text-salma-text-muted italic" colSpan={3}>
                Aucune donnée (En attente du backend Django)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}