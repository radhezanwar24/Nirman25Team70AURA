<?php
require_once 'config.php';
require_once 'auth.php';

// Search public videos
function searchPublicVideos($query) {
    $conn = getDBConnection();
    $searchTerm = "%$query%";
    
    $sql = "SELECT r.*, u.username, u.profile_picture,
            (SELECT GROUP_CONCAT(s.name) FROM skills s 
             JOIN reel_skills rs ON s.id = rs.skill_id 
             WHERE rs.reel_id = r.id) as skills
            FROM reels r
            JOIN users u ON r.user_id = u.id
            LEFT JOIN reel_skills rs ON r.id = rs.reel_id
            LEFT JOIN skills s ON rs.skill_id = s.id
            WHERE r.is_public = 1 
            AND (r.title LIKE ? OR r.description LIKE ? OR s.name LIKE ?)
            GROUP BY r.id
            ORDER BY r.created_at DESC
            LIMIT 20";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $searchTerm, $searchTerm, $searchTerm);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $videos = [];
    while ($row = $result->fetch_assoc()) {
        if ($row['skills']) {
            $row['skills'] = explode(',', $row['skills']);
        } else {
            $row['skills'] = [];
        }
        $videos[] = $row;
    }
    
    $stmt->close();
    $conn->close();
    return $videos;
}

// Search videos for authenticated users
function searchVideos($query, $userId) {
    $conn = getDBConnection();
    $searchTerm = "%$query%";
    
    $sql = "SELECT r.*, u.username, u.profile_picture,
            (SELECT GROUP_CONCAT(s.name) FROM skills s 
             JOIN reel_skills rs ON s.id = rs.skill_id 
             WHERE rs.reel_id = r.id) as skills
            FROM reels r
            JOIN users u ON r.user_id = u.id
            LEFT JOIN reel_skills rs ON r.id = rs.reel_id
            LEFT JOIN skills s ON rs.skill_id = s.id
            LEFT JOIN user_follows uf ON r.user_id = uf.followed_id
            WHERE (r.is_public = 1 OR r.user_id = ? OR uf.follower_id = ?)
            AND (r.title LIKE ? OR r.description LIKE ? OR s.name LIKE ?)
            GROUP BY r.id
            ORDER BY r.created_at DESC
            LIMIT 50";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iisss", $userId, $userId, $searchTerm, $searchTerm, $searchTerm);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $videos = [];
    while ($row = $result->fetch_assoc()) {
        if ($row['skills']) {
            $row['skills'] = explode(',', $row['skills']);
        } else {
            $row['skills'] = [];
        }
        $videos[] = $row;
    }
    
    $stmt->close();
    $conn->close();
    return $videos;
}

// API Endpoints
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = isset($_GET['q']) ? $_GET['q'] : '';
    
    if (isset($_GET['public'])) {
        $videos = searchPublicVideos($query);
        sendJsonResponse($videos);
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
        
        $videos = searchVideos($query, $userId);
        sendJsonResponse($videos);
    }
}
