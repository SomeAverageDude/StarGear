const styleBackground = {
  backgroundImage:
    "url(https://d8iqbmvu05s9c.cloudfront.net/ajprhqgqg1otf7d5sm7u3brf27gv)",
  backgroundSize: "cover",
  height: "100vh",
};

export default function jeuxPage() {
  return (
    <div style={styleBackground}>
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

      <div className="justify-content-center d-flex">
        <div className="bg-secondary">
          <img
            src="src\assets\download.jpg"
            alt="Placeholder"
            height={400}
            width={700}
          ></img>

          <div className="pt-2">
            <img
              src="src\assets\download.jpg"
              alt="Placeholder"
              height={150}
              className="col-4 pe-2"
            ></img>
            <img
              src="src\assets\download.jpg"
              alt="Placeholder"
              height={150}
              className="col-4 pe-2"
            ></img>
            <img
              src="src\assets\download.jpg"
              alt="Placeholder"
              height={150}
              className="col-4"
            ></img>
          </div>
        </div>

        <div>
          <img
            src="src\assets\download.jpg"
            alt="Placeholder"
            height={150}
            width={300}
            className="ps-4"
          ></img>
        </div>
      </div>
    </div>
  );
}
