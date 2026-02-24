export async function GET(request) {
  const projects = [
    {
      name: "Pixel DJ AI",
      description:
        "Built a full-stack AI DJ assistant that generates Spotify-ready sets from vibe prompts and seed tracks, visualizes transitions/reasoning in a Next.js interface, and continuously improves ranking through feedback-driven ML training with FastAPI + SQLite services.",
      stack: ["Python", "FastAPI", "Next.js", "TypeScript", "Spotify API", "SQLite"],
      link: "https://github.com/Akhil123454321/pixel_dj_ai",
    },
    {
      name: "Research OS",
      description:
        "Built a full-stack research assistant that curates personalized arXiv feeds and enables paper-grounded Q&A via a multi-agent RAG pipeline (Planner, Retriever, Extractor, Verifier, Synthesizer), with Postgres-backed highlights/notes, save-like-hide actions, and a Next.js UI on top of FastAPI services.",
      stack: ["Python", "Ollama", "CLI"],
      link: "https://github.com/Akhil123454321/research_os",
    },
    {
      name: "Agentic Ollama",
      description:
        "Built and published a Python-based agentic CLI for Ollama that runs local LLMs with autonomous tool-calling, iterative code debugging, goal planning, long-term memory, and saved conversations/personas, with automatic Ollama install/start support.",
      stack: ["Python", "Ollama", "CLI"],
      link: "https://github.com/Akhil123454321/ollama-cli",
    },
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

  return Response.json(projects, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
