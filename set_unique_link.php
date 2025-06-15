<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $newLink = $input['link'] ?? '';

    if (empty($email)) {
        echo "Email is missing.";
        exit;
    }
    if (empty($newLink)) {
        echo "Link is missing.";
        exit;
    }

    $xmlFile = realpath(__DIR__ . '/../data/users.xml');
    if (!$xmlFile || !file_exists($xmlFile)) {
        echo "User data file not found.";
        exit;
    }

    $xml = simplexml_load_file($xmlFile);

    
    $newLinkLower = strtolower(trim($newLink));
    foreach ($xml->user as $userCheck) {
        if (isset($userCheck->link)) {
            $existingLink = strtolower(trim((string)$userCheck->link));
            $existingEmail = (string)$userCheck->email;
            if ($existingLink === $newLinkLower && $existingEmail !== $email) {
                echo "This link is already taken. Please try another.";
                exit;
            }
        }
    }

    $found = false;
    foreach ($xml->user as $user) {
        if ((string)$user->email === $email) {
            $user->link = $newLink;
            $found = true;
            break;
        }
    }

    if ($found) {
        if ($xml->asXML($xmlFile) === false) {
            echo "Failed to save user data.";
            exit;
        }
        echo "Link is updated and your link is this: " . $newLink;
    } else {
        echo "User not found.";
    }
} else {
    echo "Invalid request method.";
}
?>
