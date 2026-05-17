import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "./helper/navbar";
import Footer from "./helper/footer";
import { toast } from "react-toastify";

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

type Revue = {
  _id?: string;
  userId: string;
  nomUtilisateur: string;
  jeuId: number;
  note: number;
  commentaire?: string;
  date?: string;
};

export default function JeuxPage() {
  const { id } = useParams(); // id = igdb_id
  const [jeu, setJeu] = useState<JeuIGDB | null>(null);
  const [revues, setRevues] = useState<Revue[]>([]);
  const [note, setNote] = useState<number>(5);
  const [commentaire, setCommentaire] = useState<string>("");

  useEffect(() => {
    fetch(`http://localhost:4000/igdb/jeux/${id}`)
      .then((r) => r.json())
      .then(setJeu)
      .catch(console.error);

    fetch(`http://localhost:4000/revues/${id}`)
      .then((r) => r.json())
      .then(setRevues)
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

  async function ajouterAuPanier() {
    const response = await fetch("http://localhost:4000/panier/ajouter", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jeu: {
          igdb_id: jeu?.igdb_id,
          nom: jeu?.nom,
          description: jeu?.description,
          cover: jeu?.cover,
          prix: jeu?.prix,
        },
      }),
    });

    const data = await response.json();

    if (response.status === 409) {
      toast.warning(data.message);
    } else if (response.ok) {
      toast.success(data.message);
    } else if (response.status === 401) {
      toast.error("Veuillez vous connecter pour ajouter des jeux au panier.");
    } else {
      toast.error("Une erreur est survenue lors de l'ajout du jeu au panier.");
    }
  }

  async function ajouterRevue() {
    const response = await fetch("http://localhost:4000/revues", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jeuId: Number(id),
        note: note,
        commentaire: commentaire,
      }),
    });

    if (response.ok) {
      const nouvelleRevue = await response.json();

      const autresRevues = revues.filter(
        (revue) => revue.userId !== nouvelleRevue.userId,
      );

      setRevues([nouvelleRevue, ...autresRevues]);

      setCommentaire("");
      setNote(5);
    } else {
      toast.error("Tu dois être connecté pour laisser une revue.");
    }
  }

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
            <button
              className="col-auto btn btn-primary btn-dark w-25"
              onClick={ajouterAuPanier}
            >
              Ajouter au panier
            </button>
          </div>
        </div>

        <div className="col-8 mt-3 mb-3">
          <div className="p-4" style={styleBorder}>
            <h3>Revues des joueurs</h3>

            {revues.length === 0 && <p>Aucune revue pour ce jeu.</p>}

            {revues.map((revue, index) => (
              <div key={index} className="border-bottom pb-3 mb-3">
                <strong>{revue.nomUtilisateur}</strong>

                <div>Note : {revue.note}/5</div>

                {revue.commentaire && (
                  <p className="mt-2">{revue.commentaire}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-8 mt-3 mb-3">
          <div className="p-4" style={styleBorder}>
            <h3>Laisser une revue</h3>

            <label>Note sur 5</label>
            <select
              className="form-control mb-3"
              value={note}
              onChange={(e) => setNote(Number(e.target.value))}
            >
              <option value={1}>1 / 5</option>
              <option value={2}>2 / 5</option>
              <option value={3}>3 / 5</option>
              <option value={4}>4 / 5</option>
              <option value={5}>5 / 5</option>
            </select>

            <label>Commentaire</label>
            <textarea
              className="form-control mb-3"
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              placeholder="Écris ton commentaire..."
            />

            <button className="btn btn-dark" onClick={ajouterRevue}>
              Envoyer la revue
            </button>
          </div>
        </div>

        {jeu.videos.length > 0 && (
          <div className="col-8 mb-5">
            <div className="row g-2">
              {jeu.videos.map((url, i) => (
                <div key={i} className="col-12 col-md-6">
                  <iframe
                    src={url}
                    width="100%"
                    height="250"
                    allowFullScreen
                    className="rounded-3 border-0"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}