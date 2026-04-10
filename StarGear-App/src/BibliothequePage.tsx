import Navbar from "./helper/navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

type Jeux = {
  id_jeu: number;
  nom_jeu: string;
  developpeur: string;
  date_de_sortie: string;
  prix: number;
  sale: number;
  description: string;
  file_size: number;
  revue_id_revue: number;
};

type ImagesJeux = {
  id_image: number;
  lien: string;
  jeux_id_jeu: number;
};
type Compte = {
  id_compte: number;
  username: string;
  mot_de_passe: string;
  courriel: string;
  Bibliotheque_id_biblio: number;
  Panier_id_panier: number;
}

export default function BibliothequePage() {
  const [jeux, setJeux] = useState<Jeux[]>([]);
  const [images, setImage] = useState<ImagesJeux[]>([]);
  const [compte, setCompte] = useState<Compte>();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/jeux/${id}`)
      .then((res) => res.json())
      .then((data) => setJeux(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/images/${id}`)
      .then((res) => res.json())
      .then((data) => setImage(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/compte/${id}`)
      .then((res) => res.json())
      .then((data) => setCompte(data))
      .catch((err) => console.error(err));
  });
  const gradient: React.CSSProperties = {
    height: "100vh",
    background: "linear-gradient(180deg, #12171a 60%, #4c0303 100%)",
    overflowX: "hidden",
    overflowY: "hidden",
  };
  const sidebar: React.CSSProperties = {
    height: "100vh",
    background: "#24282f",
    overflowY: "scroll",
  };
  const gameButtons: React.CSSProperties = {
    width: "20%",
    height: "35%",
  };

  const naviguate = useNavigate();

  return (
    <div style={gradient}>
      <Navbar></Navbar>
      <div className="container-fluid"></div>

      <div className="row ps-2">
        <div className="col-2 text-center text-white pt-2" style={sidebar}>
          <button
            className="btn btn-outline-danger btn-dark text-white"
            style={{ width: "100%" }}
            onClick={() => naviguate(`/Jeu/${jeux[0]?.id_jeu}`)}
          >
            {jeux[0]?.nom_jeu}
          </button>
        </div>

        <div className="col-10 text-start">
          <button
            className="btn btn-outline-danger btn-dark text-white text-start mt-3"
            style={gameButtons}
            onClick={() => naviguate(`/Jeu/${jeux[0]?.id_jeu}`)}
          >
            <img
              src={images[0]?.lien}
              style={{ maxWidth: "100%", height: "auto" }}
            ></img>
            <div className="text-center fs-3">{jeux[0]?.nom_jeu}</div>
          </button>
        </div>
      </div>
    </div>
  );
}
