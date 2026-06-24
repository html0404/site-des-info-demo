import { useState } from "react";

function Admin() {
  const [titre, setTitre] = useState("");
  const [contenue, setContenue] = useState("");

  const publierArticle = () => {
    console.log("Bouton Publier cliqué");

    fetch("http://localhost/info4you/api-info4you/addArticle.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titre,
        contenue,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        setTitre("");
        setContenue("");
      })
      .catch((error) => {
        console.error(error);
        alert("Erreur : " + error);
      });
  };

  return (
    <div>
      <h1>Administration</h1>

      <input
        type="text"
        placeholder="Titre"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Contenu"
        value={contenue}
        onChange={(e) => setContenue(e.target.value)}
      />

      <br />
      <br />

      <button onClick={publierArticle}>
        Publier
      </button>
    </div>
  );
}

export default Admin;