# Shellfolio

A terminal-style personal portfolio website built with Next.js. Visitors interact with it like a real Unix shell — typing commands to navigate sections, using tab completion, browsing command history, and piping messages to send email.

## How it works

Type `help` to see available commands. Navigate using:

| Command | Description |
|---|---|
| `about` | About me |
| `experience` | Work experience (use flags below) |
| `experience --roles` | Full-time positions |
| `experience --internships` | Internships |
| `experience --research` | Research positions |
| `experience --leadership` | Leadership & teaching |
| `education` | Education history |
| `skills` | Tech skills (use flags below) |
| `skills --languages` | Programming languages |
| `skills --frameworks` | Frameworks & libraries |
| `skills --certifications` | Certifications |
| `projects` | Personal projects |
| `resume` | Open resume PDF |
| `contact` | Contact info |
| `clear` or `Ctrl+L` | Clear the terminal |

**Keyboard shortcuts:**
- `↑ / ↓` — navigate command history
- `Tab` — autocomplete commands
- `Ctrl+R` — reverse search through history
- `Ctrl+C` — interrupt current input

A traditional layout is available at `/normal_website/normal_index.html` for visitors who prefer it.

## Stack

- **Framework:** Next.js (App Router)
- **Styling:** CSS Modules + global CSS
- **Email:** API route using a third-party email service
- **Hosting:** Vercel

## Project structure

```
├── app/
│   ├── api/
│   │   ├── contacts/        # Contact info endpoint
│   │   ├── projects/        # Projects data endpoint
│   │   └── send-email/      # Email sending endpoint
│   ├── globals.css
│   ├── Home.module.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── Command.js           # Wraps a single input + output pair
│   ├── Input.js             # Terminal prompt input
│   ├── Output.js            # Renders HTML output from commands
│   └── Terminal.js          # Main terminal, handles all keyboard logic
├── utils/
│   ├── commandHelper.js     # All command content and logic
│   └── trie.js              # Trie for tab autocomplete
└── public/
    ├── normal_website/      # Static fallback portfolio page
    └── resume.pdf
```
