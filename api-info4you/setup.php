<?php

header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "");

if ($conn->connect_error) {
    echo json_encode(["error" => "Erreur connexion : " . $conn->connect_error]);
    exit;
}

// Créer la base de données si elle n'existe pas
$sql = "CREATE DATABASE IF NOT EXISTS info4you";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Base de données info4you créée ou déjà existante"]);
} else {
    echo json_encode(["error" => "Erreur création BD : " . $conn->error]);
    exit;
}

// Sélectionner la base de données
$conn->select_db("info4you");

// Créer la table articles si elle n'existe pas
$sql = "CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    contenue LONGTEXT NOT NULL,
    categorie VARCHAR(100),
    auteur VARCHAR(100),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Table articles créée ou déjà existante"]);
} else {
    echo json_encode(["error" => "Erreur création table : " . $conn->error]);
    exit;
}

$conn->close();

echo json_encode(["status" => "success", "message" => "Base de données et table configurées avec succès!"]);
