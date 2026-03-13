export default function PagePrincipale() {
    const style = {

    }


  return <div style={style}>
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

  </div>;
}
