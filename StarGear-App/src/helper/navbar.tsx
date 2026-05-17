import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

type User = {
  _id: string;
  courriel: string;
  nomUtilisateur: string;
  role: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/users/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <nav className="navbar px-4 py-2 bg-dark" style={{ position: "relative" }}>
      <a className="navbar-brand" href="/">
        <img
          src="/src/assets/starGear.png"
          alt="StarGear"
          height="50px"
          width="auto"
        />
      </a>

      <ul
        className="navbar-nav flex-row gap-4 mb-0"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <li className="nav-item">
          <a className="nav-link nav-custom text-white" href="/">
            Accueil
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link nav-custom text-white" href="/PagePrincipale">
            Boutique
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link nav-custom text-white" href="/AproposPage">
            À propos
          </a>
        </li>
      {user?.role === "admin" && (
        <li className="nav-item">
          <a className="nav-link nav-custom text-white" href="/AdminPage">
            Administration
          </a>
        </li>
      )}
      
        <li>
          {user ? (
            <>
              <a className="nav-link nav-custom text-white" href="/PanierPage">
                Panier
              </a>
            </>
          ) : null}
        </li>
        <li>
          {user ? (
            <>
              <a
                className="nav-link nav-custom text-white"
                href="/Bibliotheque"
              >
                Bibliotheque
              </a>
            </>
          ) : null}
        </li>
      </ul>
    
      <div className="ms-auto d-flex gap-2">
        {user ? (
          <>
            <div
              className="btn btn-outline-light rounded-5"
              onClick={() => navigate("/DetailCompte")}
            >
              Bonjour, {user.nomUtilisateur}
            </div>
            <button
              className="btn btn-danger rounded-5"
              onClick={() => {
                fetch("http://localhost:4000/users/Deconnexion", {
                  method: "POST",
                  credentials: "include",
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.message === "Logged out") {
                      toast.success("Déconnexion réussie !");
                      setUser(null);
                      navigate("/")
                    } else {
                      toast.error("Erreur lors de la déconnexion");
                    }
                  });
                  
              }}
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <button
            className="btn btn-danger rounded-5"
            onClick={() => navigate("/SeConnecterPage")}
          >
            Se connecter
          </button>
        )}
      </div>
    </nav>
  );
}
