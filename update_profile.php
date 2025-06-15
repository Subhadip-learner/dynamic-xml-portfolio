<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    if (empty($email)) {
        echo "Email is required.";
        exit;
    }

    $phone = $_POST['phone'] ?? '';
    $whatsapp = $_POST['whatsapp'] ?? '';
    $address = $_POST['address'] ?? '';
    $aboutme = $_POST['aboutme'] ?? '';

    $skillsJson = $_POST['skills'] ?? '[]';
    $projectsJson = $_POST['projects'] ?? '[]';
    $educationJson = $_POST['education_qualification'] ?? '[]';
    $workexperiencesJson = $_POST['workexperiences'] ?? '[]';
    $testimonialsJson = $_POST['testimonials'] ?? '[]';
    $certificationsJson = $_POST['certifications'] ?? '[]';
    $accomplishmentsJson = $_POST['accomplishments'] ?? '[]';
    $sociallinksJson = $_POST['sociallinks'] ?? '{}';

    $skills = json_decode($skillsJson, true) ?? [];
    $projects = json_decode($projectsJson, true) ?? [];
    $education_qualification = json_decode($educationJson, true) ?? [];
    $workexperiences = json_decode($workexperiencesJson, true) ?? [];
    $testimonials = json_decode($testimonialsJson, true) ?? [];
    $certifications = json_decode($certificationsJson, true) ?? [];
    $accomplishments = json_decode($accomplishmentsJson, true) ?? [];
    $sociallinks = json_decode($sociallinksJson, true) ?? [];

    $photo = $_FILES['photo'] ?? null;

    $xmlFile = realpath(__DIR__ . '/../data/users.xml');
    if (!$xmlFile || !file_exists($xmlFile)) {
        echo "User data file not found.";
        exit;
    }

    $xml = simplexml_load_file($xmlFile);
    $user = null;
    foreach ($xml->user as $u) {
        if ((string)$u->email === $email) {
            $user = $u;
            break;
        }
    }

    if (!$user) {
        
        $user = $xml->addChild('user');
        $user->addChild('email', $email);
    }



    
    if (isset($user->contact)) {
        $user->contact->phone = $phone;
        if (!empty($whatsapp)) {
            $user->contact->whatsapp = $whatsapp;
        } else {
            unset($user->contact->whatsapp);
        }
    } else {
        $contact = $user->addChild('contact');
        $contact->addChild('phone', $phone);
        if (!empty($whatsapp)) {
            $contact->addChild('whatsapp', $whatsapp);
        }
    }

    
    $user->address = $address;
    $user->aboutme = $aboutme;

    
    unset($user->skills);
    $skillsNode = $user->addChild('skills');
    foreach ($skills as $skill) {
        if (is_array($skill) && isset($skill['name']) && isset($skill['proficiencylevel'])) {
            $skillNode = $skillsNode->addChild('skill');
            $skillNode->addChild('name', htmlspecialchars($skill['name']));
            $skillNode->addChild('proficiencylevel', htmlspecialchars($skill['proficiencylevel']));
        } else {
            $skillsNode->addChild('skill', htmlspecialchars($skill));
        }
    }

    
    unset($user->projects);
    $projectsNode = $user->addChild('projects');
    $uploadDir = realpath(__DIR__ . '/../data/projectZip');
    if (!$uploadDir) {
        echo "Project zip upload directory not found.";
        exit;
    }
    $uploadDirImages = realpath(__DIR__ . '/../data/images');
    if (!$uploadDirImages) {
        echo "Project images upload directory not found.";
        exit;
    }
    foreach ($projects as $index => $project) {
        $projectNode = $projectsNode->addChild('project');
        $projectNode->addChild('projectname', htmlspecialchars($project['projectname'] ?? ''));
        $projectNode->addChild('project_description', htmlspecialchars($project['project_description'] ?? ''));

        
        $fileKey = "projectzip" . $index;
        $projectZipFileName = '';
        if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
            $tmpName = $_FILES[$fileKey]['tmp_name'];
            $fileName = basename($_FILES[$fileKey]['name']);
            
            $fileName = preg_replace('/[^a-zA-Z0-9_\.-]/', '_', $fileName);
            $targetPath = $uploadDir . DIRECTORY_SEPARATOR . $fileName;
            if (move_uploaded_file($tmpName, $targetPath)) {
                $projectZipFileName = 'data/projectZip/' . $fileName;
            } else {
                echo "Failed to upload project zip for project index $index.";
                exit;
            }
        }
        
        $projectNode->addChild('projectzip', $projectZipFileName);

        
        $projectImagesNode = $projectNode->addChild('projectimages');
        $imageIndex = 0;
        $hasImages = false;
        while (true) {
            $imageKey = "projectimage{$index}_{$imageIndex}";
            if (!isset($_FILES[$imageKey])) {
                break;
            }
            if ($_FILES[$imageKey]['error'] === UPLOAD_ERR_OK) {
                $tmpName = $_FILES[$imageKey]['tmp_name'];
                $fileName = basename($_FILES[$imageKey]['name']);
                // Sanitize file name
                $fileName = preg_replace('/[^a-zA-Z0-9_\.-]/', '_', $fileName);
                $targetPath = $uploadDirImages . DIRECTORY_SEPARATOR . $fileName;
                if (move_uploaded_file($tmpName, $targetPath)) {
                    $projectImagesNode->addChild('image', 'data/images/' . $fileName);
                    $hasImages = true;
                } else {
                    echo "Failed to upload project image for project index $index, image $imageIndex.";
                    exit;
                }
            }
            $imageIndex++;
        }
        

        // Add technologies used
        $technologyUsedNode = $projectNode->addChild('technologyused');
        if (isset($project['technologyused']) && is_array($project['technologyused'])) {
            foreach ($project['technologyused'] as $technology) {
                $technologyUsedNode->addChild('technology', htmlspecialchars($technology));
            }
        }
    }

    // Update education qualification
    unset($user->education_qualification);
    $educationNode = $user->addChild('education_qualification');
    foreach ($education_qualification as $edu) {
        $eduNode = $educationNode->addChild('education');
        $eduNode->addChild('institute', htmlspecialchars($edu['institute'] ?? ''));
        $eduNode->addChild('course', htmlspecialchars($edu['course'] ?? ''));
    }

    // Update work experiences
    unset($user->workexperiences);
    $workNode = $user->addChild('workexperiences');
    foreach ($workexperiences as $work) {
        $workExpNode = $workNode->addChild('workexperience');
        $workExpNode->addChild('company_name', htmlspecialchars($work['company_name'] ?? ''));
        $workExpNode->addChild('role', htmlspecialchars($work['role'] ?? ''));
        $workExpNode->addChild('start_year', htmlspecialchars($work['start_year'] ?? ''));
        $workExpNode->addChild('end_year', htmlspecialchars($work['end_year'] ?? ''));
    }

    // Update testimonials
    unset($user->testimonials);
    $testimonialsNode = $user->addChild('testimonials');
    foreach ($testimonials as $testimonial) {
        $testNode = $testimonialsNode->addChild('testimonial');
        $testNode->addChild('made_by', htmlspecialchars($testimonial['made_by'] ?? ''));
        $testNode->addChild('statement', htmlspecialchars($testimonial['statement'] ?? ''));
    }

    // Update certifications
    unset($user->certifications);
    $certificationsNode = $user->addChild('certifications');
    foreach ($certifications as $cert) {
        $certificationsNode->addChild('certification', htmlspecialchars($cert));
    }

    // Update accomplishments
    unset($user->accomplishments);
    $accomplishmentsNode = $user->addChild('accomplishments');
    foreach ($accomplishments as $acc) {
        $accomplishmentsNode->addChild('accomplishment', htmlspecialchars($acc));
    }

    // Update social links
    if (isset($user->sociallinks)) {
        unset($user->sociallinks);
    }
    $socialNode = $user->addChild('sociallinks');
    if (!empty($sociallinks['Github'])) {
        $socialNode->addChild('Github', htmlspecialchars($sociallinks['Github']));
    }
    if (!empty($sociallinks['linkdn'])) {
        $socialNode->addChild('linkdn', htmlspecialchars($sociallinks['linkdn']));
    }

    // Handle photo upload
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $uploadDirImages = realpath(__DIR__ . '/../data/images');
        if (!$uploadDirImages) {
            echo "Photo upload directory not found.";
            exit;
        }
        $tmpName = $_FILES['photo']['tmp_name'];
        $fileName = basename($_FILES['photo']['name']);
        $targetPath = $uploadDirImages . DIRECTORY_SEPARATOR . $fileName;
        if (move_uploaded_file($tmpName, $targetPath)) {
            $user->photo = 'data/images/' . $fileName;
        } else {
            echo "Failed to upload photo.";
            exit;
        }
    }

    if ($xml->asXML($xmlFile) === false) {
        echo "Failed to save user data.";
        exit;
    }
    echo "Profile updated successfully.";
} else {
    echo "Invalid request method.";
}
?>
