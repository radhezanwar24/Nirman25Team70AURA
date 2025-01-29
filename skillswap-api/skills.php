<?php
// skills.php
require_once 'config.php';

function getAllSkills() {
    $conn = getDBConnection();
    $result = $conn->query("SELECT * FROM skills");
    return $result->fetch_all(MYSQLI_ASSOC);
}

function createSkill($name, $category, $description) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("INSERT INTO skills (name, category, description) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $category, $description);

    if ($stmt->execute()) {
        return $stmt->insert_id;
    }

    return false;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $skills = getAllSkills();
    sendJsonResponse($skills);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $result = createSkill($data['name'], $data['category'], $data['description']);

    if ($result) {
        sendJsonResponse(['message' => 'Skill created successfully', 'id' => $result]);
    } else {
        sendJsonResponse(['error' => 'Failed to create skill'], 500);
    }
}