import { useState } from "react";
import { useNavigate } from "react-router";
import ChangerImageFond from "./helper/ImageCaroussel";
import Navbar from "./helper/navbar";
export default function SeConnecterPage() {
  const navigate = useNavigate();
  const currentImage = ChangerImageFond();
  const style = {
    backgroundImage: `url(${[currentImage]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    height: "100vh",
  };

  const [formData, setFormData] = useState({
    courriel: "",
    mdp: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const changedHtmlElement = e.target;
    setFormData({
      ...formData,
      [changedHtmlElement.name]: changedHtmlElement.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("http://localhost:4000/connexion", {
      method: "POST", // Utiliser POST pour envoyer les données de connexion au lieu de GET pour ne pas exposer les informations dans l'URL et rendre les params plus faciles a transmettre
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          alert("Connexion réussie !");
          navigate("/");
        } else {
          alert("Courriel ou mot de passe incorrect");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={style}>
      <Navbar></Navbar>

      <div className="pt-5 d-flex justify-content-end">
        <form
          className="mt-5 pt-3 rounded-4 ps-4 pe-4"
          onSubmit={handleSubmit}
          style={{
            width: "400px",
            height: "400px",
            backgroundColor: "#1a1a1a",
            marginRight: "200px",
          }}
        >
          <h3 className="text-danger text-center fw-semibold pb-4">
            Connexion
          </h3>
          <div className="mb-3">
            <div className="text-secondary">Courriel</div>
            <input
              type="email"
              className="form-control bg-dark text-white"
              id="inputEmail"
              name="courriel"
              value={formData.courriel}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <h6 className="form-label text-secondary fs-6">Mot de passe</h6>
            <input
              type="password"
              name="mdp"
              value={formData.mdp}
              onChange={handleChange}
              className="form-control bg-dark text-white "
              id="inputMotDePasse"
            />
          </div>
          <div>
            <a href="#" className="text-danger">
              Mot de passe oublié ?
            </a>
          </div>
          <div className="pt-3 pb-4 text-center d-grid gap-2 col-9 mx-auto">
            <button
              type="submit"
              className=" rounded-5 btn btn-danger btn-block "
            >
              Se connecter
            </button>
          </div>
          <div>
            <p className="text-secondary text-center pt-2">
              Vous n'avez pas de compte ?{" "}
              <a href="/InscriptionPage" className="text-danger">
                Inscrivez-vous
              </a>
            </p>
          </div>
        </form>
      </div>
   
    </div>
  );
}
