import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

type Jeu = {
  nom_jeu: string;
  prix: number;
  id_jeu: number;
    lien: string;

};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Jeu[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) return setResults([]);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/jeux/search?nom_jeu=${query}`,
        );
        const data: Jeu[] = await res.json();
        setResults(data);
      } catch {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div
      className="container mt-4 position-relative"
      style={{ maxWidth: "500px" }}
    >
      <input
        type="search"
        className="form-control"
        placeholder="Rechercher un jeu..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div
          className="list-group mt-2 shadow"
          style={{
            backgroundColor: "#1a1a1a",
            position: "absolute",
            zIndex: 1000,
            width: "100%",
            borderRadius: "8px",
          }}
        >
          {" "}
          {results.length === 0 ? (
            <div className="list-group-item text-muted text-center">
              Aucun résultat
            </div>
          ) : (
            results.map((g, i) => (
              <div
                key={i}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                onClick={() => navigate(`/Jeu/${g.id_jeu}`)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#1a1a1a",
                  color: "white",
                  borderColor: "#333",
                }}
              >
<img
  src={g.lien}
  alt={g.nom_jeu}
  style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
/>                <span>{g.nom_jeu}</span>
                <span className="fw-bold">{g.prix}$</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
