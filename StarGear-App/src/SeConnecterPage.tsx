import { Link } from "react-router";

export default function SeConnecterPage() {
  return (

    <div>

    <nav className="navbar navbar-expand-lg stargear-navbar px-4 py-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/src/img/starGear.png"  style={{marginLeft:"6rem", marginTop:"0.2rem"}} alt="StarGear" height="150" width="auto"  className="logo position-absolute  translate-middle   " />
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

    <div>
      <Link to="/InscriptionPage" className="btn btn-primary">      </Link>
      <br></br>
    </div>












    </div>
  






  );
}