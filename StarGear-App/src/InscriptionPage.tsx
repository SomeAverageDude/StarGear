import { useState } from "react";
import { useNavigate } from "react-router";
import ChangerImageFond from "./helper/ImageCaroussel";
import Navbar from "./helper/navbar";

export default function InscriptionPage() {
  const navigate = useNavigate();
  const currentImage = ChangerImageFond();

  const [formData, setFormData] = useState({
    nomUtilisateur: "",
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

    fetch("http://localhost:4000/inscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        setFormData({ nomUtilisateur: "", courriel: "", mdp: "" });
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        navigate("/SeConnecterPage");
      })
      .catch((err) => console.error(err));
  };
  const style = {
    backgroundImage: `url(${currentImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    height: "100vh",
  };

  return (
    <div style={style}>
         <Navbar></Navbar>

      <div className="pt-5 d-flex justify-content-end">
        <form
          onSubmit={handleSubmit}
          className="mt-5 pt-3 rounded-4 ps-4 pe-4 container"
          style={{
            width: "400px",
            height: "500px",
            backgroundColor: "#1a1a1a",
          }}
        >
          <h3 className="text-danger text-center fw-semibold pb-4">
            Inscription
          </h3>
          <p className="text-secondary ">
            {" "}
            En vous inscrivant, vous acceptez les{" "}
            <a style={{ textDecoration: "underline", color: "blue" }}>
              Conditions d’utilisation
            </a>{" "}
            et la{" "}
            <a style={{ textDecoration: "underline", color: "blue" }}>
              Politique de confidentialité
            </a>{" "}
          </p>
          <div className="mb-3">
            <div className="text-secondary">Nom d'utilisateur</div>
            <input
              type="text"
              name="nomUtilisateur"
              className="form-control bg-dark text-white"
              value={formData.nomUtilisateur}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <div className="text-secondary">Courriel</div>
            <input
              type="email"
              name="courriel"
              className="form-control bg-dark text-white"
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
              className="form-control bg-dark text-white"
              value={formData.mdp}
              onChange={handleChange}
            />
          </div>
          <div className="pt-3 pb-4 text-center d-grid gap-2 col-9 mx-auto">
            <button
              type="submit"
              className=" rounded-5 btn btn-danger btn-block "
            >
              Créer un compte{" "}
            </button>
          </div>
          <div>
            <p className="text-secondary text-center">
              Vous avez déjà un compte ?{" "}
              <a href="/SeConnecterPage" className="text-danger">
                Connectez-vous
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
