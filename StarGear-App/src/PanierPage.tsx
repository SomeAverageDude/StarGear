import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "./helper/navbar";
import Footer from "./helper/footer";

type Jeu = {
  igdb_id: number;
  nom: string;
  description?: string;
  cover?: string;
  prix: number | string;
};

type Panier = {
  userId: string;
  jeux: Jeu[];
  updatedAt: string;
};

export default function PanierPage() {
  const [panier, setPanier] = useState<Panier | null>(null);

  useEffect(() => {
    async function recupererPanier() {
      try {
        const response = await fetch("http://localhost:4000/panier/recuperer", {
          method: "GET",
          credentials: "include",
        });

        const text = await response.text();

        if (!response.ok) {
          throw new Error(text);
        }

        setPanier(JSON.parse(text));
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors du chargement du panier.");
      }
    }

    recupererPanier();
  }, []);

  async function supprimerJeu(igdbId: number) {
    const response = await fetch(
      `http://localhost:4000/panier/supprimer/${igdbId}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (response.ok) {
      setPanier((ancien) => {
        if (!ancien) return ancien;

        return {
          ...ancien,
          jeux: ancien.jeux.filter((jeu) => jeu.igdb_id !== igdbId),
        };
      });

      toast.success("Jeu supprimé du panier");
    }
  }

  async function viderPanier() {
    const response = await fetch("http://localhost:4000/panier/vider", {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      setPanier((ancien) => {
        if (!ancien) return ancien;

        return {
          ...ancien,
          jeux: [],
        };
      });

      toast.success("Panier vidé");
    }
  }

  async function acheter() {
    if (!panier || panier.jeux.length === 0) return;

    try {
      const response = await fetch(
        "http://localhost:4000/bibliotheque/acheter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            listeJeux: panier.jeux,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Une erreur est survenue lors de l'achat.",
        );
      }

      toast.success(
        "Achat réussi ! Les jeux ont été ajoutés à votre bibliothèque.",
      );

      setPanier((ancien) => {
        if (!ancien) return ancien;
        return { ...ancien, jeux: [] };
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Impossible de finaliser l'achat.");
    }
  }

  if (!panier) {
    return <div className="text-white p-5">Chargement...</div>;
  }

  const total = panier.jeux.reduce((somme, jeu) => {
    const prix = Number(jeu.prix);
    return somme + (isNaN(prix) ? 0 : prix);
  }, 0);

  return (
    <div className="min-vh-100 bg-dark text-white">
      <Navbar />

      <div className="container py-5">
        <h1 className="mb-4">Mon panier</h1>

        {panier.jeux.length === 0 && <p>Ton panier est vide.</p>}

        {panier.jeux.map((jeu) => (
          <div
            key={jeu.igdb_id}
            className="card bg-secondary text-white mb-3 overflow-hidden"
            style={{ height: "12rem" }}
          >
            <div className="row g-0 h-100">
              <div className="col-md-3 h-100">
                <img
                  src={jeu.cover || "/placeholder.jpg"}
                  alt={jeu.nom}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <div className="col-md-9 h-100">
                <div
                  className="card-body d-flex flex-column h-100 py-2 "
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                  <h5 className="card-title mb-1">{jeu.nom}</h5>

                  <p
                    className="card-text mb-2"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {jeu.description}
                  </p>

                  <p className="card-text fw-bold mt-auto mb-2">
                    Prix : {Number(jeu.prix).toFixed(2)}$
                  </p>

                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => supprimerJeu(jeu.igdb_id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {panier.jeux.length > 0 && (
          <div className="mt-4 p-4 bg-secondary rounded bg-opacity-25 border border-secondary">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <h4 className="mb-0">
                Total :{" "}
                <span className="fw-bold text-success">
                  {total.toFixed(2)}$
                </span>
              </h4>

              <div className="d-flex gap-2 mt-2 mt-sm-0">
                <button
                  className="btn btn-outline-danger"
                  onClick={viderPanier}
                >
                  Vider le panier
                </button>

                <button className="btn btn-success px-4" onClick={acheter}>
                  Acheter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
