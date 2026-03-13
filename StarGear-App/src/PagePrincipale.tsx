import { useEffect, useState } from "react";

type Jeu = {
  id_jeu: number;
  nom_jeu: string;
  description: string;
  prix: number;
  date_de_sortie: string;
};

type Image = {
  id_image: number;
  lien: string;
  jeux_id_jeu: number;
};

export default function PagePrincipale() {
  const style = {};
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  /**
   * Fetch les jeux depuis la BD
   */
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

  useEffect(() => {
    fetch("http://localhost:4000/images")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch images");
        }
        return res.json();
      })
      .then((data) => setImages(data))
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








      <div className="container mt-4">
        <div className="row g-3">
          {jeux.map((jeu) => {
            const image = images.find((img) => img.jeux_id_jeu === jeu.id_jeu);
            return (
              <div key={jeu.id_jeu} className="col-6 col-md-4 col-lg-3">
                <div
                  className="card h-100 border-0"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  <img
                    src={image?.lien}
                    className="card-img-top"
                    alt={jeu.nom_jeu}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body p-2">
                    <h6 className="card-title text-white mb-1">
                      {jeu.nom_jeu}
                    </h6>
                    <p
                      className="text-secondary mb-1"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {jeu.date_de_sortie}
                    </p>
                    <span className="text-danger fw-bold">{jeu.prix} $</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
