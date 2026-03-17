import { useEffect, useState } from "react";

type Jeu = {
  id_jeu: number;
  nom_jeu: string;
  developpeur: string;
  date_de_sortie: string;
  prix: number;
  sale: number;
  description: string;
  file_size: number;
  revue_id_revue: number;
};

export default function AdminPage() {
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const [modifierJeu, setModifierJeu] = useState<Jeu | null>(null);
  const [formJeu, setFormJeu] = useState<Partial<Jeu> | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/jeux")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch jeux");
        }
        return res.json();
      })
      .then((data) => setJeux(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:4000/jeux/${id}/delete`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete jeu");
        }

        setJeux((prevJeux) => prevJeux.filter((jeu) => jeu.id_jeu != id));
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormJeu({
      ...formJeu,
      [name]: ["prix", "sale", "file_size", "revue_id_revue"].includes(name)
        ? Number(value)
        : value,
    });
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    fetch(`http://localhost:4000/jeux/${formJeu?.id_jeu}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formJeu),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update jeu");
        }

        setJeux((prevJeux) =>
          prevJeux.map((j) =>
            j.id_jeu === formJeu?.id_jeu ? { ...j, ...formJeu } : j,
          ),
        );
        setModifierJeu(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container-fluid mt-4 ">
      <div className="list-group">
        {jeux.map((jeu) => (
          <div key={jeu.id_jeu} className="list-group-item">
            <div className="row align-items-center">
              <div className="col-8">
                <h5 className="mb-1">{jeu.nom_jeu}</h5>
                <p className="mb-1">{jeu.description}</p>
                <small className="text-muted">{jeu.developpeur}</small>
              </div>

              <div className="col-4 justify-content-center mt-3">
                <button
                  className="btn btn-warning me-2"
                  onClick={() => {
                    setModifierJeu(jeu);
                    setFormJeu(jeu);
                  }}
                >
                  Modifier
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(jeu.id_jeu)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modifierJeu && (
        <div className="modal d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier Jeu</h5>
                <button
                  className="btn-close"
                  onClick={() => setModifierJeu(null)}
                ></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nom_jeu"
                      value={formJeu?.nom_jeu}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Developpeur</label>
                    <input
                      type="text"
                      className="form-control"
                      name="developpeur"
                      value={formJeu?.developpeur}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Date de sortie</label>
                    <input
                      type="text"
                      className="form-control"
                      name="date_de_sortie"
                      value={formJeu?.date_de_sortie}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Prix</label>
                    <input
                      type="text"
                      className="form-control"
                      name="prix"
                      value={formJeu?.prix}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Sale</label>
                    <input
                      type="text"
                      className="form-control"
                      name="sale"
                      value={formJeu?.sale}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={formJeu?.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Prix</label>
                    <input
                      type="text"
                      className="form-control"
                      name="prix"
                      value={formJeu?.prix}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Taile du fichier</label>
                    <input
                      type="text"
                      className="form-control"
                      name="file_size"
                      value={formJeu?.file_size}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Revue id</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Revue_id"
                      value={formJeu?.revue_id_revue}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Modifier
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
