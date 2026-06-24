<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "info4you");

if ($conn->connect_error) {
    die("Erreur connexion : " . $conn->connect_error);
}

$titre = $_POST["titre"] ?? "";
$contenue = $_POST["contenue"] ?? "";
$categorie = $_POST["categorie"] ?? "";
$auteur = $_POST["auteur"] ?? "";

$sql = "INSERT INTO articles (titre, contenue, categorie, auteur)
VALUES ('$titre', '$contenue', '$categorie', '$auteur')";

if ($conn->query($sql)) {
    echo "Article ajouté";
} else {
    echo "Erreur : " . $conn->error;
}