import { useState } from "react";

function Admin() {
  const [titre, setTitre] = useState("");
  const [contenue, setContenue] = useState("");
  const [categorie, setCategorie] = useState("");
  const [auteur, setAuteur] = useState("");
 const ajouterArticle = () => {
  const formData = new FormData();

  formData.append("titre", titre);
  formData.append("contenue", contenue);
  formData.append("categorie", categorie);
  formData.append("auteur", auteur);

  fetch("http://localhost/info4you/api-info4you/addArticle.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
    })
    .catch((error) => {
      console.error(error);
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

      <input
        type="text"
        placeholder="Catégorie"
        value={categorie}
        onChange={(e) => setCategorie(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Auteur"
        value={auteur}
        onChange={(e) => setAuteur(e.target.value)}
      />

      <br />
      <br />

     <button onClick={ajouterArticle}>
  Ajouter
</button>
    </div>
  );
}

export default Admin;