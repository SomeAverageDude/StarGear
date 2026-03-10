import { useState, useEffect } from "react";


export default function InscriptionPage() {
     const images = ['https://4kwallpapers.com/images/wallpapers/elden-ring-pc-games-playstation-4-playstation-5-xbox-one-3840x2160-7712.jpg',
        'https://cdn.mos.cms.futurecdn.net/KyCj8atGy2hBbN5HXxSGTj.jpg'] 
    
          const [currentImage, setCurrentImage] = useState(0);
    
          useEffect(() => {
          const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
          }, 15000); 
    
          return () => clearInterval(interval);
        }, []);


     const style = {
    backgroundImage: `url(${images[currentImage]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    height: "100vh"
  };
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
                <a className="nav-link nav-custom text-white " href="">
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

      <div className="pt-5 d-flex justify-content-end">
        <form
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
            <a href="/conditions" style={{ textDecoration: "underline" }}>
              Conditions d’utilisation
            </a>{" "}
            et la{" "}
            <a href="/confidentialite" style={{ textDecoration: "underline" }}>
              Politique de confidentialité
            </a>
            {" "}
          </p>
          <div className="mb-3">
            <div className="text-secondary">Nom d'utilisateur</div>
            <input type="username" className="form-control bg-dark text-white" id="inputUsername" />
          </div>
          <div className="mb-3">
            <div className="text-secondary">Courriel</div>
            <input
              type="email"
              className="form-control bg-dark text-white"
              id="inputEmail"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <h6 className="form-label text-secondary fs-6">Mot de passe</h6>
            <input
              type="password"
              className="form-control bg-dark text-white "
              id="inputMotDePasse"
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
