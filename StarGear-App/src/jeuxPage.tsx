const styleBackground: React.CSSProperties = {
  backgroundImage:
    "url(https://d8iqbmvu05s9c.cloudfront.net/ajprhqgqg1otf7d5sm7u3brf27gv)",
  backgroundSize: "cover",
  height: "100%",
  overflowX: "hidden",
};

const styleBorder: React.CSSProperties = {
  backgroundColor: "rgba(112,68,68,0.5)",
  color:"black",
};

export default function jeuxPage() {
  return (
    <div style={styleBackground}>
      <div className="row justify-content-center d-flex">
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

        <div className="justify-content-center d-flex row pt-4">
          <div className="ps-2 pt-2 pb-2 col-auto" style={styleBorder}>
            <img
              src="src\assets\download.jpg"
              alt="Placeholder"
              height={400}
              width={650}
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

          <div className="pt-2 ps-2 col-3" style={styleBorder}>
            <img
              src="src\assets\download.jpg"
              alt="Placeholder"
              height={200}
              width={350}
            ></img>
            <label>Placeholder</label>
          </div>
        </div>

        <div className="col-8 mt-3 mb-3">
          <div className="p-5" style={styleBorder}>
            <label className="col-9">Placeholder</label>
            <button className="col-auto btn btn-primary btn-dark w-25 ">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
