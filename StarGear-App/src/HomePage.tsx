import bg from "/src/assets/HomePageBg.png";

export default function HomePage() {
  return (
    <div>
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
                <a className="nav-link nav-custom " href="">
                  Accueil
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-custom" href="">
                  Boutique
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-custom" href="">
                  À propos
                </a>
              </li>
            </ul>

            <div className="d-flex justify-content-center justify-content-lg-end">
              <a href="" className="btn btn-login">
                Se connecter
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "130vh",
          width: "100%",
        }}
      >
        <h1
          className="position-absolute top-50 start-50 translate-middle text-light"
          style={{ marginTop: -100 }}
        >
          <span style={{ color: "red" }}>Améliorez</span> votre expérience de
          jeu
        </h1>
        <button
          className="position-absolute top-50 start-50 translate-middle rounded-pill border-3 text-light"
          style={{
            width: 170,
            height: 45,
            background:
              "radial-gradient(rgb(128, 0, 0), rgba(189, 189, 189, 0.73))",
          }}
        >
          Parcourir les Jeux
        </button>
      </div>
      <div
        className="text-center"
        style={{
          background: "linear-gradient(to bottom, black, rgb(128, 0, 0))",
        }}
      >
        <p className="text-white">Connectez-vous pour l'expérience complète!</p>
        <button
          className="rounded-pill text-light"
          style={{
            width: 120,
            height: 40,
            background:
              "linear-gradient(to right, rgb(128, 0, 0), rgb(223, 0, 0))",
          }}
        >
          Se connecter
        </button>
      </div>
    </div>
  );
}