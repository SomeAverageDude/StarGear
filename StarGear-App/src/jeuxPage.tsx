import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Navbar from "./helper/navbar";
import Footer from "./helper/footer"
const styleBackground: React.CSSProperties = {
  backgroundImage:
    "url(https://d8iqbmvu05s9c.cloudfront.net/ajprhqgqg1otf7d5sm7u3brf27gv)",
  backgroundSize: "cover",
  height: "100vh",
  overflowX: "hidden",
};

const styleBorder: React.CSSProperties = {
  backgroundColor: "rgba(112,68,68,0.5)",
  color: "white",
};


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
    height: "100vh",
    overflowX: "hidden",
  };

  const styleBorder: React.CSSProperties = {
    backgroundColor: "rgba(112,68,68,0.5)",
    color: "white",
  };

  return (
    <div style={styleBackground}>
      <div className="row justify-content-center d-flex">
        <Navbar></Navbar>
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
      <Footer></Footer>
    </div>

  );
}
