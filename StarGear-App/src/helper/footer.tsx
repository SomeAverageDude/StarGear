import { useNavigate } from "react-router";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      className="stargear-footer text-center pt-5 bg-dark"
      style={{
        backgroundColor: "white",
      }}
    >
      <div className="container-fluid">
        <p className="footer-text mb-3 text-light">
          Découvrez plus en vous connectant!
        </p>
        
        <div>
          <img
            src="/src/assets/starGear.png"
            alt="StarGear"
            className="footer-logo"
            height="80"
            width="auto"
          />
        </div>
      </div>
    </footer>
  );
}
