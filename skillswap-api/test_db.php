<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
require_once 'config.php';

$response = ['steps' => []];

try {
    // Test database connection
    $conn = getDBConnection();
    $response['steps'][] = "Database connection successful!";
    
    // Check if users table exists
    $result = $conn->query("SHOW TABLES LIKE 'users'");
    if ($result->num_rows == 0) {
        // Create users table if it doesn't exist
        $sql = "CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        
        if ($conn->query($sql) === TRUE) {
            $response['steps'][] = "Users table created successfully!";
        } else {
            throw new Exception("Error creating users table: " . $conn->error);
        }
    } else {
        $response['steps'][] = "Users table exists!";
        
        // Show table structure
        $result = $conn->query("DESCRIBE users");
        $structure = [];
        while ($row = $result->fetch_assoc()) {
            $structure[] = "{$row['Field']} - {$row['Type']} - {$row['Null']} - {$row['Key']}";
        }
        $response['table_structure'] = $structure;
    }
    
    // Test insertion
    $testUsername = "test_user_" . time();
    $testEmail = "test" . time() . "@example.com";
    $testPassword = password_hash("test123", PASSWORD_DEFAULT);
    
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    $stmt->bind_param("sss", $testUsername, $testEmail, $testPassword);
    if ($stmt->execute()) {
        $response['steps'][] = "Test user created successfully!";
        
        // Verify the user was created
        $verifyStmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $verifyStmt->bind_param("s", $testEmail);
        $verifyStmt->execute();
        $result = $verifyStmt->get_result();
        
        if ($user = $result->fetch_assoc()) {
            $response['steps'][] = "User verification successful!";
            $response['test_user'] = [
                'username' => $user['username'],
                'email' => $user['email']
            ];
        } else {
            throw new Exception("User verification failed!");
        }
    } else {
        throw new Exception("Error creating test user: " . $stmt->error);
    }
    
    $response['success'] = true;
    
} catch (Exception $e) {
    $response['success'] = false;
    $response['error'] = $e->getMessage();
}

echo json_encode($response, JSON_PRETTY_PRINT);
