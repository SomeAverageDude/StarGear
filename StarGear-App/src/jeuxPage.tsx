import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "./helper/navbar";
import Footer from "./helper/footer";

type JeuIGDB = {
  igdb_id: number;
  nom: string;
  description: string;
  developpeur: string;
  sortie: string;
  cover: string;
  screenshots: string[];
  videos: string[];
  prix: number;
  rating: number;
  genres: string[];
  platforms: string[];
};

export default function JeuxPage() {
  const { id } = useParams(); // id = igdb_id
  const [jeu, setJeu] = useState<JeuIGDB | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/igdb/jeux/${id}`)
      .then((r) => r.json())
      .then(setJeu)
      .catch(console.error);
  }, [id]);

  const styleBackground: React.CSSProperties = {
    backgroundImage: `url(${jeu?.screenshots[0] ?? jeu?.cover})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    overflowX: "hidden",
  };

  const styleBorder: React.CSSProperties = {
    backgroundColor: "rgba(112,68,68,0.5)",
    color: "white",
  };

  const styleScroll: React.CSSProperties = {
    overflowY: "scroll",
    overflowX: "hidden",
    maxHeight: "300px",
  };

  if (!jeu) return;
  return (
    <div style={styleBackground}>
      <Navbar></Navbar>
      <div className="container">
        <div
          className="row mt-3 pt-2 justify-content-center d-flex"
          style={styleBorder}
        >
          {/* Cover */}
          <img
            src={jeu.screenshots[0] ?? jeu.cover}
            alt={jeu.nom}
            className="col-9 h-75"
            style={{ objectFit: "cover" }}
          ></img>

          {/* Coté image + texte */}
          <div className="col-3">
            <img
              src={jeu.cover}
              alt={jeu.nom}
              className="w-100"
              style={{ objectFit: "cover", maxHeight: "200px" }}
            ></img>
            <div style={styleScroll}>
              <p>
                Par {jeu.developpeur} en {jeu.sortie}
              </p>

              <p>Note: {jeu.rating}/10</p>

              <p>Genres: {jeu.genres?.join(", ")}</p>

              <p>Plateformes: {jeu.platforms?.join(", ")}</p>

              <p>{jeu.description}</p>
            </div>
          </div>
        </div>

        {/* Sous-images */}
        <div
          className="row justify-content-start pb-2 pt-2"
          style={styleBorder}
        >
          {jeu.screenshots.slice(0, 3).map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`screenshot ${i}`}
              className="h-25 w-25"
              style={{ objectFit: "cover" }}
            />
          ))}
        </div>
      </div>

      {/* Acheter */}
      <div className="row justify-content-center d-flex">
        <div className="col-8 mt-3 mb-3">
          <div className="p-5" style={styleBorder}>
            <label
              className="col-9"
              style={{ fontWeight: "bold", fontSize: 30 }}
            >
              Acheter {jeu.nom} à {jeu.prix}$
            </label>
            <button className="col-auto btn btn-primary btn-dark w-25">
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
