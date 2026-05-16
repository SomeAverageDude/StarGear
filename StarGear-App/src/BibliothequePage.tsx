import Navbar from "./helper/navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Jeux = {
  igdb_id: number;
  nom: string;
  developpeur: string | null;
  cover: string | null;
};
type Compte = {
  _id: string;
  courriel: string;
  nomUtilisateur: string;
  role?: string;
};
type Bibliotheque = {
  _id?: string;

  userId: string;
  jeux: number[]; // liste des IGDB IDs
};

export default function BibliothequePage() {
  const API_IGDB = "http://localhost:4000/igdb/jeux";
  const compteRoute = "http://localhost:4000/users/me";

  const [jeux, setJeux] = useState<Jeux[]>([]);
  const [compte, setCompte] = useState<Compte>();
  const [bibliotheque, setBibliotheque] = useState<Bibliotheque>();

  useEffect(() => {
    const fetchBibliotheque = async () => {
      try {
        // 1.prendre utilisateur
        const compteResponse = await fetch(compteRoute, {
          credentials: "include",
        });

        const compteData = await compteResponse.json();

        setCompte(compteData);

        // 2.prendre bibliotheque
        const biblioResponse = await fetch(
          "http://localhost:4000/bibliotheque",
          {
            credentials: "include",
          },
        );

        const biblioData = await biblioResponse.json();

        setBibliotheque(biblioData);

        // 3.prendre jeux
        const jeuxPromises = biblioData.jeux.map((igdbId: number) =>
          fetch(`${API_IGDB}/${igdbId}`).then((res) => res.json()),
        );

        const jeuxData = await Promise.all(jeuxPromises);

        console.log("biblio", biblioData);
        console.log("jeux", jeuxData);

        setJeux(jeuxData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBibliotheque();
  }, []);

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
          {jeux.map((jeu) => (
            <button
              key={jeu.igdb_id}
              className="btn btn-outline-danger btn-dark text-white mb-2"
              style={{ width: "100%" }}
              onClick={() => naviguate(`/Jeu/${jeu.igdb_id}`)}
            >
              {jeu.nom}
            </button>
          ))}
        </div>

        <div className="col-10 text-start">
          {jeux.map((jeu) => (
            <button
              key={jeu.igdb_id}
              className="btn btn-outline-danger btn-dark text-white text-center mt-3 me-3"
              style={gameButtons}
              onClick={() => naviguate(`/Jeu/${jeu.igdb_id}`)}
            >
              <img
                src={jeu.cover ?? ""}
                style={{ maxWidth: "100%", height: "50%" }}
              />

              <div className="text-center fs-5">{jeu.nom}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
