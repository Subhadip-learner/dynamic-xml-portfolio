<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_GET['email'] ?? '';

    if (empty($email)) {
        echo "Email parameter missing.";
        exit;
    }

    $xmlFile = realpath(__DIR__ . '/../data/users.xml');
    if (!$xmlFile || !file_exists($xmlFile)) {
        echo "User data file not found.";
        exit;
    }

    $xml = simplexml_load_file($xmlFile);
    $found = false;

   
    foreach ($xml->user as $index => $user) {
        if ((string)$user->email === $email) {
            unset($xml->user[$index]);
            $found = true;
            break;
        }
    }

    if ($found) {
        $xml->asXML($xmlFile);
        echo "Account deleted successfully.";
    } else {
        echo "User not found.";
    }
} else {
    echo "Invalid request method.";
}
?>
