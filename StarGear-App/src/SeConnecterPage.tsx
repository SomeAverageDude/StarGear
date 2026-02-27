import "./connect.css";

export default function SeConnecterPage() {
      const style = {
    backgroundImage: `url(${'https://4kwallpapers.com/images/wallpapers/elden-ring-pc-games-playstation-4-playstation-5-xbox-one-3840x2160-7712.jpg'})`,
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
              src="/src/img/starGear.png"
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
      className="mt-5 pt-3 rounded-4 ps-4 pe-4"
      style={{ width: "400px",height: "400px",backgroundColor: "#1a1a1a",marginRight: "200px"}}>
          <h3 className="text-danger text-center fw-semibold pb-4">
            Connexion
          </h3>
          <div className="mb-3">
            <div className="text-secondary">
              Courriel ou numéro de téléphone
            </div>
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
