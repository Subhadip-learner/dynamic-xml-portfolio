/**
 * profile.js - Handles loading and saving user profile data in the specified XML format.
 */

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function createTechnologyInput(value = '') {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'technology';
  input.placeholder = 'Technology';
  input.value = value;
  return input;
}

function createImageInput() {
  const input = document.createElement('input');
  input.type = 'file';
  input.className = 'projectimage';
  input.accept = 'image/*';
  return input;
}

function createProjectEntry(project) {
  const div = document.createElement('div');
  div.className = 'project-entry';

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.className = 'projectname';
  titleInput.placeholder = 'Project Title';
  titleInput.value = project.projectname || '';

  const descInput = document.createElement('input');
  descInput.type = 'text';
  descInput.className = 'project_description';
  descInput.placeholder = 'Project Description';
  descInput.value = project.project_description || '';

  // Technologies container
  const techContainer = document.createElement('div');
  techContainer.className = 'technologyused-container';

  const techLabel = document.createElement('label');
  techLabel.textContent = 'Technologies Used:';
  techContainer.appendChild(techLabel);

  const techList = document.createElement('div');
  techList.className = 'technology-list';

  if (project.technologyused && Array.isArray(project.technologyused)) {
    project.technologyused.forEach(tech => {
      techList.appendChild(createTechnologyInput(tech));
    });
  } else {
    techList.appendChild(createTechnologyInput());
  }
  techContainer.appendChild(techList);

  const addTechBtn = document.createElement('button');
  addTechBtn.type = 'button';
  addTechBtn.className = 'add-technology-btn';
  addTechBtn.textContent = 'Add Technology';
  techContainer.appendChild(addTechBtn);

  // Images container
  const imgContainer = document.createElement('div');
  imgContainer.className = 'projectimages-container';

  const imgLabel = document.createElement('label');
  imgLabel.textContent = 'Project Images:';
  imgContainer.appendChild(imgLabel);

  const imgList = document.createElement('div');
  imgList.className = 'image-list';

  if (project.projectimages && Array.isArray(project.projectimages)) {
    project.projectimages.forEach(() => {
      imgList.appendChild(createImageInput());
    });
  } else {
    imgList.appendChild(createImageInput());
  }
  imgContainer.appendChild(imgList);

  const addImgBtn = document.createElement('button');
  addImgBtn.type = 'button';
  addImgBtn.className = 'add-image-btn';
  addImgBtn.textContent = 'Add Image';
  imgContainer.appendChild(addImgBtn);

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.className = 'projectzip';
  fileInput.accept = '.zip';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove Project';
  removeBtn.addEventListener('click', () => div.remove());

  div.appendChild(titleInput);
  div.appendChild(descInput);
  div.appendChild(techContainer);
  div.appendChild(imgContainer);
  div.appendChild(fileInput);
  div.appendChild(removeBtn);

  return div;
}

function createWorkExperienceEntry(work) {
  const div = document.createElement('div');
  div.className = 'workexperience-entry';

  const companyInput = document.createElement('input');
  companyInput.type = 'text';
  companyInput.className = 'company_name';
  companyInput.placeholder = 'Company Name';
  companyInput.value = work.company_name || '';

  const roleInput = document.createElement('input');
  roleInput.type = 'text';
  roleInput.className = 'role';
  roleInput.placeholder = 'Role';
  roleInput.value = work.role || '';

  const startYearInput = document.createElement('input');
  startYearInput.type = 'text';
  startYearInput.className = 'start_year';
  startYearInput.placeholder = 'Start Year';
  startYearInput.value = work.start_year || '';

  const endYearInput = document.createElement('input');
  endYearInput.type = 'text';
  endYearInput.className = 'end_year';
  endYearInput.placeholder = 'End Year';
  endYearInput.value = work.end_year || '';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove Work Experience';
  removeBtn.addEventListener('click', () => div.remove());

  div.appendChild(companyInput);
  div.appendChild(roleInput);
  div.appendChild(startYearInput);
  div.appendChild(endYearInput);
  div.appendChild(removeBtn);

  return div;
}

function createEducationEntry(education) {
  const div = document.createElement('div');
  div.className = 'education-entry';

  const instituteInput = document.createElement('input');
  instituteInput.type = 'text';
  instituteInput.className = 'institute';
  instituteInput.placeholder = 'Institute';
  instituteInput.value = education.institute || '';

  const courseInput = document.createElement('input');
  courseInput.type = 'text';
  courseInput.className = 'course';
  courseInput.placeholder = 'Course';
  courseInput.value = education.course || '';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove Education';
  removeBtn.addEventListener('click', () => div.remove());

  div.appendChild(instituteInput);
  div.appendChild(courseInput);
  div.appendChild(removeBtn);

  return div;
}

function createTestimonialEntry(testimonial) {
  const div = document.createElement('div');
  div.className = 'testimonial-entry';

  const madeByInput = document.createElement('input');
  madeByInput.type = 'text';
  madeByInput.className = 'made_by';
  madeByInput.placeholder = 'Made By';
  madeByInput.value = testimonial.made_by || '';

  const statementInput = document.createElement('input');
  statementInput.type = 'text';
  statementInput.className = 'statement';
  statementInput.placeholder = 'Statement';
  statementInput.value = testimonial.statement || '';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove Testimonial';
  removeBtn.addEventListener('click', () => div.remove());

  div.appendChild(madeByInput);
  div.appendChild(statementInput);
  div.appendChild(removeBtn);

  return div;
}

function createCertificationEntry(certification) {
  const div = document.createElement('div');
  div.className = 'certification-entry';

  const certInput = document.createElement('input');
  certInput.type = 'text';
  certInput.className = 'certification';
  certInput.placeholder = 'Certification';
  certInput.value = certification || '';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove Certification';
  removeBtn.addEventListener('click', () => div.remove());

  div.appendChild(certInput);
  div.appendChild(removeBtn);

  return div;
}

function createAccomplishmentEntry(accomplishment) {
  const div = document.createElement('div');
  div.className = 'accomplishment-entry';

  const accInput = document.createElement('input');
  accInput.type = 'text';
  accInput.className = 'accomplishment';
  accInput.placeholder = 'Accomplishment';
  accInput.value = accomplishment || '';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove Accomplishment';
  removeBtn.addEventListener('click', () => div.remove());

  div.appendChild(accInput);
  div.appendChild(removeBtn);

  return div;
}

function loadUserData(email) {
  fetch(`get_profile.php?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }

      document.getElementById('user-email').textContent = data.email || '';
      document.getElementById('user-phone').value = data.contact?.phone || '';
      document.getElementById('user-whatsapp').value = data.contact?.whatsapp || '';
      document.getElementById('user-address').value = data.address || '';
      document.getElementById('aboutme-textarea').value = data.aboutme || '';

      // Set profile photo if available
      const profilePhotoImg = document.getElementById('profile-photo-img');
      if (data.photo && data.photo.trim() !== '') {
        profilePhotoImg.src = data.photo;
        profilePhotoImg.style.display = 'block';
      } else {
        profilePhotoImg.src = '';
        profilePhotoImg.style.display = 'none';
      }

      // Load skills
      const skillsList = document.getElementById('skills-list');
      skillsList.innerHTML = '';
      if (Array.isArray(data.skills)) {
        data.skills.forEach(skill => {
          const li = document.createElement('li');
      if (typeof skill === 'object' && skill.name && skill.proficiencylevel) {
        li.textContent = '';
        const nameSpan = document.createElement('span');
        nameSpan.className = 'skill-name';
        nameSpan.textContent = skill.name;
        const levelSpan = document.createElement('span');
        levelSpan.className = 'skill-level';
        levelSpan.textContent = skill.proficiencylevel;
        li.appendChild(nameSpan);
        li.appendChild(document.createTextNode(' ('));
        li.appendChild(levelSpan);
        li.appendChild(document.createTextNode(')'));
      } else {
        li.textContent = skill;
      }
          skillsList.appendChild(li);
        });
      }

      // Load projects
      const newProjectsContainer = document.getElementById('new-projects-container');
      newProjectsContainer.innerHTML = '';
      if (Array.isArray(data.projects)) {
        data.projects.forEach(project => {
          newProjectsContainer.appendChild(createProjectEntry(project));
        });
      }

      // Load education
      const newEducationContainer = document.getElementById('new-education-container');
      newEducationContainer.innerHTML = '';
      if (Array.isArray(data.education_qualification)) {
        data.education_qualification.forEach(education => {
          newEducationContainer.appendChild(createEducationEntry(education));
        });
      }

      // Load work experiences
      const newWorkexperienceContainer = document.getElementById('new-workexperience-container');
      newWorkexperienceContainer.innerHTML = '';
      if (Array.isArray(data.workexperiences)) {
        data.workexperiences.forEach(work => {
          newWorkexperienceContainer.appendChild(createWorkExperienceEntry(work));
        });
      }

      // Load testimonials
      const newTestimonialContainer = document.getElementById('new-testimonial-container');
      newTestimonialContainer.innerHTML = '';
      if (Array.isArray(data.testimonials)) {
        data.testimonials.forEach(testimonial => {
          newTestimonialContainer.appendChild(createTestimonialEntry(testimonial));
        });
      }

      // Load certifications
      const newCertificationContainer = document.getElementById('new-certification-container');
      newCertificationContainer.innerHTML = '';
      if (Array.isArray(data.certifications)) {
        data.certifications.forEach(certification => {
          newCertificationContainer.appendChild(createCertificationEntry(certification));
        });
      }

      // Load accomplishments
      const newAccomplishmentContainer = document.getElementById('new-accomplishment-container');
      newAccomplishmentContainer.innerHTML = '';
      if (Array.isArray(data.accomplishments)) {
        data.accomplishments.forEach(accomplishment => {
          newAccomplishmentContainer.appendChild(createAccomplishmentEntry(accomplishment));
        });
      }

      // Load social links
      document.getElementById('social-github').value = data.sociallinks?.Github || '';
      document.getElementById('social-linkdn').value = data.sociallinks?.linkdn || '';
    })
    .catch(error => {
      alert('Error loading user data.');
      console.error(error);
    });
}

function collectEntries(containerSelector, entryClass, fieldNames) {
  const container = document.querySelector(containerSelector);
  const entries = [];
  if (!container) return entries;
  container.querySelectorAll(`.${entryClass}`).forEach(entryDiv => {
    const entry = {};
    fieldNames.forEach(field => {
      const input = entryDiv.querySelector(`.${field}`);
      entry[field] = input ? input.value.trim() : '';
    });
    entries.push(entry);
  });
  return entries;
}

function saveProfile() {
  const email = getQueryParam('email');
  if (!email) {
    alert('No user email provided.');
    return;
  }

  const phone = document.getElementById('user-phone').value.trim();
  const whatsapp = document.getElementById('user-whatsapp').value.trim();
  const address = document.getElementById('user-address').value.trim();
  const aboutme = document.getElementById('aboutme-textarea').value.trim();

  // Collect skills
  const skillsList = document.getElementById('skills-list');
  const skills = [];
  skillsList.querySelectorAll('li').forEach(li => {
    const nameSpan = li.querySelector('.skill-name');
    const levelSpan = li.querySelector('.skill-level');
    if (nameSpan && levelSpan) {
      const name = nameSpan.textContent.trim();
      const proficiencylevel = levelSpan.textContent.trim();
      if (name !== '') {
        skills.push({ name, proficiencylevel });
      }
    }
  });

  // Collect projects
  const projects = [];
  document.querySelectorAll('#new-projects-container .project-entry').forEach(entryDiv => {
    const projectname = entryDiv.querySelector('.projectname')?.value.trim() || '';
    const project_description = entryDiv.querySelector('.project_description')?.value.trim() || '';

    // Collect technologies
    const technologyused = [];
    entryDiv.querySelectorAll('.technology-list .technology').forEach(techInput => {
      if (techInput.value.trim() !== '') {
        technologyused.push(techInput.value.trim());
      }
    });

    // Collect project images - files only, paths handled in backend
    const projectimages = [];
    entryDiv.querySelectorAll('.image-list .projectimage').forEach(imgInput => {
      if (imgInput.files.length > 0) {
        projectimages.push(imgInput.files[0]);
      }
    });

    projects.push({ projectname, project_description, technologyused, projectimages });
  });

  // Collect project zip files
  const projectZipFiles = [];
  document.querySelectorAll('#new-projects-container .project-entry').forEach((entryDiv, index) => {
    const fileInput = entryDiv.querySelector('.projectzip');
    if (fileInput && fileInput.files.length > 0) {
      projectZipFiles.push({ index, file: fileInput.files[0] });
    }
  });

  // Collect education
  const education_qualification = collectEntries('#new-education-container', 'education-entry', ['institute', 'course']);

  // Collect work experiences
  const workexperiences = collectEntries('#new-workexperience-container', 'workexperience-entry', ['company_name', 'role', 'start_year', 'end_year']);

  // Collect testimonials
  const testimonials = collectEntries('#new-testimonial-container', 'testimonial-entry', ['made_by', 'statement']);

  // Collect certifications
  const certifications = [];
  document.querySelectorAll('#new-certification-container .certification-entry').forEach(entryDiv => {
    const input = entryDiv.querySelector('.certification');
    if (input && input.value.trim() !== '') {
      certifications.push(input.value.trim());
    }
  });

  // Collect accomplishments
  const accomplishments = [];
  document.querySelectorAll('#new-accomplishment-container .accomplishment-entry').forEach(entryDiv => {
    const input = entryDiv.querySelector('.accomplishment');
    if (input && input.value.trim() !== '') {
      accomplishments.push(input.value.trim());
    }
  });

  // Collect social links
  const github = document.getElementById('social-github').value.trim();
  const linkdn = document.getElementById('social-linkdn').value.trim();

  // Collect photo file
  const photoInput = document.getElementById('photo-input');
  let photoFile = null;
  if (photoInput && photoInput.files.length > 0) {
    photoFile = photoInput.files[0];
  }

  const formData = new FormData();
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('whatsapp', whatsapp);
  formData.append('address', address);
  formData.append('aboutme', aboutme);
  formData.append('skills', JSON.stringify(skills));
  formData.append('projects', JSON.stringify(projects));
  formData.append('education_qualification', JSON.stringify(education_qualification));
  formData.append('workexperiences', JSON.stringify(workexperiences));
  formData.append('testimonials', JSON.stringify(testimonials));
  formData.append('certifications', JSON.stringify(certifications));
  formData.append('accomplishments', JSON.stringify(accomplishments));
  formData.append('sociallinks', JSON.stringify({ Github: github, linkdn: linkdn }));

  // Append project zip files with keys projectzip0, projectzip1, ...
  projectZipFiles.forEach(({ index, file }) => {
    formData.append(`projectzip${index}`, file);
  });

  // Append project images with keys projectimage0_0, projectimage0_1, projectimage1_0, etc.
  projects.forEach((project, pIndex) => {
    const entryDiv = document.querySelectorAll('#new-projects-container .project-entry')[pIndex];
    if (!entryDiv) return;
    const imageInputs = entryDiv.querySelectorAll('.image-list .projectimage');
    imageInputs.forEach((imgInput, iIndex) => {
      if (imgInput.files.length > 0) {
        formData.append(`projectimage${pIndex}_${iIndex}`, imgInput.files[0]);
      }
    });
  });

  // Append photo file
  if (photoFile) {
    formData.append('photo', photoFile);
  }

  fetch('update_profile.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      const saveMsg = document.getElementById('save-msg');
      saveMsg.textContent = data;
      // Refresh profile data after save to update skills list and others
      const email = getQueryParam('email');
      if (email) {
        loadUserData(email);
      }
    })
    .catch(error => {
      alert('Error saving profile.');
      console.error(error);
    });
}

window.onload = function() {
  document.getElementById('add-skill-btn').addEventListener('click', () => {
    const skillNameInput = document.getElementById('new-skill-name');
    const skillLevelInput = document.getElementById('new-skill-level');
    const skillName = skillNameInput.value.trim();
    const skillLevel = skillLevelInput.value.trim();
    if (skillName !== '' && skillLevel !== '') {
      const skillsList = document.getElementById('skills-list');
      const li = document.createElement('li');

      // Create span for skill name
      const nameSpan = document.createElement('span');
      nameSpan.className = 'skill-name';
      nameSpan.textContent = skillName;

      // Create span for skill level
      const levelSpan = document.createElement('span');
      levelSpan.className = 'skill-level';
      levelSpan.textContent = skillLevel;

      li.appendChild(nameSpan);
      li.appendChild(document.createTextNode(' ('));
      li.appendChild(levelSpan);
      li.appendChild(document.createTextNode(')'));

      // Add remove button for skill
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.textContent = 'Remove';
      removeBtn.style.marginLeft = '10px';
      removeBtn.addEventListener('click', () => {
        li.remove();
      });
      li.appendChild(removeBtn);

      skillsList.appendChild(li);
      skillNameInput.value = '';
      skillLevelInput.value = '';
    }
  });

  document.getElementById('add-project-btn').addEventListener('click', () => {
    const container = document.getElementById('new-projects-container');
    container.appendChild(createProjectEntry({}));
  });

  document.getElementById('add-workexperience-btn').addEventListener('click', () => {
    const container = document.getElementById('new-workexperience-container');
    container.appendChild(createWorkExperienceEntry({}));
  });

  document.getElementById('add-education-btn').addEventListener('click', () => {
    const container = document.getElementById('new-education-container');
    container.appendChild(createEducationEntry({}));
  });

  document.getElementById('add-testimonial-btn').addEventListener('click', () => {
    const container = document.getElementById('new-testimonial-container');
    container.appendChild(createTestimonialEntry({}));
  });

  document.getElementById('add-certification-btn').addEventListener('click', () => {
    const container = document.getElementById('new-certification-container');
    container.appendChild(createCertificationEntry(''));
  });

  document.getElementById('add-accomplishment-btn').addEventListener('click', () => {
    const container = document.getElementById('new-accomplishment-container');
    container.appendChild(createAccomplishmentEntry(''));
  });

  // Delegate event listeners for dynamically added technology and image add buttons
  document.getElementById('new-projects-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('add-technology-btn')) {
      const techContainer = event.target.parentElement;
      if (techContainer) {
        const techList = techContainer.querySelector('.technology-list');
        if (techList) {
          const input = createTechnologyInput();
          techList.appendChild(input);
        }
      }
    } else if (event.target.classList.contains('add-image-btn')) {
      const imgContainer = event.target.parentElement;
      if (imgContainer) {
        const imgList = imgContainer.querySelector('.image-list');
        if (imgList) {
          const input = createImageInput();
          imgList.appendChild(input);
        }
      }
    } else if (event.target.classList.contains('remove-project-btn')) {
      const projectEntry = event.target.closest('.project-entry');
      if (projectEntry) {
        projectEntry.remove();
      }
    }
  });

  document.getElementById('save-profile-btn').addEventListener('click', saveProfile);

  const email = getQueryParam('email');
  if (!email) {
    alert('No user email provided.');
    return;
  }
  loadUserData(email);
};
