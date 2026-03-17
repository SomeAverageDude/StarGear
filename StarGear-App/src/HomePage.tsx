import bg from "/src/assets/HomePageBg.png";
import Navbar from "./helper/navbar";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "110vh",
          width: "100%",
        }}
      >
        <h1
          className="position-absolute top-50 start-50 translate-middle text-light"
          style={{ marginTop: -100 }}
        >
          <span style={{ color: "red" }}>Améliorez</span> votre expérience de jeu
        </h1>
        <button
          className="position-absolute top-50 start-50 translate-middle rounded-pill border-3 text-light"
          onClick={() => navigate("/PagePrincipale")}
          style={{
            width: 170,
            height: 45,
            background: "radial-gradient(rgb(128, 0, 0), rgba(189, 189, 189, 0.73))",
          }}
        >
          Parcourir les Jeux
        </button>
      </div>
      <div
        className="text-center"
        style={{
          background: "linear-gradient(to bottom, black, rgb(128, 0, 0))",
        }}
      >
        <p className="text-white fs-5">
          Connectez-vous pour l'expérience complète!
        </p>
        <button
          className="rounded-pill text-light"
          onClick={() => navigate("/SeConnecterPage")}
          style={{
            width: 120,
            height: 40,
            marginTop: 10,
            background: "linear-gradient(to right, rgb(128, 0, 0), rgb(223, 0, 0))",
          }}
        >
          Se connecter
        </button>
        <br />
        <img
          src="src\assets\starGear.png"
          alt="logo"
          style={{ width: "40%", height: "160px", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}