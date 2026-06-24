import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import logo from "./assets/image/logo.jpg";
import "./App.css";

function App() {
  const site = "Info4You";
  const auteur = "Youssef et Mélanie";
  const annee = 2026;

  return (
    <BrowserRouter>
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
  <Link to="/">
    <button>Accueil</button>
  </Link>

  <button>Actualités</button>
  <button>Sport</button>
  <button>Culture</button>
  <button>Contact</button>

  <Link to="/admin">
    <button>Admin</button>
  </Link>
</nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <hr />

        <section>
          <h2>À propos</h2>
          <p>
            Info4You est un projet réalisé pour créer un véritable site
            d'actualités par Youssef Elmaziz.
          </p>
        </section>

        <hr />

        <footer>
          <p>© {annee} - Créé par {auteur}</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;