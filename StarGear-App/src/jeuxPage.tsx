import { useEffect, useState } from "react";
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
      .then(r => r.json())
      .then(setJeu)
      .catch(console.error);
  }, [id]);

  const styleBackground: React.CSSProperties = {
    backgroundImage: `url(${jeu?.screenshots[0] ?? jeu?.cover})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };

  const styleBorder: React.CSSProperties = {
    backgroundColor: "rgba(112,68,68,0.5)",
    color: "white",
  };

  if (!jeu) return;
  return (
    <div style={styleBackground}>
      <div className="row justify-content-center d-flex">
        <Navbar />

        <div className="justify-content-center d-flex row pt-4">
          {/* Screenshots */}
          <div className="ps-2 pt-2 pb-2 col-auto" style={styleBorder}>
            <img src={jeu.screenshots[0] ?? jeu.cover} alt={jeu.nom} height={400} width={1000} style={{ objectFit: "cover" }} />
            <div className="pt-2">
              {jeu.screenshots.slice(0, 3).map((url, i) => (
                <img key={i} src={url} alt={`screenshot ${i}`} height={150} className="col-4 pe-2" style={{ objectFit: "cover" }} />
              ))}
            </div>
          </div>

          {/* Infos */}
          <div className="pt-2 ps-2 col-3" style={styleBorder}>
            <img src={jeu.cover} alt={jeu.nom} height={350} width={280} style={{ objectFit: "cover" }} />
            <label>
              Par {jeu.developpeur} en {jeu.sortie}
              <br />
              Note: {jeu.rating}/10
              <br />
              Genres: {jeu.genres?.join(", ")}
              <br />
              Plateformes: {jeu.platforms?.join(", ")}
              <br />{jeu.description}
            </label>
          </div>
        </div>

        {/* Achat */}
        <div className="col-8 mt-3 mb-3">
          <div className="p-5" style={styleBorder}>
            <label className="col-9" style={{ fontWeight: "bold", fontSize: 30 }}>
              Acheter {jeu.nom} à {jeu.prix}$

            </label>
            <button className="col-auto btn btn-primary btn-dark w-25">
              Ajouter au panier
            </button>
          </div>
        </div>

        {jeu.videos.length > 0 && (
          <div className="col-8 mb-5">
            <div className="row g-2">
              {jeu.videos.map((url, i) => (
                <div key={i} className="col-12 col-md-6">
                  <iframe src={url} width="100%" height="250" allowFullScreen className="rounded-3 border-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}