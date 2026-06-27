import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import logo from "./assets/image/logo.jpg";
import "./App.css";

function App() {
  const site = "Info4You";
  const auteur = "Youssef et Melanie";
  const annee = 2026;

  return (
    <BrowserRouter>
      <div className="app">
        <header className="site-header">
          <img src={logo} alt="Logo Info4You" className="logo" />
          <div>
            <p className="header-kicker">Votre source d'information</p>
            <h1>{site}</h1>
            <p>Votre portail d'actualites, simplement.</p>
          </div>
        </header>

        <nav className="site-nav" aria-label="Navigation principale">
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/actualites">Actualites</NavLink>
          <NavLink to="/sport">Sport</NavLink>
          <NavLink to="/culture">Culture</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>

        <main className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/actualites" element={<Home categorie="Actualites" />} />
            <Route path="/sport" element={<Home categorie="Sport" />} />
            <Route path="/culture" element={<Home categorie="Culture" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>

          <section className="about">
            <h2>A propos</h2>
            <p>
              Info4You est un projet realise pour creer un veritable site
              d'actualites par Youssef Elmaziz.
            </p>
          </section>
        </main>

        <footer className="site-footer">
          <p>&copy; {annee} - Cree par {auteur}</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
