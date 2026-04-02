import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./helper/navbar";
import Footer from "./helper/footer";
import SearchBar from "./helper/SearchBar";
type Jeu = {
  id_jeu: number;
  nom_jeu: string;
  description: string;
  prix: number;
  date_de_sortie: string;
  lien: string;
};

export default function PagePrincipale() {
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const naviguate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/jeux")
      .then((res) => res.json())
      .then((data) => setJeux(data))
      .catch((err) => console.error("Erreur jeux:", err));
  }, []);

  const style = {
    backgroundImage:
      "url(https://cdn.wccftech.com/wp-content/uploads/2017/03/06_1490346163-scaled.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };

  return (
    <div
      className="bg-black text-white min-vh-100"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(33, 37, 41, 0) 0%, #212529 80%)",
      }}
    >
      <Navbar></Navbar>

      <section
        className="position-relative d-flex align-items-center flex-column justify-content-center"
        style={{
          height: "65vh",
          background:
            "linear-gradient(180deg, #7a0000 0%, #1a0000 50%, #000 100%)",
          ...style,
        }}
      >
        <div className="mb-3 w-100 d-flex justify-content-center ">
          <div style={{ maxHeight: "70px", width: "100%" }}>
            <SearchBar />
          </div>
        </div>
        <div className="container">
          <div className="row g-3 justify-content-center align-items-end">
            {jeux.slice(0, 4).map((j) => (
              <div
                key={j.id_jeu}
                className="col-3 col-md-2 text-center"
                onClick={() => naviguate(`/Jeu/${j.id_jeu}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="card bg-transparent border-0 shadow-lg hover-zoom">
                  <img
                    src={j.lien}
                    className="card-img-top rounded-3 border border-secondary"
                    style={{ height: "350px", objectFit: "cover" }}
                    alt={j.nom_jeu}
                  />
                  <div
                    className="p-2 small fw-bold text-uppercase text-white"
                    style={{ fontSize: "10px" }}
                  >
                    {j.nom_jeu}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-fluid p-0">
        <div className="row g-1">
          <div
            className="col-md-6 position-relative overflow-hidden"
            onClick={() => naviguate(`/Jeu/${jeux[4]?.id_jeu}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={jeux[4]?.lien}
              className="w-100 h-100"
              style={{ minHeight: "400px", objectFit: "cover" }}
              alt={jeux[4]?.nom_jeu}
            />
            <div className="position-absolute bottom-0 start-0 p-4 bg-gradient-dark w-100">
              <h2 className="fw-bold m-0">{jeux[4]?.nom_jeu}</h2>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row g-1">
              <div
                className="col-12"
                onClick={() => naviguate(`/Jeu/${jeux[5]?.id_jeu}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={jeux[5]?.lien}
                  className="w-100"
                  style={{ height: "300px", objectFit: "cover" }}
                  alt="sub-1"
                />
              </div>
              <div
                className="col-6"
                onClick={() => naviguate(`/Jeu/${jeux[6]?.id_jeu}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={jeux[6]?.lien}
                  className="w-100"
                  style={{ height: "300px", objectFit: "cover" }}
                  alt="sub-2"
                />
              </div>
              <div
                className="col-6"
                onClick={() => naviguate(`/Jeu/${jeux[7]?.id_jeu}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={jeux[7]?.lien}
                  className="w-100"
                  style={{ height: "300px", objectFit: "cover" }}
                  alt="sub-3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5 py-5 bg-gradient-dark rounded-4">
        <h2 className="text-center fw-bold mb-5">Jeux du Moment</h2>
        <div className="row g-4">
          <div className="col-lg-5">
            {jeux.slice(0, 5).map((j) => (
              <div
                key={j.id_jeu}
                className="d-flex align-items-center mb-3 p-2 rounded-3"
                onClick={() => naviguate(`/Jeu/${j.id_jeu}`)}
                style={{
                  cursor: "pointer",
                  background:
                    "linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)",
                  border: "1px solid #333",
                }}
              >
                <img
                  src={j.lien}
                  className="rounded"
                  style={{ width: "70px", height: "70px", objectFit: "cover" }}
                  alt={j.nom_jeu}
                />
                <div className="ms-3 flex-grow-1">
                  <h6 className="m-0 fw-bold">{j.nom_jeu}</h6>
                  <small className="text-white-50">{j.date_de_sortie}</small>
                </div>
                <div className="text-danger fw-bold fs-5 px-3">{j.prix}$</div>
              </div>
            ))}
          </div>

          <div className="col-lg-7">
            <div className="row g-2">
              {jeux.slice(5, 9).map((j) => (
                <div
                  key={j.id_jeu}
                  className="col-6"
                  onClick={() => naviguate(`/Jeu/${j.id_jeu}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="position-relative overflow-hidden rounded-3 shadow">
                    <img
                      src={j.lien}
                      className="w-100"
                      style={{ height: "185px", objectFit: "cover" }}
                      alt={j.nom_jeu}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}
