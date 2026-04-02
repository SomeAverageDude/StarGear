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
          style={{ marginTop: -100 }}
        >
          <span style={{ color: "red" }}>Améliorez</span> votre expérience de
          jeu
        </h1>
        <button
          className="position-absolute top-50 start-50 translate-middle rounded-pill border-3 text-light"
          onClick={() => navigate("/PagePrincipale")}
          style={{
            width: 170,
            height: 45,
            background:
              "radial-gradient(rgb(128, 0, 0), rgba(189, 189, 189, 0.73))",
          }}
        >
          Parcourir les Jeux
        </button>
      </div>
      <Footer />
    </div>
  );
}
