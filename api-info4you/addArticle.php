<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$conn = new mysqli("localhost", "root", "", "info4you");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur connexion : " . $conn->connect_error]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$titre = $data["titre"] ?? "";
$contenue = $data["contenue"] ?? "";

$stmt = $conn->prepare("INSERT INTO articles (titre, contenue) VALUES (?, ?)");
$stmt->bind_param("ss", $titre, $contenue);

if ($stmt->execute()) {
    echo json_encode(["message" => "Article ajouté"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Erreur : " . $stmt->error]);
}

$stmt->close();
$conn->close();