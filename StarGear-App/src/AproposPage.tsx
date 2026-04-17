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
      linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 70%, #212529 100%),
      url(${bg})
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
        }}
      >
        <div className="text-center text-light position-absolute top-50 start-50 translate-middle pd-5">
          <h2>
            StarGear Vise à donner la meilleur expérience pour les joueurs
          </h2>
<<<<<<< Updated upstream
          <p className="fs-5">
            Nous créons un sanctuaire pour les gamers : un lieu unique où
            dénicher tous les jeux, qu'il s'agisse de blockbusters ou de perles
            rares totalement oubliées.
          </p>
        </div>
      </div>

      <div className="container-fluid py-5 ps-5 bg-dark">
        <div className="row align-items-center mx-5">
          <div className="col-md-6 text-light">
            <h2>Notre origine</h2>
            <p>
              C’est en janvier 2026 qu’est née notre vision : créer une
              plateforme où chaque jeu, sans exception, a sa place. Bien que les
              sites de vente actuels proposent de vastes catalogues,
              d'innombrables créations restent invisibles pour le public. Nous
              avons voulu briser cette barrière en offrant une vitrine équitable
              à tous les développeurs. Pour nous, le jeu vidéo est bien plus
              qu'un simple produit : c’est une œuvre d'art. Notre mission est de
              permettre aux joueurs de découvrir des perles rares et des titres
              obscurs de manière simple et sécurisée, tout en célébrant la
              richesse culturelle de ce média.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/src/assets/hqdefault.jpg"
              alt="Jeux Vidéo"
              className="img-fluid rounded col-md-8"
            />
          </div>
        </div>
      </div>

      <div className="container-fluid py-5 ps-5 bg-dark">
        <div className="row mx-5 justify-content-end">
          <div className="col-md-6 text-center">
            <img
              src="/src/assets/imagejeu.jpg"
              alt="Jeux Vidéo"
              className="img-fluid rounded col-md-8"
            />
          </div>
          <div className="col-md-6 text-light">
            <h2>Les Valeurs de StarGear</h2>
            <p>
              Nous croyons fermement que l’avenir du jeu vidéo réside dans la
              scène indépendante. Alors que l’industrie actuelle tend à brider
              l’innovation par excès de prudence, nous choisissons de soutenir
              ceux qui osent. Là où les grandes productions se ressemblent, les
              créateurs indépendants apportent l'authenticité et l'audace que
              les joueurs réclament. Notre mission est d'offrir à ces talents le
              soutien qu'ils méritent pour redonner ses lettres de noblesse à la
              créativité.
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5 ps-5 bg-dark">
        <h1 className="text-center text-light">Rencontrez notre équipe</h1>
        <div className="row">
          <div className="col-md-3">
            <CasePersonne nom="Félix Allard" role="Fondateur" />
          </div>
          <div className="col-md-3">
            <CasePersonne nom="Maxime Tournier" role="PDG" />
          </div>
          <div className="col-md-3">
            <CasePersonne nom="Jean-Luc Ciolpan" role="COO" />
          </div>
          <div className="col-md-3">
            <CasePersonne nom="Yannis Arris" role="CFO" />
          </div>
=======
          <p></p>
>>>>>>> Stashed changes
        </div>
      </div>
      <Footer />
    </div>
  );
}

function CasePersonne({ nom, role }: { nom: string; role: string }) {
  return (
    <div className="container-fluid py-5 ps-5 text-light">
      <img
        src="/src/assets/user.webp"
        alt=""
        className="img-fluid mb-3"
        style={{ width: 200 }}
      />
      <p>
        {nom} - {role}
      </p>
    </div>
  );
}
