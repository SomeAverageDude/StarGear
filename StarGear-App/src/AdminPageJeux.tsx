import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "./helper/navbar";
import Footer from "./helper/footer";
import { useNavigate } from "react-router";

type Jeu = {
  igdb_id: number;
  nom: string;
  developpeur: string | null;
  cover: string | null;
};

const API_IGDB = "http://localhost:4000/igdb";
const API_ADMIN = "http://localhost:4000/admin";

export default function AdminGamesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const [blacklisted, setBlacklisted] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const [games, ids] = await Promise.all([
        fetch(`${API_IGDB}/search?q=${encodeURIComponent(query)}&admin=true`, {
          credentials: "include",
        }).then((r) => r.json()),
        fetch(`${API_ADMIN}/jeux/blacklist`, {
          credentials: "include",
        }).then((r) => r.json()),
      ]);
      setJeux(Array.isArray(games) ? games : []);
      setBlacklisted(new Set(ids));
    } catch {
      toast.error("Erreur recherche");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (igdb_id: number) => {
    const isBlacklisted = blacklisted.has(igdb_id);
    fetch(`${API_ADMIN}/jeux/${igdb_id}/blacklist`, {
      method: isBlacklisted ? "DELETE" : "PUT",
      credentials: "include",
    })
      .then(() => {
        setBlacklisted((prev) => {
          const next = new Set(prev);
          isBlacklisted ? next.delete(igdb_id) : next.add(igdb_id);
          return next;
        });
        toast.success(isBlacklisted ? "Jeu remis en vente" : "Jeu retiré de la vente");
      })
      .catch(() => toast.error("Erreur"));
  };

  return (
    <div className="bg-black text-white d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Navbar />

      <div style={{ background: "linear-gradient(180deg,#7a0000 0%,#1a0000 50%,#000 100%)", padding: "44px 0 32px" }}>
        <div className="container">
          <h1 className="fw-bold text-uppercase mb-1">Panel <span className="text-danger">Administrateur</span></h1>
          <small className="text-secondary text-uppercase" style={{ letterSpacing: 3 }}>Gestion des jeux</small>
          <br /><br />
          <button className="btn btn-danger btn-sm rounded-4" onClick={() => navigate("/AdminPage")}>
            Gérer les utilisateurs
          </button>
        </div>
      </div>

      <div className="container py-4 flex-grow-1">
        <form className="d-flex gap-2 mb-4" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Rechercher un jeu..."
            className="form-control bg-dark text-white border-secondary"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-danger px-4" disabled={loading}>
            {loading ? "..." : "Chercher"}
          </button>
        </form>

        {jeux.length > 0 && (
          <table className="table table-dark table-hover">
            <thead className="border-bottom border-danger border-opacity-25">
              <tr>
                <th style={{ width: 48 }}></th>
                <th>Nom</th>
                <th>Développeur</th>
                <th>Statut</th>
                <th style={{ width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jeux.map((jeu) => {
                const isBlocked = blacklisted.has(jeu.igdb_id);
                return (
                  <tr key={jeu.igdb_id} style={{ opacity: isBlocked ? 0.5 : 1 }} >
                    <td>
                      {jeu.cover
                        ? <img src={jeu.cover} alt="" style={{ width: 32, height: 42, objectFit: "cover", borderRadius: 4 }} />
                        : <div style={{ width: 32, height: 42, background: "#222", borderRadius: 4 }} />
                      
                      }
                    </td>
                    <td className="align-middle" onClick={() => navigate("/Jeu/" + jeu.igdb_id)} style={{ cursor: "pointer" }}>
                      {jeu.nom}
                    </td>
                    <td className="align-middle text-secondary">{jeu.developpeur ?? "—"}</td>
                    <td className="align-middle">
                      <span className={`badge ${isBlocked ? "bg-danger" : "bg-success"}`}>
                        {isBlocked ? "Retiré" : "En vente"}
                      </span>
                    </td>
                    <td className="align-middle">
                      <button
                        className={`btn btn-sm ${isBlocked ? "btn-outline-success" : "btn-outline-danger"}`}
                        onClick={() => handleToggle(jeu.igdb_id)}
                      >
                        {isBlocked ? "Remettre en vente" : "Retirer"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {jeux.length === 0 && !loading && query && (
          <p className="text-secondary text-center mt-5">Aucun résultat pour « {query} »</p>
        )}

        {jeux.length === 0 && !query && (
          <p className="text-secondary text-center mt-5">Recherchez un jeu pour commencer.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}