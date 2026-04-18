import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
type User = {
  _id: string;
  courriel: string;
  nomUtilisateur: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/users/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg stargear-navbar px-4 py-3 bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/src/assets/starGear.png"
            style={{ marginLeft: "6rem", marginTop: "0.2rem" }}
            alt="StarGear"
            height="50px"
            width="auto"
            className="logo position-absolute translate-middle"
          />
        </a>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto text-center gap-lg-4">
            <li className="nav-item">
              <a className="nav-link nav-custom text-white" href="/">
                Accueil
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link nav-custom text-white"
                href="/PagePrincipale"
              >
                Boutique
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-custom text-white" href="/AproposPage">
                À propos
              </a>
            </li>
          </ul>
          {user ? (
            <div className="d-flex gap-2">
              <div className="btn btn-outline-light rounded-5">
                Bonjour, {user.nomUtilisateur}
              </div>

              <button
                className="btn btn-danger rounded-5"
                onClick={() => {
                  fetch("http://localhost:4000/users/Deconnexion", {
                    method: "POST",
                    credentials: "include",
                  }).then(() => setUser(null));
                }}
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <button
              className="btn btn-danger rounded-5"
              onClick={() => navigate("/SeConnecterPage")}
            >
              Se connecter
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
