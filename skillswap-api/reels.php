<?php
require_once 'config.php';
require_once 'auth.php';

// Get public reels
function getPublicReels() {
    $conn = getDBConnection();
    $query = "SELECT r.*, u.username, u.profile_picture 
              FROM reels r 
              JOIN users u ON r.user_id = u.id 
              WHERE r.is_public = 1 
              ORDER BY r.created_at DESC 
              LIMIT 20";
    
    $result = $conn->query($query);
    $reels = [];
    
    while ($row = $result->fetch_assoc()) {
        $reels[] = $row;
    }
    
    $conn->close();
    return $reels;
}

// Get authenticated user's reels feed
function getReelsFeed($userId) {
    $conn = getDBConnection();
    $query = "SELECT r.*, u.username, u.profile_picture,
              (SELECT GROUP_CONCAT(s.name) FROM skills s 
               JOIN reel_skills rs ON s.id = rs.skill_id 
               WHERE rs.reel_id = r.id) as skills
              FROM reels r 
              JOIN users u ON r.user_id = u.id 
              LEFT JOIN user_follows uf ON r.user_id = uf.followed_id
              WHERE r.is_public = 1 OR r.user_id = ? OR uf.follower_id = ?
              ORDER BY r.created_at DESC 
              LIMIT 50";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $userId, $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $reels = [];
    while ($row = $result->fetch_assoc()) {
        if ($row['skills']) {
            $row['skills'] = explode(',', $row['skills']);
        } else {
            $row['skills'] = [];
        }
        $reels[] = $row;
    }
    
    $stmt->close();
    $conn->close();
    return $reels;
}

// API Endpoints
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['public'])) {
        $reels = getPublicReels();
        sendJsonResponse($reels);
    } else {
        $token = getBearerToken();
        if (!$token) {
            sendJsonResponse(['error' => 'Unauthorized'], 401);
            exit();
        }
        
        $userId = validateToken($token);
        if (!$userId) {
            sendJsonResponse(['error' => 'Invalid token'], 401);
            exit();
        }
        
        $reels = getReelsFeed($userId);
        sendJsonResponse($reels);
    }
}
