import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import logo from "./assets/image/logo.jpg";
import "./App.css";
function App() {
  const site = "Info4You";
  const auteur = "Youssef et Mélanie";
  const annee = 2026;

  return (
    <div>
      <header>
       <img src={logo} alt="Logo Info4You" className="logo" />
        <h2>Votre source d'information</h2>
        <h1>{site}</h1>
        <p>Votre portail d'actualités</p>
        <p>L'actualité, simplement.</p>
      </header>

      <hr />

      <nav>
        <button>Accueil</button>
        <button>Actualités</button>
        <button>Sport</button>
        <button>Culture</button>
        <button>Contact</button>
        <button>Admin</button>
      </nav>

      <hr />

      <main>
        <h2>📰 Actualités</h2>

        <article>
          <h3>Ouverture de Info4You</h3>
          <p>
            Bienvenue sur Info4You. Retrouvez chaque jour les dernières
            actualités du monde.
          </p>
        </article>

        <article>
          <h3>Nouvelle rubrique Sport</h3>
          <p>
            Les résultats des matchs et les dernières informations sportives.
          </p>
        </article>

        <article>
          <h3>Culture</h3>
          <p>
            Découvrez les nouveautés du cinéma, de la musique et des livres.
          </p>
        </article>
      </main>

      <hr />

      <section>
        <h2>À propos</h2>
        <p>
          Info4You est un projet réalisé pour apprendre React et créer un
          véritable site d'actualités.
        </p>
      </section>

      <hr />

      <footer>
        <p>© {annee} - Créé par {auteur}</p>
      </footer>
    </div>
  );
}

export default App;