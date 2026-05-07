import bg from "/src/assets/HomePageBg.png";
import Navbar from "./helper/navbar";
import Footer from "./helper/footer";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(33, 37, 41, 0) 0%, #212529 100%), url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <h1
          className="position-absolute top-50 start-50 translate-middle text-light"
          style={{
            marginTop: -100,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          <span style={{ color: "red" }}>Améliorez</span> votre expérience de
          jeu
        </h1>
        <button
          className="position-absolute top-50 start-50 translate-middle rounded-5 btn btn-danger btn-block"
          onClick={() => navigate("/PagePrincipale")}
        >
          Parcourir les Jeux
        </button>
      </div>
      <Footer />
    </div>
  );
}
