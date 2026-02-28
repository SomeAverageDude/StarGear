import "./HomePage.css"

export default function HomePage() {
  return (
    
    <>
       <nav className="navbar navbar-expand-lg stargear-navbar px-4 py-3">
      <div className="container-fluid">      

        <a className="navbar-brand" href="">
          <img src="/src/img/starGear.png"  style={{marginLeft:"6rem", marginTop:"0.2rem"}} alt="StarGear" height="150" width="auto"  className="logo position-absolute  translate-middle   " />
        </a>

        <div className=" navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto text-center gap-lg-4">
            <li className="nav-item">
              <a className="nav-link nav-custom" href="">
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


     <footer className="stargear-footer text-center pt-5">
      <div className="container-fluid">

        <p className="footer-text mb-3">
          Découvrez plus en vous connectant!
        </p>

        <a href="" className="btn footer-btn mb-4">
          Se connecter
        </a>

        <div>
          <img
            src="./src/img/starGear.png" alt="StarGear" className="footer-logo "  height="150" width="auto" />
        </div>

      </div>
    </footer>
    </>

  );
}
