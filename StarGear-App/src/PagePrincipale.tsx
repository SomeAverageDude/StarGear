import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./helper/navbar";
import Footer from "./helper/footer";
import SearchBar from "./helper/SearchBar";

type JeuIGDB = {
  igdb_id: number;
  nom: string;
  cover: string;
  banner: string | null; 
  sortie: string;
  prix: string;
};

const IGDB_IDS = "3277,119133,9927,115289,1877,11198,25076,103380";

export default function PagePrincipale() {
  const [jeux, setJeux] = useState<JeuIGDB[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/igdb/jeux?ids=${IGDB_IDS}`)
      .then(r => r.json())
      .then((data) => {
        console.log("IGDB response:", data);
        setJeux(Array.isArray(data) ? data : []);
      })
      .catch(console.error);
  }, []);

  const style = {
    backgroundImage: "url(https://cdn.wccftech.com/wp-content/uploads/2017/03/06_1490346163-scaled.jpg)",
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
          overflowX: "hidden",
      }}
    >
      <Navbar></Navbar>

     
      <section
        className="position-relative d-flex align-items-center flex-column justify-content-center"
        style={{ height: "65vh", background: "linear-gradient(180deg, #7a0000 0%, #1a0000 50%, #000 100%)", ...style }}
      >
        <div className="mb-3 w-100 d-flex justify-content-center">
          <div style={{ maxHeight: "70px", width: "100%" }}>
            <SearchBar />
          </div>
        </div>

        <div className="container">
          <div className="row g-3 justify-content-center align-items-end">
            {jeux.slice(0, 4).map((j) => (
              <div
                key={j.igdb_id}
                className="col-3 col-md-2 text-center"
                onClick={() => navigate(`/Jeu/${j.igdb_id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="card bg-transparent border-0 shadow-lg hover-zoom">
                  <img
                    src={j.cover}
                    className="card-img-top rounded-3 border border-secondary"
                    style={{ height: "350px", objectFit: "cover" }}
                    alt={j.nom}
                  />
                  <div className="p-2 small fw-bold text-uppercase text-white" style={{ fontSize: "10px" }}>
                    {j.nom}
                    <span className="text-danger d-block">{j.prix} $</span>
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
            onClick={() => navigate(`/Jeu/${jeux[4]?.igdb_id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={jeux[4]?.banner ?? jeux[4]?.cover}
              className="w-100 h-100"
              style={{ minHeight: "400px", objectFit: "cover", objectPosition: "top" }}
              alt={jeux[4]?.nom}
            />
            <div className="position-absolute bottom-0 start-0 p-4 w-100" style={{ background: "linear-gradient(transparent, #000)" }}>
              <h2 className="fw-bold m-0">{jeux[4]?.nom}</h2>
              <span className="text-danger fw-bold">{jeux[4]?.prix} $</span>
            </div>
          </div>

      
          <div className="col-md-6">
            <div className="row g-1">
              {[jeux[5], jeux[6], jeux[7]].map((j, i) => (
                <div
                  key={i}
                  className={i === 0 ? "col-12" : "col-6"}
                  onClick={() => navigate(`/Jeu/${j?.igdb_id}`)}
                  style={{ cursor: "pointer", position: "relative", overflow: "hidden" }}
                >
                  <img
                    src={j?.banner ?? j?.cover}
                    className="w-100"
                    style={{ height: "300px", objectFit: "cover", objectPosition: "top", display: "block" }}
                    alt={j?.nom}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 p-2 w-100"
                    style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}
                  >
                    <span className="fw-bold small d-block">{j?.nom}</span>
                    <span className="text-danger" style={{ fontSize: "12px" }}>{j?.prix} $</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Jeux du Moment ── */}
      <section className="container my-5 py-5 rounded-4" style={{ background: "linear-gradient(180deg, #1a1a1a, #000)" }}>
        <h2 className="text-center fw-bold mb-5">Jeux du Moment</h2>
        <div className="row g-4">
          <div className="col-lg-5">
            {jeux.slice(0, 5).map((j) => (
              <div
                key={j.igdb_id}
                className="d-flex align-items-center mb-3 p-2 rounded-3"
                onClick={() => navigate(`/Jeu/${j.igdb_id}`)}
                style={{ cursor: "pointer", background: "linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)", border: "1px solid #333" }}
              >
                <img src={j.cover} className="rounded" style={{ width: "70px", height: "70px", objectFit: "cover" }} alt={j.nom} />
                <div className="ms-3 flex-grow-1">
                  <h6 className="m-0 fw-bold">{j.nom}</h6>
                  <small className="text-white-50">{j.sortie}</small>
                </div>
                <span className="text-danger fw-bold ms-3">{j.prix} $</span>
              </div>
            ))}
          </div>

          <div className="col-lg-7">
            <div className="row g-2">
              {jeux.slice(5, 9).map((j) => (
                <div key={j.igdb_id} className="col-6" onClick={() => navigate(`/Jeu/${j.igdb_id}`)} style={{ cursor: "pointer" }}>
                  <div className="position-relative overflow-hidden rounded-3 shadow" style={{ height: "185px" }}>
                   
                    <img
                      src={j.banner ?? j.cover}
                      className="w-100 h-100"
                      style={{ objectFit: "cover", objectPosition: "top", display: "block" }}
                      alt={j.nom}
                    />
                    <div
                      className="position-absolute bottom-0 start-0 p-2 w-100"
                      style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}
                    >
                      <span className="fw-bold d-block text-truncate" style={{ fontSize: "12px" }}>{j.nom}</span>
                      <span className="text-danger" style={{ fontSize: "11px" }}>{j.prix} $</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}