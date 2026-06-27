import { useCallback, useEffect, useState } from "react";

function Admin() {
  const [titre, setTitre] = useState("");
  const [contenue, setContenue] = useState("");
  const [categorie, setCategorie] = useState("Général");
  const [auteur, setAuteur] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const chargerArticles = useCallback(() => {
    fetch("http://localhost/info4you/api-info4you/article.php")
      .then((response) => response.json())
      .then((data) => {
        setArticles(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des articles:", error);
        setArticles([]);
      });
  }, []);

  // Charger les articles au chargement du composant
  useEffect(() => {
    chargerArticles();
  }, [chargerArticles]);

  const afficherMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const publierArticle = (e) => {
    e.preventDefault();

    // Validation
    if (!titre.trim()) {
      afficherMessage("Veuillez entrer un titre", "error");
      return;
    }
    if (!contenue.trim()) {
      afficherMessage("Veuillez entrer du contenu", "error");
      return;
    }
    if (!auteur.trim()) {
      afficherMessage("Veuillez entrer un auteur", "error");
      return;
    }

    setLoading(true);

    fetch("http://localhost/info4you/api-info4you/addArticle.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titre: titre.trim(),
        contenue: contenue.trim(),
        categorie: categorie,
        auteur: auteur.trim(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          afficherMessage("Article publié avec succès!", "success");
          setTitre("");
          setContenue("");
          setAuteur("");
          setCategorie("Général");
          chargerArticles();
        } else if (data.error) {
          afficherMessage("Erreur: " + data.error, "error");
        }
      })
      .catch((error) => {
        console.error(error);
        afficherMessage("Erreur: " + error.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const supprimerArticle = (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article?")) {
      fetch("http://localhost/info4you/api-info4you/deleteArticle.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            afficherMessage("Article supprimé avec succès!", "success");
            chargerArticles();
          } else if (data.error) {
            afficherMessage("Erreur: " + data.error, "error");
          }
        })
        .catch((error) => {
          console.error(error);
          afficherMessage("Erreur: " + error.message, "error");
        });
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h1>Panneau d'Administration</h1>

      {message && (
        <div
          style={{
            padding: "12px 20px",
            marginBottom: "20px",
            borderRadius: "5px",
            backgroundColor:
              messageType === "success" ? "#d4edda" : "#f8d7da",
            color: messageType === "success" ? "#155724" : "#721c24",
            border:
              messageType === "success"
                ? "1px solid #c3e6cb"
                : "1px solid #f5c6cb",
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={publierArticle}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="titre" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Titre de l'article:
          </label>
          <input
            id="titre"
            type="text"
            placeholder="Entrez le titre..."
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            maxLength="200"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
          <small>{titre.length}/200</small>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="contenue" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Contenu de l'article:
          </label>
          <textarea
            id="contenue"
            placeholder="Entrez le contenu..."
            value={contenue}
            onChange={(e) => setContenue(e.target.value)}
            maxLength="5000"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
              minHeight: "150px",
              boxSizing: "border-box",
              fontFamily: "Arial, sans-serif",
              resize: "vertical",
            }}
          />
          <small>{contenue.length}/5000</small>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="auteur" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Auteur:
          </label>
          <input
            id="auteur"
            type="text"
            placeholder="Votre nom..."
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            maxLength="100"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="categorie" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Catégorie:
          </label>
          <select
            id="categorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          >
            <option value="Général">Général</option>
            <option value="Actualités">Actualités</option>
            <option value="Sport">Sport</option>
            <option value="Culture">Culture</option>
            <option value="Technologie">Technologie</option>
            <option value="Santé">Santé</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 30px",
            backgroundColor: loading ? "#ccc" : "#eb25b3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Publication en cours..." : "Publier l'article"}
        </button>
      </form>

      <hr style={{ margin: "40px 0", borderColor: "#ddd" }} />

      <h2>Articles ({articles.length})</h2>

      {articles.length === 0 ? (
        <p style={{ color: "#666", fontStyle: "italic" }}>
          Aucun article pour le moment.
        </p>
      ) : (
        <div>
          {articles.map((article) => (
            <div
              key={article.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3 style={{ marginTop: 0, color: "#8a1e1e" }}>
                {article.titre}
              </h3>
              <p style={{ color: "#555", lineHeight: "1.6" }}>
                {article.contenue}
              </p>
              <div style={{ marginTop: "15px", paddingBottom: "15px", borderBottom: "1px solid #ddd" }}>
                <small style={{ color: "#666", display: "block", marginBottom: "5px" }}>
                  <strong>Catégorie:</strong> {article.categorie || "Non spécifiée"}
                </small>
                <small style={{ color: "#666" }}>
                  <strong>Auteur:</strong> {article.auteur || "Anonyme"}
                </small>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "15px",
                  paddingTop: "15px",
                  borderTop: "1px solid #ddd",
                }}
              >
                <small style={{ color: "#999" }}>
                  ID: {article.id}
                  {article.date_creation && (
                    <> • {new Date(article.date_creation).toLocaleDateString("fr-FR")}</>
                  )}
                </small>
                <button
                  onClick={() => supprimerArticle(article.id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#c82333")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#dc3545")
                  }
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
