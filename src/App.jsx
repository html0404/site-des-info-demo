function App() {
  const site = "Info4You";
  const auteur = "Youssef et melanie";
  const annee = 2026;

  return (
    <div>
      <h1>{site}</h1>

      <p>Créé par : {auteur}</p>

      <p>Année : {annee}</p>

      <div>
        <h2>Actualités</h2>
        <p>Les dernières nouvelles.</p>
      </div>

      <div>
        <h2>Sport</h2>
        <p>Les résultats des matchs.</p>
      </div>

      <div>
        <h2>Culture</h2>
        <p>Toute l'actualité culturelle.</p>
      </div>
    </div>
  );
}

export default App;