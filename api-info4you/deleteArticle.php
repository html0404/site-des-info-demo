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

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "ID article manquant"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM articles WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["message" => "Article supprimé"]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Article non trouvé"]);
    }
} else {
    http_response_code(500);
    echo json_encode(["error" => "Erreur : " . $stmt->error]);
}

$stmt->close();
$conn->close();
