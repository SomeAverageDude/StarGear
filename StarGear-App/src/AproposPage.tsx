import Navbar from "./helper/navbar";
import Footer from "./helper/footer";
import bg from "/src/assets/AproposBg.jpg";

export default function AproposPage() {
  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${bg})
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
        }}
      >
        <h2 className="text-center text-light position-absolute top-50 start-50 translate-middle pd-5">
          StarGear Vise à donner la meilleur expérience pour les joueurs
        </h2>
      </div>
      <Footer />
    </div>
  );
}
