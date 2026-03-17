export default function Footer() {
  return (
    <footer className="stargear-footer text-center pt-5" style={{backgroundColor:"white"}}>
      <div className="container-fluid">
        <p className="footer-text mb-3 text-dark">Découvrez plus en vous connectant!</p>
        <a href="/SeConnecterPage" className="btn footer-btn mb-4 text-danger">Se connecter</a>
        <div>
          <img
            src="/src/assets/starGear.png"
            alt="StarGear"
            className="footer-logo"
            height="150"
            width="auto"
          />
        </div>
      </div>
    </footer>
  );
}