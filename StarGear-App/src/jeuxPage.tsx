import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Jeux = {
  id_jeu: number;
  nom_jeu: string;
  developpeur: string;
  date_de_sortie: string;
  prix: number;
  sale: number;
  description: string;
  file_size: number;
  revue_id_revue: number;
};

type ImagesJeux = {
  id_image: number;
  lien: string;
  jeux_id_jeu: number;
};

export default function jeuxPage() {
  const [jeux, setJeux] = useState<Jeux[]>([]);
  const [images, setImage] = useState<ImagesJeux[]>([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/jeux/${id}`)
      .then((res) => res.json())
      .then((data) => setJeux(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/images/${id}`)
      .then((res) => res.json())
      .then((data) => setImage(data))
      .catch((err) => console.error(err));
  }, []);
  const styleBackground: React.CSSProperties = {
    backgroundImage: `url(${images[0]?.lien})`,
    backgroundSize: "cover",
    height: "100%",
    overflowX: "hidden",
  };

  const styleBorder: React.CSSProperties = {
    backgroundColor: "rgba(112,68,68,0.5)",
    color: "white",
  };

  return (
    <div style={styleBackground}>
      <div className="row justify-content-center d-flex">
        <nav
          className="navbar navbar-expand-lg stargear-navbar px-4 py-3" style={{backgroundColor:"black"}}
        >
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

        <div className="justify-content-center d-flex row pt-4">
          <div className="ps-2 pt-2 pb-2 col-auto" style={styleBorder}>
            <img
              src={images[0]?.lien}
              alt="Placeholder"
              height={400}
              width={1000}
            ></img>

            <div className="pt-2">
              <img
                src={images[0]?.lien}
                alt="Placeholder"
                height={150}
                className="col-4 pe-2"
              ></img>
              <img
                src={images[0]?.lien}
                alt="Placeholder"
                height={150}
                className="col-4 pe-2"
              ></img>
              <img
                src={images[0]?.lien}
                alt="Placeholder"
                height={150}
                className="col-4"
              ></img>
            </div>
          </div>

          <div className="pt-2 ps-2 col-3" style={styleBorder}>
            <img
              src={images[0]?.lien}
              alt="Placeholder"
              height={200}
              width={350}
            ></img>
            <label>
              Par {jeux[0]?.developpeur} en {jeux[0]?.date_de_sortie}
              <br /> {jeux[0]?.description}
            </label>
          </div>
        </div>

        <div className="col-8 mt-3 mb-3">
          <div className="p-5" style={styleBorder}>
            <label
              className="col-9"
              style={{ fontWeight: "bold", fontSize: 30 }}
            >
              Acheter {jeux[0]?.nom_jeu} at {jeux[0]?.prix}$ Sale :{" "}
              {jeux[0]?.sale} %
            </label>
            <button className="col-auto btn btn-primary btn-dark w-25 ">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
