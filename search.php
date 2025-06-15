<?php
header('Content-Type: application/json');

$xmlFile = realpath(__DIR__ . '/../data/users.xml');
if (!$xmlFile || !file_exists($xmlFile)) {
    echo json_encode(['success' => false, 'message' => 'User data file not found.']);
    exit;
}

libxml_use_internal_errors(true);
$xml = simplexml_load_file($xmlFile);
if ($xml === false) {
    echo json_encode(['success' => false, 'message' => 'Failed to load user data file.']);
    exit;
}

$key = trim($_GET['key'] ?? '');

if ($key === '') {
    
    $matchingUsers = [];
    foreach ($xml->user as $user) {
        

        
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
            'username' => (string)$user->username,
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

        $matchingUsers[] = $userData;
    }
    echo json_encode(['success' => true, 'users' => $matchingUsers]);
    exit;
}


function userMatchesKey($user, $key) {
    $key = strtolower($key);

    
    $iterator = new RecursiveIteratorIterator(new SimpleXMLIterator($user->asXML()));
    foreach ($iterator as $element) {
        if (stripos((string)$element, $key) !== false) {
            return true;
        }
    }
    return false;
}

$matchingUsers = [];

foreach ($xml->user as $user) {
    /
    $userXmlString = $user->asXML();
    if (stripos($userXmlString, $key) !== false) {
        
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
            'username' => (string)$user->username,
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

        $matchingUsers[] = $userData;
    }
}

if (count($matchingUsers) > 0) {
    echo json_encode(['success' => true, 'users' => $matchingUsers]);
} else {
    echo json_encode(['success' => false, 'message' => 'No users found matching the key.']);
}
exit;
?>
