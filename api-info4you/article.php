<?php

// CORS headers - ALWAYS first before anything else
header("Access-Control-Allow-Origin: *");
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

$result = $conn->query("SELECT * FROM articles ORDER BY id DESC");

$articles = [];

while ($row = $result->fetch_assoc()) {
    $articles[] = $row;
}

echo json_encode($articles);

$conn->close();