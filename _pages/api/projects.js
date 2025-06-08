import Cors from "cors";
import runMiddleware from "../../utils/runMiddleware";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === "GET") {
    const projects = [
    {
      name: "NLP Linter",
      description:
        "Designing and implementing a Python-based NLP-powered linter to enforce coding standards in C programs for Purdue’s CS 240 course. Leveraging Tree-sitter for AST parsing, a custom BILEU tokenizer, and fine-tuning CodeBERT for analysis.",
      stack: ["Python", "RUST", "C"],
      link: "https://github.com/Akhil123454321/nlp_linter",
    },
    {
      name: "HireHack",
      description:
        "Developed a Chrome extension that provides real-time interview feedback using facial emotion recognition, speech, and lexical analysis. Integrated a feed-forward neural network to generate live improvement suggestions.",
      stack: ["JavaScript", "Python", "HTML", "CSS"],
      link: "https://github.com/Akhil123454321/hirehack_deploy",
    },
    {
      name: "Unilens",
      description:
        "Built a web application to assist users in college research, ogering personalized college lists, profile building, and essay refinement. Utilized ReactJS, NodeJS, GPT API, and MongoDB, incorporating a Weighted K-Means Clustering algorithm.",
      stack: ["NodeJS", "ReactJS", "MongoDB", "ExpressJS"],
    },
    {
      name: "Diabety Retinopathy Analyzer",
      description:
        "Created a CNN model with Keras and TensorFlow to predict retinopathy grade and macular edema risk from retinal scans, achieving 92% accuracy",
      stack: ["Python", "TensorFlow", "Keras"],
    },
  ];

    return res.json(projects);
  } else {
    return res.status(400).json({ message: "Only GET request allowed" });
  }
}
