<?php
// messages.php
require_once 'config.php';

function getMessages($userId, $receiverId) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at ASC");
    $stmt->bind_param("iiii", $userId, $receiverId, $receiverId, $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_all(MYSQLI_ASSOC);
}

function sendMessage($senderId, $receiverId, $content) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $senderId, $receiverId, $content);

    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['user_id']) && isset($_GET['receiver_id'])) {
    $messages = getMessages($_GET['user_id'], $_GET['receiver_id']);
    sendJsonResponse($messages);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $result = sendMessage($data['sender_id'], $data['receiver_id'], $data['content']);

    if ($result) {
        sendJsonResponse(['message' => 'Message sent successfully']);
    } else {
        sendJsonResponse(['error' => 'Failed to send message'], 500);
    }
}