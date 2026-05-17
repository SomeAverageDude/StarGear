import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "./helper/navbar";
import Footer from "./helper/footer";
import { useNavigate } from "react-router";

type User = {
  _id: string;
  courriel: string;
  nomUtilisateur: string;
  role?: string;
};

const USERS_PER_PAGE = 8;
const API = "http://localhost:4000/users";

export default function AdminUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<User | null>(null);

  useEffect(() => {
    fetch(API, { credentials: "include" })
      .then((r) => r.json())
      .then((data) =>
        Array.isArray(data)
          ? setUsers(data)
          : toast.error(data.message ?? "Erreur"),
      )
      .catch(() => toast.error("Erreur réseau"));
  }, []);

  const filtered = users.filter((u) =>
    `${u.nomUtilisateur} ${u.courriel}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / USERS_PER_PAGE));
  const visible = filtered.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE,
  );

  const handleDelete = (id: string) => {
    fetch(`${API}/${id}`, { method: "DELETE", credentials: "include" })
      .then(() => {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        toast.success("Utilisateur supprimé");
      })
      .catch(() => toast.error("Erreur suppression"));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget));
    fetch(`${API}/${editing!._id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        setUsers((prev) =>
          prev.map((u) => (u._id === editing!._id ? { ...u, ...form } : u)),
        );
        setEditing(null);
        toast.success("Utilisateur mis à jour");
      })
      .catch(() => toast.error("Erreur mise à jour"));
  };

  return (
    <div
      className="bg-black text-white d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
      <Navbar />

      <div
        style={{
          background:
            "linear-gradient(180deg,#7a0000 0%,#1a0000 50%,#000 100%)",
          padding: "44px 0 32px",
        }}
      >
        <div className="container">
          <h1 className="fw-bold text-uppercase mb-1">
            Panel <span className="text-danger">Administrateur</span>
          </h1>
          <small
            className="text-secondary text-uppercase"
            style={{ letterSpacing: 3 }}
          >
            Gestion des utilisateurs
          </small>
          <br />
          <br />
          <button
            className="btn btn-danger btn-sm rounded-4"
            onClick={() => navigate("/AdminPageJeux")}
          >
            Gérer les jeux
          </button>
        </div>
      </div>

      <div className="container py-4 flex-grow-1">
        <input
          type="search"
          placeholder="Rechercher..."
          className="form-control bg-dark text-white border-secondary mb-3"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <table className="table table-dark table-hover">
          <thead className="border-bottom border-danger border-opacity-25">
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th style={{ width: 200 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((user) => (
              <tr key={user._id}>
                <td>{user.nomUtilisateur}</td>
                <td className="text-secondary">{user.courriel}</td>
                <td>
                  <span
                    className={`badge ${user.role === "admin" ? "bg-danger" : "bg-secondary"}`}
                  >
                    {user.role ?? "user"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => setEditing(user)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(user._id)}
                    disabled={user.role === "admin"}
                    title={
                      user.role === "admin"
                        ? "Impossible de supprimer un administrateur"
                        : "Supprimer l'utilisateur"
                    }
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-center gap-2 align-items-center">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Précédent
          </button>
          <span className="text-secondary">
            Page {page} / {totalPages}
          </span>
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Suivant
          </button>
        </div>
      </div>

      <Footer />

      {editing && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,.8)" }}
          onClick={() => setEditing(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-dark text-white border border-danger border-opacity-25">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">
                  Modifier <span className="text-danger">utilisateur</span>
                </h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setEditing(null)}
                />
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  <input
                    name="nomUtilisateur"
                    className="form-control bg-black text-white border-secondary mb-2"
                    placeholder="Nom"
                    defaultValue={editing.nomUtilisateur}
                  />
                  <input
                    name="courriel"
                    type="email"
                    className="form-control bg-black text-white border-secondary"
                    placeholder="Email"
                    defaultValue={editing.courriel}
                  />
                </div>
                <div className="modal-footer border-secondary">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setEditing(null)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-danger">
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
