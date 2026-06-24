import { useEffect, useState } from "react";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost/info4you/api-info4you/article.php")
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Info4You</h1>

    {articles.map((article) => (
  <div key={article.id} className="article-card">
    <h2>{article.titre}</h2>
    <p>{article.contenue}</p>
    <p><strong>Catégorie :</strong> {article.categorie}</p>
    <p><strong>Auteur :</strong> {article.auteur}</p>
  </div>
))}
    </div>
  );
}

export default Home;