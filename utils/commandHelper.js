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
        flag: "--leadership",
        description: "My leadership experience",
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
    command: "contact --email",
    description: "Send me an email",
  },
  {
    command: "clear",
    description: "Clear terminal",
  },
];

// HELPER FUNCTION: gets projects
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
      </div>
      <br />`
      )
      .join("");
  return projectHTML;
};

// HELPER FUNCTION: gets contact mediums
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


// THIS IS THE MAIN FUNCTION THAT EXECUTES ALL THE COMMANDS
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
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <p style="font-size: 15px; font-weight: bold; margin: 0;">Crowe: Data Intelligence Intern</p>
          <p style="margin: 0; font-size: 14px; color: #aaa;">June 2025 - Present</p>
        </div>
        <p style="margin-top: 6px; font-size: 14px;"></p>
      </div>

      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <p style="font-size: 15px; font-weight: bold; margin: 0;">CGI: Software Engineering & DevOps Intern</p>
          <p style="margin: 0; font-size: 14px; color: #aaa;">June 2024 – August 2024</p>
        </div>
        <p style="margin-top: 6px; font-size: 14px; text-align: justify;">
          I developed new features for an internal forecasting and monitoring tool at NiSource using .NET (C#), React, and MySQL. I collaborated with engineers to implement performance optimizations and apply critical patch fixes. Additionally, I designed AI solutions including a chatbot and a time-series prediction model using Python and Azure AI Studio. These tools, built with services like AI Bot Service, Language Studio, and AutoML, were aimed at improving forecasting accuracy and time planning.
        </p>
      </div>
  `,
  "experience --research": () => `
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <p style="font-size: 15px; font-weight: bold; margin: 0;">NLP Research</p>
          <p style="margin: 0; font-size: 14px; color: #aaa;">May 2025 - Present</p>
        </div>
        <p style="margin-top: 6px; font-size: 14px;">Working with Professor Abulhair Saparov on a clinical AI research project aimed at automating triage recommendations for HIV patients using large language models (LLMs). As part of this effort, I am benchmarking models such as LLaMA 3.3 and DeepSeek R1 on real clinical data to evaluate their accuracy and alignment with expert reasoning. I am also developing infrastructure for model safety, including human-in-the-loop correction pipelines. The project focuses on optimizing sensitivity to ensure scalable and reliable decision support in under-resourced healthcare settings.</p>
      </div>

      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <p style="font-size: 15px; font-weight: bold; margin: 0;">CAST VIP Team</p>
          <p style="margin: 0; font-size: 14px; color: #aaa;">January 2024 – December 2024</p>
        </div>
        <p style="margin-top: 6px; font-size: 14px; text-align: justify;">
          Worked in Dr. David Purpura's CAST VIP team, focussing on an efficient means of transcribing child-speech using state of the art machine learning methods including a GNN-FRU, conformer model, transformer model etc. I was responsible for developing and integrating a new pipeline focussed on an RNN-T (RNN Transducer) model for transcribing child speech. Furthermore, I was in charge of developing metrics for data visualization and analysis of the transcribed data, and custom evaluation metrics for the model performance.
        </p>
      </div>

      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <p style="font-size: 15px; font-weight: bold; margin: 0;">Student Researcher</p>
          <p style="margin: 0; font-size: 14px; color: #aaa;">January 2024 – December 2024</p>
        </div>
        <p style="margin-top: 6px; font-size: 14px; text-align: justify;">
          Worked with PhD students in Dr. Aniket Bera's IDEAS lab that explored unique uses of generative AI - especially diffusion models. I was responsible for developing a bench mark diffusion algorithm for image generation, that aided in further developing an efficient diffusion model for multi-agent path planning. I also helped in data collection and analysis and hyperparemeter tuning of a diffusion model that helps generate dance sequences from lead videos and textual prompts specifying dance styles and steps.
        </p>
      </div>
  `,
  "experience --leadership": () => `
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <p style="font-size: 15px; font-weight: bold; margin: 0;">Resident Assistant</p>
          <p style="margin: 0; font-size: 14px; color: #aaa;">August 2024 – Present</p>
        </div>
        <p style="margin-top: 6px; font-size: 14px; text-align: justify;">
          As a resident assistant of Purdue's Cary Quadrangle dorm, I managed a shared annual budget of $96,000 to coordinate events focused on diversity, mental health, financial wellness, and career development. I built strong personal relationships and conducted quarterly check-ins to support a diverse community of over 50 students from 20+ states and 5 countries. I also served as an on-call resource, responding to concerns raised by residents, colleagues, or supervisors to maintain a safe and supportive living environment.
        </p>
      </div>

      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <p style="font-size: 15px; font-weight: bold; margin: 0;">Teaching Assistant</p>
          <p style="margin: 0; font-size: 14px; color: #aaa;">January 2024 – Present</p>
        </div>
        <p style="margin-top: 6px; font-size: 14px; text-align: justify;">
          I supported over 800 students by leading weekly lab sessions and office hours, helping them understand course concepts, resolve project-related questions, and follow proper coding standards. I actively engaged with students on the EdStem communication portal by providing timely responses and maintaining clear communication around project deadlines. Additionally, I contributed to course development by assisting with quiz logistics, grading, and helping create and test all student assignments. 

          <br>

          Courses I have been a TA for include:
          <ul>
            <li>CS 177: Programming with multimedia objects</li>
            <li>CS 180: Problem solving and object-oriented programming</li>
            <li>CS 240: Programming in C</li>
            <li>CS 252: Systems Programming</li>
          </ul>
        </p>
      </div>

      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <p style="font-size: 15px; font-weight: bold; margin: 0;">Python Instructor</p>
          <p style="margin: 0; font-size: 14px; color: #aaa;">March 2024 – Present</p>
        </div>
        <p style="margin-top: 6px; font-size: 14px; text-align: justify;">
          Worked with Wonderland Education Inc. as a Python instructor, where I instructed 5th grade students in both fundamental and advanced Python programming concepts. I developed and delivered engaging curriculum modules tailored to their skill levels and interests, creating a supportive and interactive learning environment. I also provided personalized guidance and feedback to nurture their creativity and strengthen their problem-solving skills.
        </p>
      </div>
  `,

  // function to execute the education command
  education: () => `
    <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <p style="font-size: 15px; font-weight: bold; margin: 0;">MS CS - Purdue University</p>
          <p style="margin: 0; font-size: 14px; color: #aaa;">Jan 2024 – Dec 2026</p>
        </div>
        <p style="margin-top: 6px; font-size: 14px; text-align: justify;">
          Relevant Coursework:
          <ul>
            <li>CS 57100: Artificial Intelligence</li>
            <li>CS 57700: Natural Language Processing</li>
            <li>CS 57800: Statistical Machine Learning</li>
            <li>CS 59200-MLS: Machine Learning Systems</li>
            <li>CS 59300-CVD: Computer Vision with Deep Learning</li>
        </p>
      </div>

      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <p style="font-size: 15px; font-weight: bold; margin: 0;">BS CS, Applied Statistics - Purdue University</p>
          <p style="margin: 0; font-size: 14px; color: #aaa;">Aug 2022 - Dec 2025</p>
        </div>
        <p style="margin-top: 6px; font-size: 14px; text-align: justify;">
          Minor in Mathematics<br />
          GPA: 3.8/4.0<br />
          Dean's List: Fall 2022, Spring 2023, Fall 2023, Spring 2024, Fall 2024, Sprign 2025<br />
          Relevant Coursework:
          <ul>
            <li>CS 37300: Data Mining and Machine Learning</li>
            <li>CS 44000: Large Scale Data Analytics</li>
            <li>CS 38100: Introduction to Analysis of Algorithms</li>
            <li>CS 25100: Data Structures and Algorithms</li>
            <li>STAT 51200: Applied Regression Analysis</li>
            <li>STAT 42000: Introduction to Time Series Analysis</li>
          
          <br>
          Activities and societies: Boiler Blockchain, ML@Purdue, Purdue Hackers, ICMAPActivities and societies: Boiler Blockchain, ML@Purdue, Purdue Hackers, ICMAP

        </p>
      </div>
  `,

  //function to execute the skills command
   skills: () => {
    const skillFlags = COMMANDS.find(cmd => cmd.command === "skills");
    return skillFlags.flags
      .map(
        (flag) => `<div class="command">
        <b class="command">${flag.flag}</b> - ${flag.description}
      </div>`
      )
      .join("") +
      `<br />
      <div class="command">Type one of the above to view. For eg. <span style="color: var(--secondary)">skills --frameworks</span></div>`;
  },

  "skills --languages": () => `
    <div class="command">
      <b class="command">Python</b> - Proficient in Python, with experience in libraries like NumPy, Pandas, and Matplotlib for data analysis and visualization.
    </div>
    <div class="command">
      <b class="command">C</b> - Strong understanding of C programming, with experience in systems programming and low-level development.
    </div>
    <div class="command">
      <b class="command">JavaScript</b> - Proficient in JavaScript, with experience in both front-end and back-end development using frameworks like React and Node.js.
    </div>
    <div class="command">
      <b class="command">Java</b> - Experienced in Java programming, with a focus on object-oriented design and development.
    </div>
    <div class="command">
      <b class="command">SQL</b> - Proficient in SQL for database management and data manipulation.
    </div>
    <div class="command">
      <b class="command">HTML/CSS</b> - Skilled in HTML and CSS for web development, with a focus on responsive design.
    </div>
    <div class="command">
      <b class="command">Bash</b> - Experienced in using Bash for scripting and automation tasks.
    </div>
  `,
  "skills --frameworks": () => `
    <div class="command">
      <b class="command">TensorFlow</b> - Proficient in TensorFlow for building and deploying machine learning models.
    </div>
    <div class="command">
      <b class="command">PyTorch</b> - Experienced in PyTorch for deep learning and neural network development.
    </div>
    <div class="command">
      <b class="command">React</b> - Skilled in React for building dynamic and responsive user interfaces.
    </div>
    <div class="command">
      <b class="command">Node.js</b> - Proficient in Node.js for server-side development and building RESTful APIs.
    </div>
    <div class="command">
      <b class="command">Express.js</b> - Experienced in using Express.js for building web applications and APIs.
    </div>
    <div class="command">
      <b class="command">Django</b> - Skilled in Django for building robust web applications with Python.
    </div>
  `,
  "skills --certifications": () => `
    <div class="command">
      <b class="command">Google: Introduction to geneartive AI
    </div>
    <div class="command">
      <b class="command">Microsoft Certified: Azure AI Engineer Associate
    </div>
    <div class="command">
      <b class="command">FutureSchool.AI: Visual Intelligence and Deep Learning
    </div>
    <div class="command">
      <b class="command">Indus Startup You: Applications of Design Thinking and Entrepreneurship 
    </div>
  `,

  // calling the functions to get the projects and contacts
  projects: getProjects,
  //contact: getContacts,

  // function to render the pdf resume
  resume: () => {
    window.open("resume.pdf", "_blank");
    return "";
  },

  //function to render error message for unknown commands
  error: (input) =>
    `<div class="help-command">sh: Unknown command: ${input}</div><div class="help-command">See \`help\` for info`,

  // function to send an email
  "contact": async (rawCommand) => {
    if (!rawCommand.includes("--email")) {
      return getContacts(); // fallback to static contact info
    }

    // Match the flags and the message
    const match = rawCommand.match(/^contact\s+--email\s+(.*?)>>\s*"(.*)"$/);
    if (!match) {
      return `⚠️ Usage: contact --email --name="Your Name" --from="email@example.com" >> "Your message here"`;
    }

    const flags = match[1];
    const message = match[2];

    const nameMatch = flags.match(/--name="([^"]+)"/);
    const emailMatch = flags.match(/--from="([^"]+)"/);

    const name = nameMatch?.[1] || "";
    const from = emailMatch?.[1] || "";

    if (!name || !from || !message) {
      return "⚠️ Please provide all fields: name, email, and message.";
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, from, message }),
      });

      if (res.ok) {
        return "📬 Your message was sent successfully!";
      } else {
        const error = await res.json();
        return `❌ Failed to send: ${error.error || "Unknown error"}`;
      }
    } catch (err) {
      console.error("Request error:", err);
      return "❌ Error sending your message. Try again later.";
    }
  }
};


// HELPER FUNCTIONS: function to calculate age from date string
function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  return age;
}
