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

        const response = await fetch(
          "http://localhost:4000/panier/recuperer",
          {
            method: "GET",
            credentials: "include",
          }
        );

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
      }
    );

    if (response.ok) {

      setPanier((ancien) => {
        if (!ancien) return ancien;

        return {
          ...ancien,
          jeux: ancien.jeux.filter(
            (jeu) => jeu.igdb_id !== igdbId
          ),
        };
      });

      toast.success("Jeu supprimé du panier");
    }
  }

  async function viderPanier() {

    const response = await fetch(
      "http://localhost:4000/panier/vider",
      {
        method: "DELETE",
        credentials: "include",
      }
    );

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

        {panier.jeux.length === 0 && (
          <p>Ton panier est vide.</p>
        )}

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
            display: "block"
          }}
        />

      </div>

      <div className="col-md-9 h-100">

        <div className="card-body d-flex flex-column h-100 py-2 "
        style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>

          <h5 className="card-title mb-1">
            {jeu.nom}
          </h5>

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

          <div className="mt-4">

            <h4>Total : {total.toFixed(2)}$</h4>

            <button
              className="btn btn-outline-light mt-3"
              onClick={viderPanier}
            >
              Vider le panier
            </button>

          </div>

        )}

      </div>

      <Footer />

    </div>
  );
}