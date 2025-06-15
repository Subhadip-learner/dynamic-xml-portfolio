<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all fields.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
        exit;
    }

    if (strlen($username) < 3) {
        echo json_encode(['success' => false, 'message' => 'Username must be at least 3 characters.']);
        exit;
    }

    if (strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters.']);
        exit;
    }

    $xmlFile = realpath(__DIR__ . '/../data/users.xml');
    if (!$xmlFile || !file_exists($xmlFile)) {
        echo json_encode(['success' => false, 'message' => 'User data file not found.']);
        exit;
    }

    $xml = simplexml_load_file($xmlFile);

    
    foreach ($xml->user as $user) {
        if ((string)$user->email === $email) {
            echo json_encode(['success' => false, 'message' => 'Email already registered.']);
            exit;
        }
    }

    
    $newUser = $xml->addChild('user');
    $newUser->addChild('username', $username);
    $newUser->addChild('email', $email);
    $newUser->addChild('password', $password);

    if ($xml->asXML($xmlFile)) {
        
        header('Location: ../login/login.html');
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save user data.']);
        exit;
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}
?>
