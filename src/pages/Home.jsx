import { useEffect, useState } from "react";

const API_URL = "http://localhost/info4you/api-info4you/article.php";

function normaliserCategorie(categorie) {
  return categorie
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function Home({ categorie }) {
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossible de charger les articles.");
        }

        return response.json();
      })
      .then((data) => setArticles(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error(error);
        setErreur("Les articles ne sont pas disponibles pour le moment.");
      })
      .finally(() => setChargement(false));
  }, []);

  const articlesAffiches = categorie
    ? articles.filter(
        (article) =>
          normaliserCategorie(article.categorie) === normaliserCategorie(categorie),
      )
    : articles;

  return (
    <section>
      <div className="page-title">
        <h2>{categorie ? categorie : "Dernieres actualites"}</h2>
        <p>Retrouvez les articles publies par l'equipe Info4You.</p>
      </div>

      {chargement && <p className="status">Chargement des articles...</p>}

      {erreur && <p className="status error">{erreur}</p>}

      {!chargement && !erreur && articlesAffiches.length === 0 && (
        <p className="status">Aucun article dans cette rubrique.</p>
      )}

      <div className="articles-grid">
        {articlesAffiches.map((article) => (
          <article key={article.id} className="article-card">
            <span className="article-category">
              {article.categorie || "General"}
            </span>
            <h3>{article.titre}</h3>
            <p>{article.contenue}</p>
            <div className="article-meta">
              <strong>{article.auteur || "Anonyme"}</strong>
              {article.date_creation && (
                <span>
                  {new Date(article.date_creation).toLocaleDateString("fr-FR")}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Home;
