<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = $_GET['email'] ?? '';

    if (empty($email)) {
        echo json_encode(['error' => 'Email parameter missing']);
        exit;
    }

    $xmlFile = realpath(__DIR__ . '/../data/users.xml');
    if (!$xmlFile || !file_exists($xmlFile)) {
        echo json_encode(['error' => 'User data file not found']);
        exit;
    }

    $xml = simplexml_load_file($xmlFile);
    $userData = null;

    foreach ($xml->user as $user) {
        if ((string)$user->email === $email) {
            
            $skills = [];
            if (isset($user->skills)) {
                foreach ($user->skills->skill as $skill) {
                    $skills[] = [
                        'name' => (string)($skill->name ?? ''),
                        'proficiencylevel' => (string)($skill->proficiencylevel ?? '')
                    ];
                }
            }

            
            $projects = [];
            if (isset($user->projects)) {
                foreach ($user->projects->project as $project) {
                    $technologyused = [];
                    if (isset($project->technologyused)) {
                        foreach ($project->technologyused->technology as $tech) {
                            $technologyused[] = (string)$tech;
                        }
                    }
                    $projectimages = [];
                    if (isset($project->projectimages)) {
                        foreach ($project->projectimages->image as $img) {
                            $projectimages[] = (string)$img;
                        }
                    }
                    $projects[] = [
                        'projectname' => (string)($project->projectname ?? ''),
                        'project_description' => (string)($project->project_description ?? ''),
                        'projectzip' => (string)($project->projectzip ?? ''),
                        'technologyused' => $technologyused,
                        'projectimages' => $projectimages
                    ];
                }
            }

            
            $education_qualification = [];
            if (isset($user->education_qualification)) {
                foreach ($user->education_qualification->education as $edu) {
                    $education_qualification[] = [
                        'institute' => (string)($edu->institute ?? ''),
                        'course' => (string)($edu->course ?? '')
                    ];
                }
            }

           
            $workexperiences = [];
            if (isset($user->workexperiences)) {
                foreach ($user->workexperiences->workexperience as $work) {
                    $workexperiences[] = [
                        'company_name' => (string)($work->company_name ?? ''),
                        'role' => (string)($work->role ?? ''),
                        'start_year' => (string)($work->start_year ?? ''),
                        'end_year' => (string)($work->end_year ?? '')
                    ];
                }
            }

           
            $testimonials = [];
            if (isset($user->testimonials)) {
                foreach ($user->testimonials->testimonial as $test) {
                    $testimonials[] = [
                        'made_by' => (string)($test->made_by ?? ''),
                        'statement' => (string)($test->statement ?? '')
                    ];
                }
            }

            
            $certifications = [];
            if (isset($user->certifications)) {
                foreach ($user->certifications->certification as $cert) {
                    $certifications[] = (string)$cert;
                }
            }

           
            $accomplishments = [];
            if (isset($user->accomplishments)) {
                foreach ($user->accomplishments->accomplishment as $acc) {
                    $accomplishments[] = (string)$acc;
                }
            }

           
            $sociallinks = [];
            if (isset($user->sociallinks)) {
                $sociallinks['Github'] = (string)($user->sociallinks->Github ?? '');
                $sociallinks['linkdn'] = (string)($user->sociallinks->linkdn ?? '');
            }

$userData = [
    'email' => (string)$user->email,
    'contact' => [
        'phone' => (string)($user->contact->phone ?? ''),
        'whatsapp' => (string)($user->contact->whatsapp ?? '')
    ],
    'address' => (string)($user->address ?? ''),
    'aboutme' => (string)($user->aboutme ?? ''),
    'link' => (string)($user->link ?? ''),
    'skills' => $skills,
    'projects' => $projects,
    'education_qualification' => $education_qualification,
    'workexperiences' => $workexperiences,
    'testimonials' => $testimonials,
    'certifications' => $certifications,
    'accomplishments' => $accomplishments,
    'sociallinks' => $sociallinks,
    'photo' => (string)($user->photo ?? '')
];
            break;
        }
    }

    if ($userData) {
        echo json_encode($userData);
    } else {
        echo json_encode(['error' => 'User not found']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>
