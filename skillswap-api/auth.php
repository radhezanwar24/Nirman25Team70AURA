<?php
// auth.php
require_once 'config.php';

function login($email, $password) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        if (password_verify($password, $user['password'])) {
            $token = bin2hex(random_bytes(16));
            return ['token' => $token, 'username' => $user['username'], 'id' => $user['id']];
        }
    }

    return null;
}

function register($username, $email, $password) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt->bind_param("sss", $username, $email, $hashedPassword);

    if ($stmt->execute()) {
        return true;
    }

    return false;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($_GET['action'])) {
        if ($_GET['action'] === 'login') {
            $result = login($data['email'], $data['password']);
            if ($result) {
                sendJsonResponse($result);
            } else {
                sendJsonResponse(['error' => 'Invalid credentials'], 401);
            }
        } elseif ($_GET['action'] === 'register') {
            if (register($data['username'], $data['email'], $data['password'])) {
                sendJsonResponse(['message' => 'User registered successfully']);
            } else {
                sendJsonResponse(['error' => 'Registration failed'], 500);
            }
        }
    }
}