// World 1: The Command Line — Terminal basics and Claude Code introduction
export const world1Lessons = [
  // Lesson 1: What Is a Terminal
  {
    id: 'w1_l1',
    worldId: 'world1',
    order: 1,
    title: 'What Is a Terminal',
    description: 'Learn what the terminal is and write your first console output.',
    type: 'concept',
    xpReward: 50,
    instruction: `The **terminal** (also called the command line or shell) is a text-based interface for talking to your computer. Instead of clicking buttons and icons, you type commands.

Every programmer uses the terminal because it lets you:
- Run programs
- Navigate files and folders
- Install tools
- Automate tasks

In JavaScript, \`console.log()\` prints text to the terminal. It's the simplest way to see output from your code.

**Your task:** Use \`console.log\` to print exactly:
\`\`\`
Hello, Terminal!
I am a coder.
\`\`\`
Each line should be its own \`console.log\` call.`,
    starterCode: `// Print two lines to the terminal\n`,
    hints: [
      'Use console.log("text here") to print a line of text.',
      'You need two separate console.log() calls, one for each line.',
      'console.log("Hello, Terminal!");\nconsole.log("I am a coder.");',
    ],
    concepts: ['terminal', 'console-log'],
    solution: `console.log("Hello, Terminal!");\nconsole.log("I am a coder.");`,
    validation: {
      type: 'output',
      expected: ['Hello, Terminal!', 'I am a coder.'],
    },
  },

  // Lesson 2: Navigating the File System
  {
    id: 'w1_l2',
    worldId: 'world1',
    order: 2,
    title: 'Navigating the File System',
    description: 'Understand paths, directories, and how to move around.',
    type: 'concept',
    xpReward: 75,
    instruction: `Your computer organizes files in a tree of **directories** (folders). The terminal lets you move through this tree with commands:

- \`pwd\` — Print Working Directory (where you are now)
- \`ls\` — List files in the current directory
- \`cd\` — Change Directory (move somewhere else)

**Paths** describe locations:
- \`/home/user\` — an **absolute** path (starts from root \`/\`)
- \`./projects\` — a **relative** path (starts from where you are)
- \`../\` — go up one level

**Your task:** Given a file system, print the absolute paths. Use \`console.log\` to output:
\`\`\`
/home/user
/home/user/projects
/home/user/projects/app.js
\`\`\``,
    starterCode: `// Print three absolute paths, one per line\n// Start from the user's home directory\n`,
    hints: [
      'An absolute path always starts with / (the root).',
      'Each path builds on the previous one: home → user → projects → app.js',
      'console.log("/home/user");\nconsole.log("/home/user/projects");\nconsole.log("/home/user/projects/app.js");',
    ],
    concepts: ['terminal', 'file-paths'],
    solution: `console.log("/home/user");\nconsole.log("/home/user/projects");\nconsole.log("/home/user/projects/app.js");`,
    validation: {
      type: 'output',
      expected: ['/home/user', '/home/user/projects', '/home/user/projects/app.js'],
    },
  },

  // Lesson 3: Creating and Editing Files
  {
    id: 'w1_l3',
    worldId: 'world1',
    order: 3,
    title: 'Creating and Editing Files',
    description: 'Learn common terminal commands for working with files.',
    type: 'concept',
    xpReward: 75,
    instruction: `In the terminal, you can create and manage files without a graphical file manager:

- \`touch filename\` — Create an empty file
- \`mkdir dirname\` — Make a new directory
- \`cp source dest\` — Copy a file
- \`mv source dest\` — Move or rename a file
- \`rm filename\` — Remove (delete) a file
- \`cat filename\` — Display file contents

**Your task:** Imagine you need to set up a project. Print the commands you would run, in order:
\`\`\`
mkdir my-project
cd my-project
touch index.html
touch style.css
touch app.js
\`\`\``,
    starterCode: `// Print the 5 terminal commands to set up a project\n`,
    hints: [
      'Use console.log() once for each command.',
      'First create the directory, then cd into it, then create files.',
      'console.log("mkdir my-project");\nconsole.log("cd my-project");\nconsole.log("touch index.html");\nconsole.log("touch style.css");\nconsole.log("touch app.js");',
    ],
    concepts: ['terminal', 'file-operations'],
    solution: `console.log("mkdir my-project");\nconsole.log("cd my-project");\nconsole.log("touch index.html");\nconsole.log("touch style.css");\nconsole.log("touch app.js");`,
    validation: {
      type: 'output',
      expected: [
        'mkdir my-project',
        'cd my-project',
        'touch index.html',
        'touch style.css',
        'touch app.js',
      ],
    },
  },

  // Lesson 4: What Is Claude Code (review)
  {
    id: 'w1_l4',
    worldId: 'world1',
    order: 4,
    title: 'What Is Claude Code',
    description: 'Learn about Claude Code — the AI coding assistant that runs in your terminal.',
    type: 'review',
    xpReward: 50,
    instruction: `**Claude Code** is an AI coding assistant made by Anthropic that runs right in your terminal. Unlike chat-based AI tools, Claude Code can:

- Read and write files on your computer
- Run terminal commands
- Understand your entire project at once
- Make changes across multiple files

You start it by typing \`claude\` in your terminal. Then you describe what you want in plain English, and Claude Code does the work — writing code, fixing bugs, or explaining things.

**Key facts:**
- Claude Code sees your project's file structure
- It asks for permission before making changes
- You can accept, reject, or modify its suggestions
- It works best when you give clear, specific instructions

Answer the questions below to check your understanding.`,
    starterCode: '',
    hints: [
      'Re-read the passage above carefully — all answers are in the text.',
      'Focus on what makes Claude Code different from chat-based AI.',
      'Claude Code runs in the terminal, can read/write files, and asks permission.',
    ],
    concepts: ['claude-code', 'ai-tools'],
    solution: '',
    validation: { type: 'output', expected: [] },
    questions: [
      {
        question: 'How do you start Claude Code?',
        options: [
          'Open a website and log in',
          'Type "claude" in the terminal',
          'Double-click an app icon',
          'Type "start ai" in the terminal',
        ],
        answer: 1,
        explanation: 'You start Claude Code by typing `claude` in your terminal. It runs as a command-line tool, not a web app.',
      },
      {
        question: 'What can Claude Code do that a simple chatbot cannot?',
        options: [
          'Answer questions about code',
          'Generate code snippets',
          'Read and write files on your computer',
          'Explain programming concepts',
        ],
        answer: 2,
        explanation: 'Claude Code can directly read and write files on your computer, run terminal commands, and understand your entire project — things a simple chatbot cannot do.',
      },
      {
        question: 'What happens before Claude Code makes changes to your files?',
        options: [
          'It makes changes immediately without asking',
          'It asks for your permission first',
          'It creates a backup automatically',
          'It sends your code to the cloud',
        ],
        answer: 1,
        explanation: 'Claude Code asks for permission before making changes. You can accept, reject, or modify its suggestions.',
      },
    ],
  },

  // Lesson 5: Your First Claude Code Session
  {
    id: 'w1_l5',
    worldId: 'world1',
    order: 5,
    title: 'Your First Claude Code Session',
    description: 'Walk through what a Claude Code session looks like.',
    type: 'concept',
    xpReward: 100,
    instruction: `Let's simulate a Claude Code session! When you use Claude Code, the flow looks like this:

1. **You type a prompt:** "Create an HTML file with a heading that says Hello World"
2. **Claude Code responds:** It shows you the code it wants to write
3. **You approve:** You press Enter to accept the changes
4. **Files are created/modified:** The code is written to your project

The quality of your results depends on your **prompt** — the instruction you give.

Good prompts are:
- **Specific** — say exactly what you want
- **Contextual** — mention relevant files or technologies
- **Scoped** — focus on one task at a time

**Your task:** Print what a good prompt and a bad prompt look like:
\`\`\`
BAD: make a website
GOOD: Create an index.html file with a nav bar containing links to Home, About, and Contact pages
\`\`\``,
    starterCode: `// Print a BAD prompt example, then a GOOD prompt example\n`,
    hints: [
      'You need two console.log() calls — one starting with "BAD:" and one with "GOOD:".',
      'The bad prompt is vague. The good prompt is specific about what to create.',
      'console.log("BAD: make a website");\nconsole.log("GOOD: Create an index.html file with a nav bar containing links to Home, About, and Contact pages");',
    ],
    concepts: ['claude-code', 'prompting'],
    solution: `console.log("BAD: make a website");\nconsole.log("GOOD: Create an index.html file with a nav bar containing links to Home, About, and Contact pages");`,
    validation: {
      type: 'output',
      expected: [
        'BAD: make a website',
        'GOOD: Create an index.html file with a nav bar containing links to Home, About, and Contact pages',
      ],
    },
  },

  // Lesson 6: Understanding Claude Code Output
  {
    id: 'w1_l6',
    worldId: 'world1',
    order: 6,
    title: 'Understanding Claude Code Output',
    description: 'Learn to read and interpret what Claude Code shows you.',
    type: 'review',
    xpReward: 50,
    instruction: `When Claude Code responds to your prompt, it shows you several things:

**1. Explanation text** — Claude explains what it's about to do in plain English.

**2. File operations** — Shows which files will be created or modified:
\`\`\`
Create: src/index.html
Edit: src/style.css (3 changes)
\`\`\`

**3. Code diffs** — The actual changes, with \`+\` for added lines and \`-\` for removed lines:
\`\`\`diff
- <h1>Old Title</h1>
+ <h1>New Title</h1>
\`\`\`

**4. Action buttons** — You can:
- **Accept** — Apply all changes
- **Reject** — Cancel all changes
- **Edit** — Modify before applying

**Reading diffs** is a crucial skill. Lines starting with \`+\` are additions. Lines starting with \`-\` are deletions. Lines with no prefix are unchanged context.

Answer the questions to test your understanding.`,
    starterCode: '',
    hints: [
      'Look at the diff notation: + means added, - means removed.',
      'Think about what each part of the Claude Code output tells you.',
      'The diff shows Old Title being replaced by New Title.',
    ],
    concepts: ['claude-code', 'diffs'],
    solution: '',
    validation: { type: 'output', expected: [] },
    questions: [
      {
        question: 'In a code diff, what does a line starting with + mean?',
        options: [
          'The line was removed',
          'The line was added',
          'The line has an error',
          'The line is a comment',
        ],
        answer: 1,
        explanation: 'In a diff, lines starting with + are additions (new code being added). Lines starting with - are deletions (old code being removed).',
      },
      {
        question: 'What should you do if Claude Code suggests changes you don\'t want?',
        options: [
          'Close the terminal immediately',
          'Accept them and undo later',
          'Reject the changes',
          'Delete the file manually',
        ],
        answer: 2,
        explanation: 'You can reject changes you don\'t want. Claude Code always asks for permission before making changes, and you can reject, accept, or edit.',
      },
      {
        question: 'What does "Edit: src/style.css (3 changes)" mean?',
        options: [
          'A new file called style.css will be created',
          'The file style.css will be deleted',
          'Three modifications will be made to the existing style.css file',
          'Three copies of style.css will be made',
        ],
        answer: 2,
        explanation: '"Edit" means the file already exists and will be modified. "(3 changes)" tells you how many separate modifications will be made.',
      },
    ],
  },

  // Lesson 7: Claude Code Permissions & Settings
  {
    id: 'w1_l7',
    worldId: 'world1',
    order: 7,
    title: 'Claude Code Permissions & Settings',
    description: 'Understand how Claude Code handles permissions and safety.',
    type: 'review',
    xpReward: 50,
    instruction: `Claude Code is powerful — it can run commands and modify files. That's why it has a **permission system**:

**Permission levels:**
- **Read** — Claude can always read your files to understand your project
- **Write** — Claude asks before creating or editing files
- **Execute** — Claude asks before running terminal commands

**Safety features:**
- Claude shows you exactly what it will do before doing it
- You can set up an **allowlist** of commands Claude can run without asking
- Claude works in your project directory — it doesn't access unrelated files
- You can always undo changes with \`git\` (version control)

**Best practices:**
- Always review changes before accepting
- Use git so you can revert if something goes wrong
- Start with small, focused prompts
- Build up complexity gradually

Answer the questions below.`,
    starterCode: '',
    hints: [
      'Think about why each permission level exists.',
      'Consider what makes Claude Code safe to use.',
      'Git lets you undo changes, which is a key safety net.',
    ],
    concepts: ['claude-code', 'permissions'],
    solution: '',
    validation: { type: 'output', expected: [] },
    questions: [
      {
        question: 'Which action does Claude Code NOT need permission for?',
        options: [
          'Creating a new file',
          'Reading existing files',
          'Running a terminal command',
          'Deleting a file',
        ],
        answer: 1,
        explanation: 'Claude Code can always read your files to understand your project. It needs permission for writing (creating/editing/deleting) and executing commands.',
      },
      {
        question: 'Why is git recommended when using Claude Code?',
        options: [
          'Claude Code requires git to function',
          'Git makes Claude Code run faster',
          'Git lets you undo changes if something goes wrong',
          'Git automatically reviews Claude Code\'s suggestions',
        ],
        answer: 2,
        explanation: 'Git (version control) lets you revert changes if something goes wrong. It\'s a safety net that lets you experiment with confidence.',
      },
    ],
  },

  // Lesson 8: The Feedback Loop
  {
    id: 'w1_l8',
    worldId: 'world1',
    order: 8,
    title: 'The Feedback Loop',
    description: 'Learn to iterate on Claude Code output to get better results.',
    type: 'concept',
    xpReward: 100,
    instruction: `Getting great results from Claude Code is a **feedback loop**:

1. **Prompt** — Give Claude Code an instruction
2. **Review** — Look at what it produced
3. **Refine** — If it's not right, give a follow-up prompt

This is called **iterative prompting**. You rarely get perfect results on the first try — and that's fine!

**Example feedback loop:**
- You: "Create a button"
- Claude: Creates a plain button
- You: "Make the button blue with rounded corners and add a hover effect"
- Claude: Updates the button with styles
- You: "The hover color should be darker blue, not lighter"
- Claude: Fixes the hover color

Each follow-up is more specific because you can **see** what needs to change.

**Your task:** Print the three steps of the feedback loop:
\`\`\`
Step 1: Prompt
Step 2: Review
Step 3: Refine
\`\`\``,
    starterCode: `// Print the three steps of the feedback loop\n`,
    hints: [
      'Three console.log calls, one for each step.',
      'The steps are Prompt, Review, Refine.',
      'console.log("Step 1: Prompt");\nconsole.log("Step 2: Review");\nconsole.log("Step 3: Refine");',
    ],
    concepts: ['claude-code', 'iterative-prompting'],
    solution: `console.log("Step 1: Prompt");\nconsole.log("Step 2: Review");\nconsole.log("Step 3: Refine");`,
    validation: {
      type: 'output',
      expected: ['Step 1: Prompt', 'Step 2: Review', 'Step 3: Refine'],
    },
  },

  // Lesson 9: When to Code Yourself vs When to Prompt
  {
    id: 'w1_l9',
    worldId: 'world1',
    order: 9,
    title: 'When to Code Yourself vs When to Prompt',
    description: 'Understand when to write code manually and when to use AI help.',
    type: 'review',
    xpReward: 75,
    instruction: `AI coding tools are powerful, but knowing **when** to use them is a skill:

**Code yourself when:**
- Learning a new concept (you need the practice)
- Making a small, quick change (faster than prompting)
- The logic is simple and clear in your head
- You need precise control over every detail

**Prompt Claude Code when:**
- Setting up boilerplate (repetitive setup code)
- Working with unfamiliar libraries or APIs
- Refactoring large amounts of code
- Generating test cases
- You know WHAT you want but not HOW to code it

**The golden rule:** Always understand the code in your project, even if AI wrote it. You're the pilot — AI is your copilot.

**Why this matters:** Developers who rely on AI without understanding the code produce fragile software. Developers who understand fundamentals AND use AI are the most productive.

Answer the questions below.`,
    starterCode: '',
    hints: [
      'Think about when understanding matters most vs when speed matters most.',
      'Learning requires doing it yourself. Boilerplate is repetitive and AI handles it well.',
      'The golden rule: always understand the code, even if AI wrote it.',
    ],
    concepts: ['claude-code', 'best-practices'],
    solution: '',
    validation: { type: 'output', expected: [] },
    questions: [
      {
        question: 'When should you code by hand instead of using AI?',
        options: [
          'When generating boilerplate code',
          'When learning a new programming concept',
          'When refactoring a large codebase',
          'When working with an unfamiliar library',
        ],
        answer: 1,
        explanation: 'When learning something new, you should code by hand. The practice of writing code yourself is how concepts stick. AI is better for repetitive tasks you already understand.',
      },
      {
        question: 'What is the "golden rule" of using AI coding tools?',
        options: [
          'Always use AI for everything to save time',
          'Never use AI because it makes mistakes',
          'Always understand the code in your project, even if AI wrote it',
          'Only use AI for simple tasks',
        ],
        answer: 2,
        explanation: 'The golden rule: always understand the code in your project. You\'re the pilot, AI is the copilot. You need to be able to read, debug, and modify AI-generated code.',
      },
    ],
  },

  // Lesson 10: Combining Terminal and Claude Code
  {
    id: 'w1_l10',
    worldId: 'world1',
    order: 10,
    title: 'Combining Terminal and Claude Code',
    description: 'Practice a real developer workflow using the terminal and Claude Code together.',
    type: 'concept',
    xpReward: 100,
    instruction: `A real developer workflow combines terminal skills and Claude Code. Here's a typical sequence:

1. **Navigate** to your project: \`cd my-project\`
2. **Check status**: \`git status\` to see what's changed
3. **Start Claude Code**: \`claude\`
4. **Prompt**: "Add a footer to index.html with copyright text"
5. **Review** the changes Claude Code suggests
6. **Accept** the changes
7. **Test**: Open the file in a browser to verify
8. **Commit**: \`git add . && git commit -m "Add footer"\`

Notice how the terminal and Claude Code work together. You use the terminal for navigation, git, and running programs. You use Claude Code for writing and modifying code.

**Your task:** Print the workflow steps as commands:
\`\`\`
cd my-project
git status
claude
git add .
git commit -m "Add footer"
\`\`\``,
    starterCode: `// Print the 5 key terminal commands in a developer workflow\n`,
    hints: [
      'Five console.log calls for each command in the workflow.',
      'The order is: navigate, check status, start Claude, stage changes, commit.',
      'console.log("cd my-project");\nconsole.log("git status");\nconsole.log("claude");\nconsole.log("git add .");\nconsole.log(\'git commit -m "Add footer"\');',
    ],
    concepts: ['terminal', 'claude-code', 'git-basics'],
    solution: `console.log("cd my-project");\nconsole.log("git status");\nconsole.log("claude");\nconsole.log("git add .");\nconsole.log('git commit -m "Add footer"');`,
    validation: {
      type: 'output',
      expected: [
        'cd my-project',
        'git status',
        'claude',
        'git add .',
        'git commit -m "Add footer"',
      ],
    },
  },

  // BOSS: Terminal Trial
  {
    id: 'w1_boss',
    worldId: 'world1',
    order: 11,
    title: 'Terminal Trial',
    description: 'Prove your mastery of the terminal and Claude Code fundamentals.',
    type: 'boss',
    xpReward: 300,
    instruction: `Welcome to the **Terminal Trial**! This boss fight has 3 phases. You'll need everything you've learned about the terminal and Claude Code.`,
    starterCode: '',
    hints: [
      'Review the lessons — each phase tests a different skill.',
      'Phase 1 is about file paths. Phase 2 is about commands. Phase 3 combines knowledge.',
      'Take each phase one at a time. The answers are all things you\'ve already learned.',
    ],
    concepts: ['terminal', 'claude-code', 'file-paths', 'file-operations', 'prompting'],
    solution: '',
    validation: { type: 'output', expected: [] },
    phases: [
      {
        type: 'concept',
        title: 'Phase 1: Path Master',
        instruction: `**Phase 1: Path Master**

You need to navigate a file system. Given this directory structure:
\`\`\`
/home/
  user/
    projects/
      website/
        index.html
        css/
          style.css
        js/
          app.js
    documents/
      notes.txt
\`\`\`

Print the absolute path to each file, one per line:
\`\`\`
/home/user/projects/website/index.html
/home/user/projects/website/css/style.css
/home/user/projects/website/js/app.js
/home/user/documents/notes.txt
\`\`\``,
        starterCode: '// Print the absolute path to all 4 files\n',
        solution: `console.log("/home/user/projects/website/index.html");\nconsole.log("/home/user/projects/website/css/style.css");\nconsole.log("/home/user/projects/website/js/app.js");\nconsole.log("/home/user/documents/notes.txt");`,
        validation: {
          type: 'output',
          expected: [
            '/home/user/projects/website/index.html',
            '/home/user/projects/website/css/style.css',
            '/home/user/projects/website/js/app.js',
            '/home/user/documents/notes.txt',
          ],
        },
        xpReward: 100,
        hints: [
          'Start each path from / and follow the tree down.',
          'Don\'t forget the css/ and js/ subdirectories.',
          'There are 4 files: index.html, style.css, app.js, notes.txt',
        ],
      },
      {
        type: 'concept',
        title: 'Phase 2: Command Sequence',
        instruction: `**Phase 2: Command Sequence**

You need to set up a new project from scratch. Print the terminal commands to:
1. Create a directory called "blog"
2. Change into it
3. Initialize a git repository
4. Create three files: index.html, style.css, script.js
5. Stage all files for commit

Print each command on its own line:
\`\`\`
mkdir blog
cd blog
git init
touch index.html style.css script.js
git add .
\`\`\``,
        starterCode: '// Print the 5 commands to set up a project\n',
        solution: `console.log("mkdir blog");\nconsole.log("cd blog");\nconsole.log("git init");\nconsole.log("touch index.html style.css script.js");\nconsole.log("git add .");`,
        validation: {
          type: 'output',
          expected: [
            'mkdir blog',
            'cd blog',
            'git init',
            'touch index.html style.css script.js',
            'git add .',
          ],
        },
        xpReward: 100,
        hints: [
          'mkdir creates directories, cd changes into them.',
          'git init starts a new repository. touch creates files.',
          'You can create multiple files with one touch command by listing them.',
        ],
      },
      {
        type: 'review',
        title: 'Phase 3: Workflow Wisdom',
        instruction: `**Phase 3: Workflow Wisdom**

Final challenge! Answer these questions about combining terminal skills with Claude Code.`,
        starterCode: '',
        solution: '',
        validation: { type: 'output', expected: [] },
        xpReward: 100,
        hints: [
          'Think about the full developer workflow.',
          'Remember: you\'re the pilot, AI is the copilot.',
          'The feedback loop is: Prompt, Review, Refine.',
        ],
        questions: [
          {
            question: 'You want to add a contact form to your website. What\'s the best first step?',
            options: [
              'Ask Claude Code: "make my website better"',
              'Navigate to your project folder and check git status first',
              'Delete your existing code and start over',
              'Copy code from a random website',
            ],
            answer: 1,
            explanation: 'Always start by navigating to your project and checking its status. This ensures you\'re in the right place and know the current state before making changes.',
          },
          {
            question: 'Claude Code generates a form but the layout looks wrong. What do you do?',
            options: [
              'Accept it anyway and fix it later manually',
              'Give up and write it from scratch',
              'Give Claude Code a specific follow-up prompt describing what to fix',
              'Restart your computer',
            ],
            answer: 2,
            explanation: 'This is the feedback loop in action. Give a specific follow-up prompt like "The form fields should be stacked vertically, not side by side." Iteration leads to better results.',
          },
          {
            question: 'What should you ALWAYS do after Claude Code modifies your code?',
            options: [
              'Immediately deploy to production',
              'Delete the original files',
              'Review the changes and test them',
              'Run the code without looking at it',
            ],
            answer: 2,
            explanation: 'Always review changes and test them. You need to understand what was changed and verify it works correctly. You\'re responsible for your code, even when AI writes it.',
          },
        ],
      },
    ],
  },
];
