<?php

header("Content-Type: application/json; charset=UTF-8");

$response = [];
$conn = new mysqli("localhost", "root", "", "");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur connexion : " . $conn->connect_error]);
    exit;
}

$sql = "CREATE DATABASE IF NOT EXISTS info4you";
if ($conn->query($sql) === TRUE) {
    $response[] = "Base de donnees info4you creee ou deja existante";
} else {
    http_response_code(500);
    echo json_encode(["error" => "Erreur creation BD : " . $conn->error]);
    exit;
}

$conn->select_db("info4you");

$sql = "CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    contenue LONGTEXT NOT NULL,
    categorie VARCHAR(100),
    auteur VARCHAR(100),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    $response[] = "Table articles creee ou deja existante";
} else {
    http_response_code(500);
    echo json_encode(["error" => "Erreur creation table : " . $conn->error]);
    exit;
}

$conn->close();

echo json_encode([
    "status" => "success",
    "message" => "Base de donnees et table configurees avec succes",
    "details" => $response
]);
