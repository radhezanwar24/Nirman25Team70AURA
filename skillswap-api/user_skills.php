<?php
// user_skills.php
require_once 'config.php';

function getUserSkills($userId) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT s.id, s.name, s.category, us.proficiency_level FROM skills s JOIN user_skills us ON s.id = us.skill_id WHERE us.user_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_all(MYSQLI_ASSOC);
}

function addUserSkill($userId, $skillId, $proficiencyLevel) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("INSERT INTO user_skills (user_id, skill_id, proficiency_level) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $userId, $skillId, $proficiencyLevel);

    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['user_id'])) {
    $userSkills = getUserSkills($_GET['user_id']);
    sendJsonResponse($userSkills);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $result = addUserSkill($data['user_id'], $data['skill_id'], $data['proficiency_level']);

    if ($result) {
        sendJsonResponse(['message' => 'User skill added successfully']);
    } else {
        sendJsonResponse(['error' => 'Failed to add user skill'], 500);
    }
}