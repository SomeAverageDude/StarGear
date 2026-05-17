import { useEffect, useState } from "react";
import Navbar from "./helper/navbar";
import Footer from "./helper/footer";
import { toast } from "react-toastify";

type User = {
  _id: string;
  courriel: string;
  nomUtilisateur: string;
};

export default function DetailCompte() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ nomUtilisateur: "", courriel: "" });

  useEffect(() => {
    fetch("http://localhost:4000/users/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setForm({ nomUtilisateur: data.nomUtilisateur, courriel: data.courriel });
      })
      .catch(() => setUser(null));
  }, []);

  const handleCancel = () => {
    setEditing(false);
    setForm({ nomUtilisateur: user?.nomUtilisateur ?? "", courriel: user?.courriel ?? "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.nomUtilisateur === user?.nomUtilisateur && form.courriel === user?.courriel) {
      setEditing(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/users/me", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setUser(updated);
      setEditing(false);
      toast.success("Compte modifié avec succès.");
    } catch {
      toast.error("Erreur lors de la modification du compte.");
    }
  };

  return (
    <div className="bg-black text-white min-vh-100 d-flex flex-column">
      <Navbar />

      <div className="container py-5 flex-grow-1" style={{ maxWidth: "560px" }}>
        <h2 className="mb-1">
          Bonjour, <span className="text-danger">{user?.nomUtilisateur}</span> !
        </h2>
        <p className="text-white-50 mb-5">Gérez les informations de votre compte.</p>

        <div
          className="rounded-4 p-4"
          style={{ background: "linear-gradient(180deg, #1a1a1a, #000)", border: "1px solid #333" }}
        >
          {user ? (
            editing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-white-50">Nom d'utilisateur</label>
                  <input
                    type="text"
                    className="form-control bg-black text-white border-secondary"
                    value={form.nomUtilisateur}
                    onChange={(e) => setForm({ ...form, nomUtilisateur: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-white-50">Courriel</label>
                  <input
                    type="email"
                    className="form-control bg-black text-white border-secondary"
                    value={form.courriel}
                    onChange={(e) => setForm({ ...form, courriel: e.target.value })}
                    required
                  />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-danger rounded-5">Sauvegarder</button>
                  <button type="button" className="btn btn-outline-secondary rounded-5" onClick={handleCancel}>Annuler</button>
                </div>
              </form>
            ) : (
              <>
                <div className="mb-4">
                  <div className="text-white-50 small mb-1">Nom d'utilisateur</div>
                  <div className="fs-5 fw-semibold">{user.nomUtilisateur}</div>
                </div>
                <div className="mb-4">
                  <div className="text-white-50 small mb-1">Courriel</div>
                  <div className="fs-5 fw-semibold">{user.courriel}</div>
                </div>
                <button className="btn btn-danger rounded-5" onClick={() => setEditing(true)}>
                  Modifier le compte
                </button>
              </>
            )
          ) : (
            <p className="text-white-50">Utilisateur non trouvé.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}