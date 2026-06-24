<?php

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "info4you"
);

if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}