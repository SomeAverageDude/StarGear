import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Navbar from "./helper/navbar";
import Footer from "./helper/footer";

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
      <Navbar></Navbar>
      <div className="d-flex container">
        <div
          className="row mt-3 pt-2 justify-content-center d-flex"
          style={styleBorder}
        >
          {/* Big image */}
          <img src={images[0]?.lien} className="col-9 h-75"></img>

          {/* Side image + text */}
          <div className="col-3">
            <img src={images[0]?.lien} className="h-25" ></img>
            <label>Par {jeux[0]?.developpeur} en {jeux[0]?.date_de_sortie}</label>
            <label>Grandeur : {jeux[0]?.file_size} MB</label>
            <label> {jeux[0]?.description}</label>
          </div>
        </div>

        <div className="row justify-content-center d-flex">

        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
