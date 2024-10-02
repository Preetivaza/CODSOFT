// Array to store projects
let projects = [];

// Get elements from the DOM
const projectForm = document.getElementById('project-form');
const projectsList = document.getElementById('projects-list');

// Event listener for project form submission
projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get project name and description from form inputs
  const projectName = document.getElementById('project-name').value;
  const projectDescription = document.getElementById('project-description').value;

  // Create a new project object
  const newProject = {
    id: Date.now(),  // Unique ID based on timestamp
    name: projectName,
    description: projectDescription,
    tasks: [],
  };

  // Add new project to the projects array
  projects.push(newProject);

  // Update the projects display
  displayProjects();

  // Clear form inputs
  projectForm.reset();
});

// Function to display all projects
function displayProjects() {
  projectsList.innerHTML = '';

  projects.forEach((project) => {
    const projectItem = document.createElement('li');
    projectItem.classList.add('project-item');
    
    // Project HTML structure
    projectItem.innerHTML = `
      <div>
        <h3>${project.name}</h3>
        <p>${project.description}</p>
      </div>
      <button onclick="deleteProject(${project.id})">Delete</button>
    `;

    // Add the project item to the list
    projectsList.appendChild(projectItem);
  });
}

// Function to delete a project
function deleteProject(id) {
  projects = projects.filter((project) => project.id !== id);
  displayProjects();
}
