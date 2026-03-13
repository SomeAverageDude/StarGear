import { useEffect, useState } from "react";

type Jeu = {
    id: number;
    nom_jeu: string;
    description: string;
    prix: number;
    image_url: string;
    date_de_sortie: Date;
};


export default function PagePrincipale() {
  const style = {};
  const [jeux, setJeux] = useState<Jeu[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/jeux")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        return res.json();
      })
      .then((data) => setJeux(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={style}>
      <nav className="navbar navbar-expand-lg stargear-navbar px-4 py-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="/src/assets/starGear.png"
              style={{ marginLeft: "6rem", marginTop: "0.2rem" }}
              alt="StarGear"
              height="150"
              width="auto"
              className="logo position-absolute  translate-middle   "
            />
          </a>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav mx-auto text-center gap-lg-4">
              <li className="nav-item">
                <a className="nav-link nav-custom text-white " href="/">
                  Accueil
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-custom text-white" href="">
                  Boutique
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-custom text-white" href="">
                  À propos
                </a>
              </li>
            </ul>
            <div className="d-flex justify-content-center justify-content-lg-end">
              <button
                type="submit"
                className=" rounded-5 btn btn-danger btn-block "
              >
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </nav>

    <div className="list-group">
            {jeux.map((jeu) => (
            <div key={jeu.id} className="list-group-item">
                <div className="row align-items-center">
                {/* Game Info */}
                <div className="col-8">
                    <h5 className="mb-1">{jeu.nom_jeu}</h5>
                    <p className="mb-1">{jeu.description}</p>
                    <p className="mb-1">Prix: {jeu.prix} $</p>
                    <p className="mb-1">Année de sortie: {new Date(jeu.date_de_sortie).getFullYear()}</p>
                    <small className="text-muted">{jeu.image_url}</small>
                </div>
                </div>
                </div>
            ))}</div>
                


    </div>
  );
}
function gameCard() {}
