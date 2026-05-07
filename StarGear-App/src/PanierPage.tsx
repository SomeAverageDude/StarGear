import Navbar from "./helper/navbar";
import Footer from "./helper/footer";

export default function PanierPage() {
  return (
    <div
      style={{
        backgroundColor: "rgb(33, 33, 33)",
      }}
    >
      <Navbar />
      <div
        className="container-fluid text-light"
        style={{
          backgroundColor: "rgb(33, 33, 33)",
          paddingTop: "80px",
          paddingLeft: "200px",
        }}
      >
        <h2>Votre panier</h2>
        <div className="container-fluid bg-dark text-light"></div>
      </div>
      <Footer />
    </div>
  );
}
