document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const searchKeyInput = document.getElementById("search-key");
  const resultDiv = document.getElementById("result");
  const loadMoreBtn = document.getElementById("load-more-btn");

  let allProfiles = [];
  let displayedCount = 0;
  const batchSize = 5;

  function renderProfile(user, index) {
    let html = "";
    if (user.photo) {
      html += `<img src="../${user.photo}" alt="Profile Picture" class="profile-pic" />`;
    }
    html += `<div><strong>Username:</strong> ${user.username}</div>`;
    html += `<div><strong>Profile Link:</strong> ${user.link}</div>`;
    html += `<div><strong>Phone:</strong> ${user.contact?.phone || "N/A"}</div>`;
    html += `<div><strong>Whatsapp:</strong> ${user.contact?.whatsapp || "N/A"}</div>`;
    html += `<div><strong>Address:</strong> ${user.address || "N/A"}</div>`;
    html += `<div><strong>About Me:</strong> ${user.aboutme || "N/A"}</div>`;

    // Skills with bootstrap styled progress bars instead of barlogo images
    if (Array.isArray(user.skills) && user.skills.length > 0) {
      html += `<div class="skills-container"><strong>Skills:</strong>`;
      user.skills.forEach(skill => {
        const profLevel = parseInt(skill.proficiencylevel) || 0;
        let progressClass = 'bg-danger'; // default red for low proficiency
        if (profLevel >= 91) progressClass = 'bg-success'; // expert
        else if (profLevel >= 76) progressClass = 'bg-info'; // advanced
        else if (profLevel >= 51) progressClass = 'bg-warning'; // intermediate
        else if (profLevel >= 0) progressClass = 'bg-danger'; // beginner

        html += `<div class="skill-item">`;
        html += `<div class="skill-header">`;
        html += `<span class="skill-name">${skill.name}</span>`;
        html += `<span class="skill-percentage">${profLevel}%</span>`;
        html += `</div>`;
        html += `<div class="progress">`;
        // Set initial width to 0% for animation
        html += `<div class="progress-bar ${progressClass}" role="progressbar" style="width: 0%;" aria-valuenow="${profLevel}" aria-valuemin="0" aria-valuemax="100"></div>`;
        html += `</div>`;
        html += `</div>`;
      });
      html += `</div>`;
    } else {
      html += `<div><strong>Skills:</strong> N/A</div>`;
    }

    // Projects with Bootstrap carousel
    if (Array.isArray(user.projects) && user.projects.length > 0) {
      html += `<div><strong>Projects:</strong>`;
      user.projects.forEach((project, pIndex) => {
        const carouselId = `carousel${index}_${pIndex}`;
        html += `<div class="project-entry">`;
        html += `<div><strong>Project Name:</strong> ${project.projectname || "N/A"}</div>`;
        html += `<div><strong>Description:</strong> ${project.project_description || "N/A"}</div>`;

        // Technologies
        if (Array.isArray(project.technologyused) && project.technologyused.length > 0) {
          html += `<div><strong>Technologies Used:</strong><ul class="technology-list">`;
          project.technologyused.forEach(tech => {
            html += `<li>${tech}</li>`;
          });
          html += `</ul></div>`;
        }

        // Bootstrap Carousel for project images
        if (Array.isArray(project.projectimages) && project.projectimages.length > 0) {
          html += `
          <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
          `;
          project.projectimages.forEach((imgSrc, i) => {
            html += `
              <div class="carousel-item${i === 0 ? ' active' : ''}">
                <img src="../${imgSrc}" class="d-block w-100" alt="Project Image ${i + 1}">
              </div>
            `;
          });
          html += `
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          `;
        }

        if (project.projectzip && project.projectzip.trim() !== '') {
          html += `<div><a href="../${project.projectzip}" download>Download Project Zip</a></div>`;
        }
        html += `</div>`;
      });
      html += `</div>`;
    } else {
      html += `<div><strong>Projects:</strong> N/A</div>`;
    }

    // Education
    if (Array.isArray(user.education_qualification) && user.education_qualification.length > 0) {
      html += `<div><strong>Education:</strong>`;
      user.education_qualification.forEach(edu => {
        html += `<div class="education-entry">`;
        html += `<div><strong>Institute:</strong> ${edu.institute || "N/A"}</div>`;
        html += `<div><strong>Course:</strong> ${edu.course || "N/A"}</div>`;
        html += `</div>`;
      });
      html += `</div>`;
    } else {
      html += `<div><strong>Education:</strong> N/A</div>`;
    }

    // Work Experiences
    if (Array.isArray(user.workexperiences) && user.workexperiences.length > 0) {
      html += `<div><strong>Work Experiences:</strong>`;
      user.workexperiences.forEach(work => {
        html += `<div class="workexperience-entry">`;
        html += `<div><strong>Company Name:</strong> ${work.company_name || "N/A"}</div>`;
        html += `<div><strong>Role:</strong> ${work.role || "N/A"}</div>`;
        html += `<div><strong>Start Year:</strong> ${work.start_year || "N/A"}</div>`;
        html += `<div><strong>End Year:</strong> ${work.end_year || "N/A"}</div>`;
        html += `</div>`;
      });
      html += `</div>`;
    } else {
      html += `<div><strong>Work Experiences:</strong> N/A</div>`;
    }

    // Testimonials
    if (Array.isArray(user.testimonials) && user.testimonials.length > 0) {
      html += `<div><strong>Testimonials:</strong>`;
      user.testimonials.forEach(testimonial => {
        html += `<div class="testimonial-entry">`;
        html += `<div><strong>Made By:</strong> ${testimonial.made_by || "N/A"}</div>`;
        html += `<div><strong>Statement:</strong> ${testimonial.statement || "N/A"}</div>`;
        html += `</div>`;
      });
      html += `</div>`;
    } else {
      html += `<div><strong>Testimonials:</strong> N/A</div>`;
    }

    // Certifications
    if (Array.isArray(user.certifications) && user.certifications.length > 0) {
      html += `<div><strong>Certifications:</strong><ul>`;
      user.certifications.forEach(cert => {
        html += `<li>${cert}</li>`;
      });
      html += `</ul></div>`;
    } else {
      html += `<div><strong>Certifications:</strong> N/A</div>`;
    }

    // Accomplishments
    if (Array.isArray(user.accomplishments) && user.accomplishments.length > 0) {
      html += `<div><strong>Accomplishments:</strong><ul>`;
      user.accomplishments.forEach(acc => {
        html += `<li>${acc}</li>`;
      });
      html += `</ul></div>`;
    } else {
      html += `<div><strong>Accomplishments:</strong> N/A</div>`;
    }

    // Social Links
    html += `<div><strong>Social Links:</strong>`;
    html += `<div class="social-links-container">`;
    html += `<div class="social-link-entry"><strong>Github:</strong> ${user.sociallinks?.Github || "N/A"}</div>`;
    html += `<div class="social-link-entry"><strong>LinkedIn:</strong> ${user.sociallinks?.linkdn || "N/A"}</div>`;
    html += `</div>`;
    html += `</div>`;

    return html;
  }

  function displayProfiles(profiles) {
    const toDisplay = profiles.slice(displayedCount, displayedCount + batchSize);
    let html = "";
    toDisplay.forEach(user => {
      html += `<div class="profile-container">${renderProfile(user, displayedCount)}</div><hr/>`;
    });
    if (displayedCount === 0) {
      resultDiv.innerHTML = html;
    } else {
      resultDiv.innerHTML += html;
    }
    
    const newProfiles = resultDiv.querySelectorAll('.profile-container');
    const startIndex = displayedCount;
    const endIndex = displayedCount + toDisplay.length;
    for (let i = startIndex; i < endIndex; i++) {
      animateSkillBars(newProfiles[i]);
    }
    
    for (let i = startIndex; i < endIndex; i++) {
      const carousels = newProfiles[i].querySelectorAll('.carousel');
      carousels.forEach(carouselEl => {
        // eslint-disable-next-line no-undef
        new bootstrap.Carousel(carouselEl);
      });
    }
    displayedCount += toDisplay.length;

    if (displayedCount >= profiles.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }
  }

  function fetchAllProfiles() {
    fetch('search.php?key=')
      .then(response => response.json())
      .then(data => {
        if (data.success && Array.isArray(data.users)) {
          allProfiles = data.users;
          displayedCount = 0;
          displayProfiles(allProfiles);
          isSearchMode = false;
        } else {
          resultDiv.innerHTML = "<p>No profiles found.</p>";
          loadMoreBtn.style.display = "none";
        }
      })
      .catch(() => {
        resultDiv.innerHTML = "<p>Error fetching profiles.</p>";
        loadMoreBtn.style.display = "none";
      });
  }

  function fetchProfilesByKey(key) {
    fetch(`search.php?key=${encodeURIComponent(key)}`)
      .then(response => response.json())
      .then(data => {
        if (data.success && Array.isArray(data.users)) {
          allProfiles = data.users;
          displayedCount = allProfiles.length;
          isSearchMode = true;
          if (allProfiles.length > 0) {
            let html = "";
            allProfiles.forEach(user => {
              html += `<div class="profile-container">${renderProfile(user, displayedCount)}</div><hr/>`;
            });
            resultDiv.innerHTML = html;
            
            const profiles = resultDiv.querySelectorAll('.profile-container');
            profiles.forEach(profile => animateSkillBars(profile));
            
            profiles.forEach(profile => {
              const carousels = profile.querySelectorAll('.carousel');
              carousels.forEach(carouselEl => {
                
                new bootstrap.Carousel(carouselEl);
              });
            });
          } else {
            resultDiv.innerHTML = "<p>No profiles found matching the key.</p>";
          }
          loadMoreBtn.style.display = "none";
        } else {
          resultDiv.innerHTML = `<p>${data.message}</p>`;
          loadMoreBtn.style.display = "none";
        }
      })
      .catch(() => {
        resultDiv.innerHTML = "<p>Error fetching profile data.</p>";
        loadMoreBtn.style.display = "none";
      });
  }

  searchBtn.addEventListener("click", () => {
    const key = searchKeyInput.value.trim();
    if (!key) {
      resultDiv.innerHTML = "<p>Loading profiles...</p>";
      fetchAllProfiles();
    } else {
      resultDiv.innerHTML = "<p>Loading profiles...</p>";
      fetchProfilesByKey(key);
    }
  });

  loadMoreBtn.addEventListener("click", () => {
    displayProfiles(allProfiles);
  });

  // Initial load: fetch all profiles and show first batch
  resultDiv.innerHTML = "<p>Loading profiles...</p>";
  fetchAllProfiles();
});

function animateSkillBars(container) {
  const progressBars = container.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    const targetWidth = bar.getAttribute('aria-valuenow') + '%';
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 100);
  });
}
