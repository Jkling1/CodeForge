// World 4: The Prompt Lab — Mastering Claude Code prompt engineering
export const world4Lessons = [
  // Lesson 1: Anatomy of a Good Prompt
  {
    id: 'w4_l1', worldId: 'world4', order: 1,
    title: 'Anatomy of a Good Prompt',
    description: 'Learn what makes a prompt effective for AI coding tools.',
    type: 'review', xpReward: 80, language: 'javascript',
    instruction: `A good prompt to Claude Code has four key ingredients:\n\n1. **Specificity** — Say exactly what you want, not vaguely\n2. **Context** — Give background about the project, language, and constraints\n3. **Structure** — Break complex tasks into clear steps\n4. **Examples** — Show expected input/output when relevant\n\nBad prompt: "Make me a website"\nGood prompt: "Create an HTML page with a centered heading that says Welcome, a paragraph of introduction text, and a blue button that says Get Started. Use flexbox for centering."\n\nAnswer the following questions about prompt quality.`,
    starterCode: '',
    hints: ['Think about what information helps Claude Code produce better results.', 'Specific beats vague every time.', 'Context about the language, framework, and constraints matters.'],
    concepts: ['prompt-engineering', 'prompt-specificity'],
    solution: '',
    questions: [
      { question: 'Which prompt would produce better results from Claude Code?', options: ['Build me a login form', 'Create an HTML login form with email and password fields, a Submit button, and client-side validation that checks for valid email format and password minimum 8 characters', 'Make something for logging in', 'Code a login thing'], answer: 1, explanation: 'The second option is specific about what fields to include, what validation to apply, and what technology to use. This gives Claude Code clear requirements.' },
      { question: 'What is the most important element to include in a prompt?', options: ['Emojis for clarity', 'The specific desired outcome and constraints', 'A long introduction about yourself', 'The exact code you want written'], answer: 1, explanation: 'Specificity about what you want built and any constraints (language, style, behavior) helps Claude Code give you exactly what you need.' },
      { question: 'When should you include examples in your prompt?', options: ['Never — Claude Code knows what you mean', 'When the expected input/output format matters', 'Only when writing tests', 'Always, for every prompt'], answer: 1, explanation: 'Examples are most valuable when the format of data matters — like showing expected function input/output, API response shape, or UI layout.' },
    ],
  },
  // Lesson 2: Describing UI in Words
  {
    id: 'w4_l2', worldId: 'world4', order: 2,
    title: 'Describing UI in Words',
    description: 'Write a prompt that describes a card component for Claude Code.',
    type: 'prompt', xpReward: 100, language: 'javascript',
    instruction: `Your goal: Write a prompt that would get Claude Code to build a **product card component**.\n\nThe card should have:\n- A product image at the top\n- A product name as a heading\n- A short description paragraph\n- A price displayed prominently\n- An "Add to Cart" button\n- Rounded corners and a subtle shadow\n- Hover effect on the button\n\nWrite your prompt as if you were typing it into Claude Code. Be specific about layout, styling, and behavior.`,
    starterCode: '',
    hints: ['Mention the visual layout: image on top, text below, button at bottom', 'Include styling details: rounded corners, shadow, padding, colors', 'Specify the hover effect: color change, scale, or transition'],
    concepts: ['prompt-engineering', 'prompt-ui-description'],
    solution: '',
    rubric: {
      requiredConcepts: [
        { terms: ['card', 'product card', 'component'], label: 'Card component', weight: 1 },
        { terms: ['image', 'img', 'photo', 'picture'], label: 'Product image', weight: 2 },
        { terms: ['name', 'title', 'heading', 'h2', 'h3'], label: 'Product name/heading', weight: 1 },
        { terms: ['description', 'text', 'paragraph'], label: 'Description text', weight: 1 },
        { terms: ['price', '$', 'cost'], label: 'Price display', weight: 2 },
        { terms: ['button', 'add to cart', 'cart'], label: 'Add to Cart button', weight: 2 },
      ],
      specificityMarkers: [
        { terms: ['rounded', 'border-radius', 'corners'], weight: 1 },
        { terms: ['shadow', 'box-shadow', 'elevation'], weight: 1 },
        { terms: ['hover', 'transition', 'animation', 'effect'], weight: 2 },
        { terms: ['padding', 'margin', 'spacing', 'gap'], weight: 1 },
        { terms: ['flexbox', 'flex', 'grid', 'layout', 'column'], weight: 1 },
      ],
      minLength: 60,
    },
    simulatedResponses: {
      low: '<div class="card">\n  <img src="product.jpg">\n  <h3>Product</h3>\n  <p>Description</p>\n  <button>Buy</button>\n</div>',
      medium: '<div class="card" style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 16px; width: 280px;">\n  <img src="product.jpg" style="width: 100%; border-radius: 8px 8px 0 0;">\n  <h3>Product Name</h3>\n  <p>A short description of this product.</p>\n  <span class="price">$29.99</span>\n  <button>Add to Cart</button>\n</div>',
      high: '<div class="product-card" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; width: 300px; font-family: system-ui;">\n  <img src="product.jpg" alt="Product" style="width: 100%; height: 200px; object-fit: cover;">\n  <div style="padding: 20px;">\n    <h3 style="margin: 0 0 8px; font-size: 18px;">Product Name</h3>\n    <p style="color: #666; font-size: 14px; margin: 0 0 12px;">A brief description of this amazing product and its features.</p>\n    <div style="font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 16px;">$29.99</div>\n    <button style="width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background=\'#1d4ed8\';this.style.transform=\'scale(1.02)\'" onmouseout="this.style.background=\'#2563eb\';this.style.transform=\'scale(1)\'">Add to Cart</button>\n  </div>\n</div>',
    },
    validation: { type: 'output', expected: [] },
  },
  // Lesson 3: Describing Logic
  {
    id: 'w4_l3', worldId: 'world4', order: 3,
    title: 'Describing Logic in Words',
    description: 'Write a prompt that describes function behavior for Claude Code.',
    type: 'prompt', xpReward: 100, language: 'javascript',
    instruction: `Write a prompt for Claude Code to build a **price filter function**.\n\nThe function should:\n- Be called \`filterByPrice\`\n- Accept an array of product objects (each has name and price)\n- Accept min and max price parameters\n- Return only products within the price range (inclusive)\n- Handle edge cases: empty array, no matches\n\nDescribe this clearly enough that Claude Code writes it correctly the first time.`,
    starterCode: '', hints: ['Mention the function name and parameters', 'Describe what each parameter is (array of objects with name/price, min number, max number)', 'Include edge cases: what if the array is empty?'],
    concepts: ['prompt-engineering', 'prompt-logic-description'],
    solution: '',
    rubric: {
      requiredConcepts: [
        { terms: ['filterbyprice', 'filter', 'function'], label: 'Function name', weight: 2 },
        { terms: ['array', 'products', 'list'], label: 'Array of products', weight: 1 },
        { terms: ['price', 'min', 'max', 'range'], label: 'Price range params', weight: 2 },
        { terms: ['return', 'result', 'output'], label: 'Return value', weight: 1 },
        { terms: ['name', 'property', 'object'], label: 'Object structure', weight: 1 },
      ],
      specificityMarkers: [
        { terms: ['inclusive', 'greater than or equal', '>=', '<='], weight: 2 },
        { terms: ['empty', 'edge case', 'no matches', 'undefined'], weight: 2 },
        { terms: ['parameter', 'argument', 'takes', 'accepts'], weight: 1 },
      ],
      minLength: 50,
    },
    simulatedResponses: {
      low: 'function filterByPrice(products, min, max) {\n  return products.filter(p => p.price >= min && p.price <= max);\n}',
      medium: 'function filterByPrice(products, minPrice, maxPrice) {\n  if (!products || products.length === 0) return [];\n  return products.filter(product => \n    product.price >= minPrice && product.price <= maxPrice\n  );\n}',
      high: '/**\n * Filters products by price range (inclusive)\n * @param {Array<{name: string, price: number}>} products\n * @param {number} minPrice - Minimum price (inclusive)\n * @param {number} maxPrice - Maximum price (inclusive)\n * @returns {Array} Filtered products within price range\n */\nfunction filterByPrice(products, minPrice, maxPrice) {\n  if (!Array.isArray(products) || products.length === 0) return [];\n  return products.filter(product => \n    product.price >= minPrice && product.price <= maxPrice\n  );\n}\n\n// Example usage:\n// filterByPrice([{name:"A",price:10},{name:"B",price:25}], 5, 20)\n// => [{name:"A",price:10}]',
    },
    validation: { type: 'output', expected: [] },
  },
  // Lesson 4: Iterating on Output
  {
    id: 'w4_l4', worldId: 'world4', order: 4,
    title: 'Iterating on Output',
    description: 'Learn the review-refine loop with Claude Code.',
    type: 'review', xpReward: 80, language: 'javascript',
    instruction: `When Claude Code gives you code that's *almost* right, you need to iterate. The review-refine loop is:\n\n1. **Review** what Claude Code produced\n2. **Identify** what's wrong or missing\n3. **Ask specifically** for the changes\n\nBad follow-up: "Fix it"\nGood follow-up: "The button should be blue (#2563eb) instead of gray, and add a hover effect that darkens it by 10%"\n\nAnswer these questions about effective iteration.`,
    starterCode: '', hints: ['Specific feedback gets specific improvements.', 'Reference exact elements when asking for changes.'],
    concepts: ['prompt-engineering', 'prompt-iteration'],
    solution: '',
    questions: [
      { question: 'Claude Code built a form but forgot validation. What\'s the best follow-up prompt?', options: ['It\'s wrong, fix it', 'Add validation', 'Add client-side validation to the email field that checks for @ symbol and shows a red error message below the field when invalid', 'Make it better'], answer: 2, explanation: 'The third option specifies what validation (email, @ check), where (client-side), and what feedback to show (red error below field). This precision gets the exact result you want.' },
      { question: 'When should you start a new prompt vs iterate on the current one?', options: ['Always start fresh', 'Iterate when the code is 70%+ correct, restart when the approach is fundamentally wrong', 'Never restart', 'Restart after every 3 messages'], answer: 1, explanation: 'If the overall structure is right, iterate. If the approach is wrong (e.g., used the wrong library, wrong architecture), starting fresh with better context is faster than trying to fix everything.' },
      { question: 'What makes iteration with Claude Code most effective?', options: ['Sending very long messages with every detail', 'Being specific about what to change and what to keep', 'Asking Claude Code to guess what you want', 'Rewriting the entire prompt from scratch each time'], answer: 1, explanation: 'Effective iteration means being clear about what\'s good (keep it) and what needs to change (be specific). This prevents Claude Code from accidentally changing things that were already correct.' },
    ],
  },
  // Lesson 5: Multi-Step Prompting
  {
    id: 'w4_l5', worldId: 'world4', order: 5,
    title: 'Multi-Step Prompting',
    description: 'Break big tasks into smaller prompts.',
    type: 'prompt', xpReward: 120, language: 'javascript',
    instruction: `Big projects fail when you try to build everything in one prompt. The key is **multi-step prompting**:\n\n1. Start with structure (HTML skeleton)\n2. Add styling (CSS)\n3. Add behavior (JavaScript)\n4. Refine and polish\n\nYour task: Write a prompt that asks Claude Code to build a **to-do list app**, broken into clear steps. Mention HTML structure first, then CSS styling, then JavaScript functionality including adding/removing/completing items and localStorage persistence.`,
    starterCode: '', hints: ['Start with: "Build a to-do list app in these steps:"', 'Step 1 should be HTML: input field, add button, list container', 'Include localStorage for persistence — items should survive page refresh'],
    concepts: ['prompt-engineering', 'prompt-multi-step'],
    solution: '',
    rubric: {
      requiredConcepts: [
        { terms: ['step', 'first', 'then', 'next', '1.', '2.', '3.'], label: 'Step-by-step structure', weight: 3 },
        { terms: ['html', 'structure', 'input', 'list'], label: 'HTML structure', weight: 2 },
        { terms: ['css', 'style', 'design', 'layout'], label: 'CSS styling', weight: 1 },
        { terms: ['javascript', 'js', 'function', 'add', 'remove'], label: 'JS functionality', weight: 2 },
        { terms: ['localstorage', 'persist', 'save', 'storage'], label: 'Data persistence', weight: 2 },
      ],
      specificityMarkers: [
        { terms: ['checkbox', 'complete', 'done', 'strikethrough'], weight: 1 },
        { terms: ['delete', 'remove', 'trash'], weight: 1 },
        { terms: ['responsive', 'mobile', 'centered'], weight: 1 },
      ],
      minLength: 80,
    },
    simulatedResponses: {
      low: '<input id="todo"><button onclick="add()">Add</button>\n<ul id="list"></ul>\n<script>\nfunction add() {\n  const li = document.createElement("li");\n  li.textContent = document.getElementById("todo").value;\n  document.getElementById("list").appendChild(li);\n}\n</script>',
      medium: '<!-- HTML -->\n<div class="todo-app">\n  <h1>To-Do List</h1>\n  <div class="input-row">\n    <input type="text" id="todoInput" placeholder="Add a task...">\n    <button onclick="addTodo()">Add</button>\n  </div>\n  <ul id="todoList"></ul>\n</div>\n\n<style>\n.todo-app { max-width: 400px; margin: 40px auto; font-family: sans-serif; }\ninput { padding: 8px; width: 70%; }\nbutton { padding: 8px 16px; }\nli { padding: 8px; cursor: pointer; }\nli.done { text-decoration: line-through; color: #999; }\n</style>\n\n<script>\nfunction addTodo() {\n  const input = document.getElementById("todoInput");\n  if (!input.value.trim()) return;\n  const li = document.createElement("li");\n  li.textContent = input.value;\n  li.onclick = () => li.classList.toggle("done");\n  document.getElementById("todoList").appendChild(li);\n  input.value = "";\n}\n</script>',
      high: '<!-- Full To-Do App with localStorage -->\n<div class="todo-app">\n  <h1>My Tasks</h1>\n  <form onsubmit="addTodo(event)">\n    <input type="text" id="todoInput" placeholder="What needs to be done?" autofocus>\n    <button type="submit">Add</button>\n  </form>\n  <ul id="todoList"></ul>\n  <p class="count"><span id="count">0</span> items remaining</p>\n</div>\n\n<style>\n* { box-sizing: border-box; margin: 0; }\n.todo-app { max-width: 500px; margin: 40px auto; padding: 24px; font-family: system-ui; }\nh1 { margin-bottom: 16px; }\nform { display: flex; gap: 8px; margin-bottom: 16px; }\ninput { flex: 1; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; }\nbutton { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; }\nbutton:hover { background: #1d4ed8; }\nul { list-style: none; padding: 0; }\nli { display: flex; align-items: center; padding: 12px; border-bottom: 1px solid #e2e8f0; }\nli input[type="checkbox"] { margin-right: 12px; }\nli.done span { text-decoration: line-through; color: #94a3b8; }\nli .delete { margin-left: auto; color: #ef4444; cursor: pointer; background: none; border: none; }\n</style>\n\n<script>\nlet todos = JSON.parse(localStorage.getItem("todos") || "[]");\nfunction render() {\n  const list = document.getElementById("todoList");\n  list.innerHTML = "";\n  todos.forEach((todo, i) => {\n    const li = document.createElement("li");\n    if (todo.done) li.classList.add("done");\n    li.innerHTML = `<input type="checkbox" ${todo.done?"checked":""} onchange="toggle(${i})"><span>${todo.text}</span><button class="delete" onclick="remove(${i})">x</button>`;\n    list.appendChild(li);\n  });\n  document.getElementById("count").textContent = todos.filter(t=>!t.done).length;\n  localStorage.setItem("todos", JSON.stringify(todos));\n}\nfunction addTodo(e) {\n  e.preventDefault();\n  const input = document.getElementById("todoInput");\n  if (!input.value.trim()) return;\n  todos.push({text: input.value.trim(), done: false});\n  input.value = "";\n  render();\n}\nfunction toggle(i) { todos[i].done = !todos[i].done; render(); }\nfunction remove(i) { todos.splice(i, 1); render(); }\nrender();\n</script>',
    },
    validation: { type: 'output', expected: [] },
  },
  // Lesson 6: Refactoring with Claude Code
  {
    id: 'w4_l6', worldId: 'world4', order: 6,
    title: 'Using Claude Code for Refactoring',
    description: 'Write a prompt to clean up messy code.',
    type: 'prompt', xpReward: 100, language: 'javascript',
    instruction: `Here's some messy code that works but needs cleanup:\n\n\`\`\`javascript\nfunction calc(x,y,z) {\n  if(z == "add") { return x+y }\n  if(z == "sub") { return x-y }\n  if(z == "mul") { return x*y }\n  if(z == "div") { if(y!=0){return x/y}else{return "err"} }\n}\nvar r1 = calc(5,3,"add")\nvar r2 = calc(10,2,"div")\nconsole.log(r1)\nconsole.log(r2)\n\`\`\`\n\nWrite a prompt asking Claude Code to refactor this. Mention specific issues like variable naming, using === instead of ==, using const/let, switch statement, and error handling.`,
    starterCode: '', hints: ['Mention the specific issues: variable names are unclear (x, y, z should be a, b, operator)', 'Ask for === instead of ==, const instead of var', 'Suggest using a switch statement for cleaner operator handling'],
    concepts: ['prompt-engineering', 'prompt-refactoring'],
    solution: '',
    rubric: {
      requiredConcepts: [
        { terms: ['refactor', 'clean', 'improve', 'rewrite'], label: 'Refactoring intent', weight: 1 },
        { terms: ['name', 'naming', 'rename', 'descriptive', 'variable'], label: 'Better naming', weight: 2 },
        { terms: ['===', 'strict', 'equality'], label: 'Strict equality', weight: 2 },
        { terms: ['const', 'let', 'var'], label: 'Modern declarations', weight: 1 },
      ],
      specificityMarkers: [
        { terms: ['switch', 'case'], weight: 2 },
        { terms: ['error', 'throw', 'exception', 'handling'], weight: 1 },
        { terms: ['jsdoc', 'comment', 'document'], weight: 1 },
      ],
      minLength: 40,
    },
    simulatedResponses: {
      low: 'function calc(a,b,op) {\n  switch(op) {\n    case "add": return a+b;\n    case "sub": return a-b;\n    case "mul": return a*b;\n    case "div": return b !== 0 ? a/b : "err";\n  }\n}',
      medium: 'function calculate(a, b, operator) {\n  switch (operator) {\n    case "add": return a + b;\n    case "sub": return a - b;\n    case "mul": return a * b;\n    case "div":\n      if (b === 0) throw new Error("Division by zero");\n      return a / b;\n    default:\n      throw new Error(`Unknown operator: ${operator}`);\n  }\n}\n\nconst result1 = calculate(5, 3, "add");\nconst result2 = calculate(10, 2, "div");\nconsole.log(result1);\nconsole.log(result2);',
      high: '/**\n * Performs arithmetic on two numbers\n * @param {number} a - First operand\n * @param {number} b - Second operand\n * @param {"add"|"sub"|"mul"|"div"} operator - Operation to perform\n * @returns {number} Result of the operation\n * @throws {Error} If operator is unknown or division by zero\n */\nfunction calculate(a, b, operator) {\n  switch (operator) {\n    case "add": return a + b;\n    case "sub": return a - b;\n    case "mul": return a * b;\n    case "div":\n      if (b === 0) throw new Error("Cannot divide by zero");\n      return a / b;\n    default:\n      throw new Error(`Unknown operator: "${operator}"`);\n  }\n}\n\nconst sum = calculate(5, 3, "add");   // 8\nconst quotient = calculate(10, 2, "div"); // 5\nconsole.log(sum);\nconsole.log(quotient);',
    },
    validation: { type: 'output', expected: [] },
  },
  // Lesson 7: Common Prompt Mistakes
  {
    id: 'w4_l7', worldId: 'world4', order: 7,
    title: 'Common Prompt Mistakes',
    description: 'Identify bad prompt patterns and learn to avoid them.',
    type: 'review', xpReward: 80, language: 'javascript',
    instruction: `Even experienced developers make prompt mistakes. The most common ones:\n\n1. **Too vague**: "Build me a website" — no details, no constraints\n2. **Too much at once**: Asking for an entire app in one prompt\n3. **No context**: Not mentioning the language, framework, or existing code\n4. **Contradictory**: "Make it simple but also handle every edge case"\n5. **Not reviewing output**: Accepting whatever Claude Code gives without reading it\n\nIdentify the issues in these prompts.`,
    starterCode: '', hints: ['Think about what information is missing from each prompt.', 'Consider what Claude Code would struggle with.'],
    concepts: ['prompt-engineering', 'prompt-mistakes'],
    solution: '',
    questions: [
      { question: 'Which prompt has the worst problem?', options: ['"Build a React component for a user profile card with avatar, name, bio, and edit button"', '"Make something cool with JavaScript"', '"Create a Python function that validates email addresses using regex"', '"Build a responsive nav bar with logo on left and 3 links on right"'], answer: 1, explanation: '"Make something cool" is fatally vague — Claude Code has no idea what to build, in what style, or for what purpose. The other prompts all give clear direction.' },
      { question: 'What\'s wrong with this prompt: "Build me a full e-commerce site with React, Node, PostgreSQL, Stripe payments, email notifications, admin dashboard, and mobile app"?', options: ['The technology stack is wrong', 'It asks for too much in a single prompt — should be broken into phases', 'It needs more detail about each feature', 'Nothing is wrong with it'], answer: 1, explanation: 'This asks for months of work in one prompt. Break it into phases: start with product listing, then cart, then checkout, etc. Claude Code works best with focused, achievable tasks.' },
      { question: 'How should you provide context about an existing project?', options: ['Paste the entire codebase into the prompt', 'Mention the framework, key file structure, and relevant existing code', 'Don\'t mention existing code — let Claude Code figure it out', 'Only mention the programming language'], answer: 1, explanation: 'Mention the framework (e.g., "This is a Next.js app"), relevant file paths, and any existing patterns Claude Code should follow. This prevents it from generating incompatible code.' },
    ],
  },
  // Lesson 8: Advanced Patterns
  {
    id: 'w4_l8', worldId: 'world4', order: 8,
    title: 'Advanced Claude Code Patterns',
    description: 'Learn about /compact, context management, and multi-file work.',
    type: 'concept', xpReward: 100, language: 'javascript',
    instruction: `Advanced Claude Code techniques:\n\n- **/compact**: Summarizes the conversation to free up context window. Use it during long sessions.\n- **Context management**: Claude Code reads files you mention. Reference specific files and functions.\n- **Multi-file projects**: Ask Claude Code to create files one at a time, or scaffold the whole project structure first.\n- **MCP (Model Context Protocol)**: Lets Claude Code connect to external tools like databases, APIs, and more.\n\n**Your task**: Write code that demonstrates you understand when to use /compact. Create an object with three properties describing the scenarios.`,
    starterCode: '// Create an object called claudeCodeTips\n// with these three keys:\n// - whenToCompact (string)\n// - contextTip (string)  \n// - multiFileTip (string)\n\n// Then log each tip\n',
    hints: ['/compact is for long sessions when context gets full', 'Context tip: mention specific files and functions in your prompts', 'Multi-file tip: scaffold structure first, then fill in details'],
    concepts: ['prompt-engineering', 'claude-code-advanced'],
    solution: 'const claudeCodeTips = {\n  whenToCompact: "Use /compact during long sessions when context is full",\n  contextTip: "Reference specific files and functions in prompts",\n  multiFileTip: "Scaffold project structure first, then fill in details"\n};\nconsole.log(claudeCodeTips.whenToCompact);\nconsole.log(claudeCodeTips.contextTip);\nconsole.log(claudeCodeTips.multiFileTip);',
    validation: {
      type: 'output',
      expected: [
        'Use /compact during long sessions when context is full',
        'Reference specific files and functions in prompts',
        'Scaffold project structure first, then fill in details',
      ],
    },
  },
  // BOSS: The Prompt Master
  {
    id: 'w4_boss', worldId: 'world4', order: 9,
    title: 'The Prompt Master',
    description: 'Prove your prompt engineering mastery across three challenges.',
    type: 'boss', xpReward: 500, language: 'javascript',
    instruction: 'The Prompt Master tests your ability to communicate effectively with AI coding tools.',
    starterCode: '', hints: [], concepts: ['prompt-engineering', 'prompt-ui-description', 'prompt-logic-description'],
    solution: '',
    validation: { type: 'output', expected: [] },
    phases: [
      {
        type: 'prompt', title: 'Phase 1: Describe a Nav Bar', xpReward: 150,
        instruction: 'Write a prompt for Claude Code to build a responsive navigation bar with: a logo on the left, three links in the center, and a hamburger menu that appears on mobile (hidden on desktop).',
        starterCode: '', hints: ['Mention responsive behavior explicitly', 'Describe the hamburger menu toggle'],
        concepts: ['prompt-engineering', 'prompt-ui-description'],
        solution: '',
        rubric: {
          requiredConcepts: [
            { terms: ['nav', 'navigation', 'navbar'], label: 'Navigation component', weight: 1 },
            { terms: ['logo', 'brand', 'left'], label: 'Logo placement', weight: 1 },
            { terms: ['link', 'menu', 'item'], label: 'Navigation links', weight: 1 },
            { terms: ['responsive', 'mobile', 'hamburger', 'toggle'], label: 'Responsive behavior', weight: 3 },
          ],
          specificityMarkers: [
            { terms: ['hidden', 'display', 'breakpoint', 'media'], weight: 2 },
            { terms: ['flex', 'space-between', 'align'], weight: 1 },
          ],
          minLength: 40,
        },
        simulatedResponses: {
          low: '<nav>\n  <div>Logo</div>\n  <a href="#">Link 1</a>\n  <a href="#">Link 2</a>\n  <a href="#">Link 3</a>\n</nav>',
          medium: '<nav style="display:flex;justify-content:space-between;padding:16px;">\n  <div class="logo">Logo</div>\n  <div class="links"><a href="#">Link 1</a> <a href="#">Link 2</a> <a href="#">Link 3</a></div>\n  <button class="hamburger" style="display:none;">☰</button>\n</nav>',
          high: '<nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;background:#fff;box-shadow:0 2px 4px rgba(0,0,0,0.1);">\n  <div style="font-weight:bold;font-size:20px;">Logo</div>\n  <div class="nav-links" style="display:flex;gap:24px;">\n    <a href="#" style="text-decoration:none;color:#333;">Home</a>\n    <a href="#" style="text-decoration:none;color:#333;">About</a>\n    <a href="#" style="text-decoration:none;color:#333;">Contact</a>\n  </div>\n  <button class="hamburger" style="display:none;background:none;border:none;font-size:24px;cursor:pointer;">☰</button>\n</nav>\n<style>\n@media(max-width:768px){\n  .nav-links{display:none!important;}\n  .hamburger{display:block!important;}\n}\n</style>',
        },
        validation: { type: 'output', expected: [] },
      },
      {
        type: 'prompt', title: 'Phase 2: Describe a Sort Function', xpReward: 150,
        instruction: 'Write a prompt for a function called sortUsers that takes an array of user objects (name, age, joinDate) and a sortBy parameter. It should sort ascending by default with an optional order parameter.',
        starterCode: '', hints: ['Mention all three sortable fields', 'Include the optional order parameter'],
        concepts: ['prompt-engineering', 'prompt-logic-description'],
        solution: '',
        rubric: {
          requiredConcepts: [
            { terms: ['sortusers', 'sort', 'function'], label: 'Function name', weight: 1 },
            { terms: ['name', 'age', 'joindate', 'date'], label: 'Sort fields', weight: 2 },
            { terms: ['ascending', 'descending', 'order', 'asc', 'desc'], label: 'Sort order', weight: 2 },
            { terms: ['array', 'users', 'objects'], label: 'Input type', weight: 1 },
          ],
          specificityMarkers: [
            { terms: ['default', 'optional', 'parameter'], weight: 2 },
            { terms: ['return', 'new array', 'copy'], weight: 1 },
          ],
          minLength: 40,
        },
        simulatedResponses: {
          low: 'function sortUsers(users, sortBy) {\n  return users.sort((a,b) => a[sortBy] > b[sortBy] ? 1 : -1);\n}',
          medium: 'function sortUsers(users, sortBy, order = "asc") {\n  return [...users].sort((a, b) => {\n    const compare = a[sortBy] > b[sortBy] ? 1 : -1;\n    return order === "desc" ? -compare : compare;\n  });\n}',
          high: 'function sortUsers(users, sortBy = "name", order = "asc") {\n  const validFields = ["name", "age", "joinDate"];\n  if (!validFields.includes(sortBy)) throw new Error(`Invalid sort field: ${sortBy}`);\n  \n  return [...users].sort((a, b) => {\n    let valA = a[sortBy], valB = b[sortBy];\n    if (sortBy === "joinDate") { valA = new Date(valA); valB = new Date(valB); }\n    const compare = valA > valB ? 1 : valA < valB ? -1 : 0;\n    return order === "desc" ? -compare : compare;\n  });\n}',
        },
        validation: { type: 'output', expected: [] },
      },
      {
        type: 'review', title: 'Phase 3: Pick the Best Prompt', xpReward: 200,
        instruction: 'For each question, identify which prompt would produce the best result from Claude Code.',
        starterCode: '', hints: ['Look for specificity and completeness'],
        concepts: ['prompt-engineering'],
        solution: '',
        questions: [
          { question: 'Which prompt best describes a dark mode toggle?', options: ['Add dark mode', 'Create a toggle button that switches between light and dark themes. Store the preference in localStorage. Dark theme: bg #0f172a, text #f1f5f9. Light theme: bg #ffffff, text #1e293b. Toggle should be a sun/moon icon in the top-right corner.', 'Make the page have dark mode with a button', 'I want dark and light themes for my website'], answer: 1, explanation: 'The second option specifies colors, storage method, icon style, and positioning — everything Claude Code needs to build it correctly on the first try.' },
          { question: 'Which prompt best asks for error handling?', options: ['Add try-catch everywhere', 'Add error handling to the fetchUserData function: wrap the fetch in try-catch, show a user-friendly error message in the #error-display div, add a retry button, and log the actual error to console for debugging', 'Handle errors in my code', 'Make my code not crash'], answer: 1, explanation: 'It names the specific function, specifies where errors display, asks for retry functionality, and distinguishes between user-facing and developer-facing error info.' },
        ],
      },
    ],
  },
];
