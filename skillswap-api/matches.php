<?php
// matches.php
require_once 'config.php';

function getMatches($userId) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT m.id, m.status, u.id as matched_user_id, u.username FROM matches m JOIN users u ON m.matched_user_id = u.id WHERE m.user_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_all(MYSQLI_ASSOC);
}

function createMatch($userId, $matchedUserId) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("INSERT INTO matches (user_id, matched_user_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $userId, $matchedUserId);

    return $stmt->execute();
}

function updateMatchStatus($matchId, $status) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("UPDATE matches SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $status, $matchId);

    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['user_id'])) {
    $matches = getMatches($_GET['user_id']);
    sendJsonResponse($matches);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['action']) && $data['action'] === 'create') {
        $result = createMatch($data['user_id'], $data['matched_user_id']);
        if ($result) {
            sendJsonResponse(['message' => 'Match created successfully']);
        } else {
            sendJsonResponse(['error' => 'Failed to create match'], 500);
        }
    } elseif (isset($data['action']) && $data['action'] === 'update') {
        $result = updateMatchStatus($data['match_id'], $data['status']);
        if ($result) {
            sendJsonResponse(['message' => 'Match status updated successfully']);
        } else {
            sendJsonResponse(['error' => 'Failed to update match status'], 500);
        }
    }
}