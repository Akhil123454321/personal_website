const COMMANDS = [
  {
    command: "about",
    description: "About Me",
  },
  {
    command: "experience",
    description: "My Work Experience",
    flags: [
      {
        flag: "--internships",
        description: "My internships and work experience",
      },
      {
        flag: "--research",
        description: "My research experience",
      },
      {
        flag: "--teaching",
        description: "My teaching experience",
      },
      {
        flag: "--achievements",
        description: "My achievements and awards",
      }
    ]
  },
  {
    command: "education",
    description: "My Education",
  },
  {
    command: "skills",
    description: "My Tech Skills",
    flags: [
      {
        flag: "--languages",
        description: "Programming languages I know",
      },
      {
        flag: "--frameworks",
        description: "Frameworks and libraries I use",
      },
      {
        flag: "--certifications",
        description: "Relevant certifications I've earned",
      },
    ],
  },
  {
    command: "projects",
    description: "My Tech Projects",
  },
  {
    command: "resume",
    description: "My Resume",
  },
  {
    command: "contact",
    description: "Contact Me",
  },
  {
    command: "clear",
    description: "Clear terminal",
  },
];

const getProjects = async () => {
  const projects = await (await fetch("/api/projects")).json();
  const projectHTML =
    `<h3>My Projects (You can scroll)</h3>` +
    projects
      .map(
        (project) => `<div class="command">
        <a href="${project.link}" target="_blank"><b class="command">${
          project.name
        }</b></a> - <b>${project.stack.join(", ")}</b>
        <p class="meaning">${project.description}</p>
      </div>`
      )
      .join("");
  return projectHTML;
};

const getContacts = async () => {
  const contactMediums = await (await fetch("/api/contacts")).json();
  return contactMediums
    .map(
      (contact) => `<div style="display: flex; justify-content: space-between;">
      <p style="font-size: 15px">${contact.medium}</p>
      <a class="meaning" href="${contact.link}" target="_blank">${contact.username}</a>
    </div>`
    )
    .join("");
};

export const CONTENTS = {
  // function to execute the help command
  help: () =>
    COMMANDS.map(
      (command) => `<div style="display: flex; justify-content: space-between;">
        <p style="font-size: 15px">${command.command}</p>
        <p>${command.description}</p>
      </div>`
    ).join("") +
    `<br />
      <div class="command">Type one of the above to view. For eg. <span style="color: var(--secondary)">about</span></div>`,
  
  // function to execute the experience command
  about: () => `My name is Akhil. I am a ${getAge(
    "December 8, 2003"
  )} year old aspiring machine learning engineer and full-stack developer. I am currently based in the United States studying in Purdue University, Indiana, majoring in Computer Science - Machine Intelligence and Applied Statistics. 
    <br/><br/>
    I love coding in Python, C and JavaScript and have worked with frameworks and libraries like TensorFlow, PyTorch, scikit-learn, NodeJS, ExpressJS, and Django. I currently use NextJS, Laravel, and NodeJS in a lot of my projects, and leverage machine learning tools such as TensorFlow and PyTorch for ML engineering tasks.
  `,

  //function to execute the experience command
  experience: () => {
    const experienceFlags = COMMANDS.find(cmd => cmd.command === "experience");
    return experienceFlags.flags
      .map(
        (flag) => `<div class="command">
        <b class="command">${flag.flag}</b> - ${flag.description}
      </div>`
      )
      .join("") +
      `<br />
      <div class="command">Type one of the above to view. For eg. <span style="color: var(--secondary)">experience --internships</span></div>`;
  },

  // function to execute the experience command with flags
  "experience --internships": () => `
  <div><b>CGI</b>: HTML, CSS, Node.js and PHP<br /></div>
  <div><b>frameworks</b>: React, NextJS, Django, Express and Laravel<br /></div>
  <div><b>database</b>: MongoDB, PostgreSQL, MySQL, and SQLite<br /></div>
  `,
  "experience --research": () => ``,
  "experience --teaching": () => ``,
  "experience --achievements": () => ``,

  // function to execute the education command
  education: () => `I am a high school graduate from <a href="https://dpsrkp.net" target="_blank">Delhi Public School, R.K. Puram</a> and a freshman at <a href="https://uwaterloo.ca/content/home" target="_blank">University of Waterloo</a>.`,
  skills: () => `
  I am experienced with Javascript, Typescript and Python and the web technologies dominating at the time:<br />
  <div class="skill"><b>core</b>: HTML, CSS, Node.js and PHP<br /></div>
  <div class="skill"><b>frameworks</b>: React, NextJS, Django, Express and Laravel<br /></div>
  <div class="skill"><b>database</b>: MongoDB, PostgreSQL, MySQL, and SQLite<br /></div>
  I also have knowledge of basic shell scripting and my dotfiles can be found <a href="https://github.com/kavinvalli/.dotfiles" target="_blank">here</a>.
<br /><br />
  I also have experience with Mobile Development with Flutter.
  `,
  projects: getProjects,
  contact: getContacts,
  resume: () => {
    window.open("https://kavin.me/resume.pdf", "_blank");
    return "";
  },
  error: (input) =>
    `<div class="help-command">sh: Unknown command: ${input}</div><div class="help-command">See \`help\` for info`,
  blog: () => {
    window.open("https://livecode247.com", "_blank");
    return "";
  },
  youtube: () => {
    window.open("https://youtube.com/@livecode247", "_blank");
    return "";
  },
};

function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  return age;
}
