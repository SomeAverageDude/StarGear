
import "./jeuxPage.css";

export default function jeuxPage() {
  return (

<>
       <nav className="navbar navbar-expand-lg stargear-navbar px-4 py-3">
      <div className="container-fluid">      

        <a className="navbar-brand" href="">
          <img src="/src/assets/starGear.png"  style={{marginLeft:"6rem", marginTop:"0.2rem"}} alt="StarGear" height="150" width="auto"  className="logo position-absolute  translate-middle   " />
        </a>

        <div className=" navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto text-center gap-lg-4">
            <li className="nav-item">
              <a className="nav-link nav-custom" href="/">
                Accueil
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-custom" href="/jeuxPage">
                Boutique
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-custom" href="">
                À propos
              </a>
            </li>
          </ul>

          <div className="d-flex justify-content-center justify-content-lg-end">
            <a href="/SeConnecterPage" className="btn btn-login">
              Se connecter
            </a>
          </div>
        </div>
      </div>
    </nav>

 <section className="container " style={{maxWidth:"100vw", padding:"0"}}>

      <div className="stargear-header">

        <div className="header-container d-flex justify-content-center align-items-end gap-3">

          <img src="./src/assets/stickfight.jpg" className="poster p1" />

          <img src="./src/assets/rdr2.jpg" className="poster p2" />

          <img src="./src/assets/sonsoftheforest.jpg" className="poster p3" />

          <img src="./src/assets/bf6.jpg" className="poster p4" />

        </div>

        <div className="header-search text-center">

          <p className="header-text">
            Vous avez un jeu en tête? <span>Cherchez-le!</span>
          </p>

          <div className="input-group search-bar mx-auto">

            <input
              type="text"
              className="form-control search-input"
              placeholder="Rechercher un jeu..."
            />

            <button className="btn search-btn">
                <img src="/src/assets/search-svgrepo-com.svg" style={{width:"1rem"}} alt="Rechercher" />
            </button>

          </div>

        </div>

      </div>

    </section>


      <section className="container " style={{maxWidth:"100vw", padding:"0"}}>

      <div className="game-grid">

        <img src="./src/assets/assasin.jpg" className="g1" />
        <img src="./src/assets/rust.jpg" className="g2" />
        <img src="./src/assets/tlou.jpg" className="g3" />

        <img src="./src/assets/gta.jpg" className="g4" />
        <img src="./src/assets/mincraft.jpg" className="g5" />
        <img src="./src/assets/zelda.jpg" className="g6" />

        <img src="./src/assets/witcher.jpg" className="g7" />
        <img src="./src/assets/warzone.jpg" className="g8" />

      </div>

    </section>


<section className="moment-section">
  <div className="container">

      <h2 className="moment-title text-center mb-4">
        Jeux du Moment
      </h2>

      <div className="row g-3">

        <div className="col-lg-5">

          <div className="game-card d-flex">
            <img src="./src/assets/repo.jpg" />
            <div className="game-info">
              <h5>R.E.P.O</h5>
              <div className="d-flex justify-content-between">
                <span>5.99$</span>
              </div>
            </div>
          </div>

          <div className="game-card d-flex">
            <img src="./src/assets/eldenring.jpg" />
            <div className="game-info">
              <h5>Elden Ring</h5>
              <div className="price">5.99$</div>
            </div>
          </div>

          <div className="game-card d-flex">
            <img src="./src/assets/brawlhala.jpg" />
            <div className="game-info">
              <h5>Brawlhalla</h5>
              <div className="price">5.99$</div>
            </div>
          </div>

          <div className="game-card d-flex">
            <img src="./src/assets/village.jpg" />
            <div className="game-info">
              <h5>Resident Evil Village</h5>
              <div className="price">5.99$</div>
            </div>
          </div>

          <div className="game-card d-flex">
            <img src="./src/assets/outlast.jpg" />
            <div className="game-info">
              <h5>Outlast</h5>
              <div className="price">5.99$</div>
            </div>
          </div>

        </div>


        <div className="col-lg-7">

          <div className="big-grid">

            <img src="./src/assets/monster.jpg" className="big1"/>

            <img src="./src/assets/monster2.jpg" className="big2"/>

            <img src="./src/assets/monster3.jpg" className="big3"/>

          </div>

        </div>

      </div>
    </div>
    </section>




     <footer className="stargear-footer text-center pt-5">
      <div className="container-fluid">

        <p className="footer-text mb-3">
          Découvrez plus en vous connectant!
        </p>

        <a href="/SeConnecterPage" className="btn footer-btn mb-4">
          Se connecter
        </a>

        <div>
          <img
              src="./src/assets/starGear.png" alt="StarGear" className="footer-logo "  height="150" width="auto" />
        </div>

      </div>
    </footer>
    </>

  );
}