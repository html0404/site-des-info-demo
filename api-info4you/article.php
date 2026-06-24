<?php
header("Access-Control-Allow-Origin: http://localhost:5173");

$conn = new mysqli("localhost", "root", "", "info4you");
if ($conn->connect_error) {
    die("Erreur connexion : " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM articles");

$articles = [];

while ($row = $result->fetch_assoc()) {
    $articles[] = $row;
}

header("Content-Type: application/json");
echo json_encode($articles);