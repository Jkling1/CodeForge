// World 3: Making It Move — JavaScript
export const world3Lessons = [
  {
    id: 'w3_l1', worldId: 'world3', order: 1, title: 'JavaScript Basics',
    description: 'Variables, types, and your first console.log.',
    type: 'concept', xpReward: 50, language: 'javascript',
    instruction: `JavaScript is the programming language of the web. It makes pages interactive.

Key concepts:
- \`let\` — declares a variable that can change
- \`const\` — declares a variable that cannot be reassigned
- Data types: strings ("hello"), numbers (42), booleans (true/false)
- \`console.log()\` — prints output

**Your task:** Create a \`const\` called \`name\` with your name, a \`let\` called \`age\` with a number, and log both:
\`\`\`
Hello, [name]!
Age: [age]
\`\`\``,
    starterCode: '// Declare variables and log them\n',
    hints: [
      'Use const name = "YourName";',
      'Use let age = 25;',
      'const name = "Builder";\nlet age = 25;\nconsole.log("Hello, " + name + "!");\nconsole.log("Age: " + age);',
    ],
    concepts: ['js-variables', 'js-types', 'console-log'],
    solution: 'const name = "Builder";\nlet age = 25;\nconsole.log("Hello, " + name + "!");\nconsole.log("Age: " + age);',
    validation: { type: 'output', expected: ['Hello, Builder!', 'Age: 25'] },
  },
  {
    id: 'w3_l2', worldId: 'world3', order: 2, title: 'Operators & Expressions',
    description: 'Arithmetic, comparison, and logical operators.',
    type: 'concept', xpReward: 75, language: 'javascript',
    instruction: `JavaScript operators let you compute values:

Arithmetic: \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (remainder)
Comparison: \`===\` (equal), \`!==\` (not equal), \`>\`, \`<\`, \`>=\`, \`<=\`
Logical: \`&&\` (and), \`||\` (or), \`!\` (not)

**Your task:**
1. Calculate 15 * 4 and log the result
2. Check if 10 > 5 and log the result
3. Log the remainder of 17 divided by 5`,
    starterCode: '// Calculate and compare\n',
    hints: [
      'console.log(15 * 4);',
      'console.log(10 > 5);',
      'Use the % operator: console.log(17 % 5);',
    ],
    concepts: ['js-operators', 'js-expressions'],
    solution: 'console.log(15 * 4);\nconsole.log(10 > 5);\nconsole.log(17 % 5);',
    validation: { type: 'output', expected: ['60', 'true', '2'] },
  },
  {
    id: 'w3_l3', worldId: 'world3', order: 3, title: 'Control Flow',
    description: 'Making decisions with if/else.',
    type: 'concept', xpReward: 75, language: 'javascript',
    instruction: `Control flow lets your code make decisions:

\`\`\`javascript
if (condition) {
  // runs if true
} else {
  // runs if false
}
\`\`\`

**Your task:** Write code that:
1. Creates a variable \`score\` set to 85
2. If score >= 90, log "A"
3. Else if score >= 80, log "B"
4. Else log "C"

Expected output: \`B\``,
    starterCode: '// Grade the score\nconst score = 85;\n',
    hints: [
      'Use if (score >= 90) { ... } else if ...',
      'You need three branches: >=90, >=80, else',
      'const score = 85;\nif (score >= 90) {\n  console.log("A");\n} else if (score >= 80) {\n  console.log("B");\n} else {\n  console.log("C");\n}',
    ],
    concepts: ['js-conditionals', 'js-control-flow'],
    solution: 'const score = 85;\nif (score >= 90) {\n  console.log("A");\n} else if (score >= 80) {\n  console.log("B");\n} else {\n  console.log("C");\n}',
    validation: { type: 'output', expected: ['B'] },
  },
  {
    id: 'w3_l4', worldId: 'world3', order: 4, title: 'Loops',
    description: 'Repeating actions with for loops.',
    type: 'concept', xpReward: 75, language: 'javascript',
    instruction: `Loops repeat code multiple times:

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
\`\`\`

This logs 0, 1, 2, 3, 4.

**Your task:** Write a for loop that logs the numbers 1 through 5, one per line.

Expected output:
\`\`\`
1
2
3
4
5
\`\`\``,
    starterCode: '// Loop from 1 to 5\n',
    hints: [
      'Start your loop counter at 1: for (let i = 1; ...)',
      'Loop while i <= 5',
      'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}',
    ],
    concepts: ['js-loops', 'js-for-loop'],
    solution: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}',
    validation: { type: 'output', expected: ['1', '2', '3', '4', '5'] },
  },
  {
    id: 'w3_l5', worldId: 'world3', order: 5, title: 'Functions',
    description: 'Writing reusable code blocks.',
    type: 'concept', xpReward: 100, language: 'javascript',
    instruction: `Functions are reusable blocks of code:

\`\`\`javascript
function greet(name) {
  return "Hello, " + name;
}
console.log(greet("World")); // Hello, World
\`\`\`

**Your task:** Write a function called \`add\` that takes two numbers and returns their sum. Then log the result of \`add(3, 7)\`.

Expected output: \`10\``,
    starterCode: '// Write the add function\n',
    hints: [
      'function add(a, b) { return a + b; }',
      'Don\'t forget to call it: console.log(add(3, 7));',
      'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(3, 7));',
    ],
    concepts: ['js-functions', 'js-return'],
    solution: 'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(3, 7));',
    validation: { type: 'output', expected: ['10'] },
  },
  {
    id: 'w3_l6', worldId: 'world3', order: 6, title: 'Arrays',
    description: 'Working with lists of data.',
    type: 'concept', xpReward: 100, language: 'javascript',
    instruction: `Arrays hold ordered lists of values:

\`\`\`javascript
const fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // apple
console.log(fruits.length); // 3
\`\`\`

Useful methods: \`.push()\`, \`.map()\`, \`.filter()\`

**Your task:**
1. Create an array \`numbers\` with values [1, 2, 3, 4, 5]
2. Use \`.filter()\` to keep only numbers greater than 2
3. Log the filtered array

Expected output: \`3,4,5\``,
    starterCode: '// Filter an array\n',
    hints: [
      'const numbers = [1, 2, 3, 4, 5];',
      'Use .filter(n => n > 2)',
      'const numbers = [1, 2, 3, 4, 5];\nconst filtered = numbers.filter(n => n > 2);\nconsole.log(filtered.join(","));',
    ],
    concepts: ['js-arrays', 'js-filter'],
    solution: 'const numbers = [1, 2, 3, 4, 5];\nconst filtered = numbers.filter(n => n > 2);\nconsole.log(filtered.join(","));',
    validation: { type: 'output', expected: ['3,4,5'] },
  },
  {
    id: 'w3_l7', worldId: 'world3', order: 7, title: 'Objects',
    description: 'Key-value pairs and data structures.',
    type: 'concept', xpReward: 100, language: 'javascript',
    instruction: `Objects store data as key-value pairs:

\`\`\`javascript
const user = { name: "Alice", age: 30 };
console.log(user.name); // Alice
\`\`\`

**Your task:**
1. Create an object \`car\` with properties: \`brand\` ("Toyota"), \`year\` (2024), \`color\` ("blue")
2. Log each property on its own line

Expected output:
\`\`\`
Toyota
2024
blue
\`\`\``,
    starterCode: '// Create a car object\n',
    hints: [
      'const car = { brand: "Toyota", year: 2024, color: "blue" };',
      'Use car.brand, car.year, car.color',
      'const car = { brand: "Toyota", year: 2024, color: "blue" };\nconsole.log(car.brand);\nconsole.log(car.year);\nconsole.log(car.color);',
    ],
    concepts: ['js-objects', 'js-dot-notation'],
    solution: 'const car = { brand: "Toyota", year: 2024, color: "blue" };\nconsole.log(car.brand);\nconsole.log(car.year);\nconsole.log(car.color);',
    validation: { type: 'output', expected: ['Toyota', '2024', 'blue'] },
  },
  {
    id: 'w3_l8', worldId: 'world3', order: 8, title: 'DOM Manipulation',
    description: 'Selecting and changing page elements with JavaScript.',
    type: 'concept', xpReward: 100, language: 'javascript',
    instruction: `The DOM (Document Object Model) lets JavaScript interact with HTML. Key methods:
- \`document.querySelector()\` — select an element
- \`.textContent\` — get/set text
- \`.style\` — change CSS
- \`.classList.add()\` — add CSS classes
- \`document.createElement()\` — create new elements

Since we cannot access a real DOM in this sandbox, let's practice the concepts by simulating DOM operations.

**Your task:** Log these three lines showing what DOM methods you would use:
\`\`\`
querySelector: selects elements
textContent: changes text
createElement: makes new elements
\`\`\``,
    starterCode: '// Practice DOM concepts\n',
    hints: [
      'Just use console.log for each line',
      'Match the exact expected output',
      'console.log("querySelector: selects elements");\nconsole.log("textContent: changes text");\nconsole.log("createElement: makes new elements");',
    ],
    concepts: ['js-dom', 'dom-manipulation'],
    solution: 'console.log("querySelector: selects elements");\nconsole.log("textContent: changes text");\nconsole.log("createElement: makes new elements");',
    validation: { type: 'output', expected: ['querySelector: selects elements', 'textContent: changes text', 'createElement: makes new elements'] },
  },
  {
    id: 'w3_l9', worldId: 'world3', order: 9, title: 'Event Handling',
    description: 'Understanding how JavaScript responds to user actions.',
    type: 'review', xpReward: 80, language: 'javascript',
    instruction: `Review this event handling code and answer the questions below.`,
    starterCode: 'const button = document.querySelector("#submit-btn");\n\nbutton.addEventListener("click", function(event) {\n  event.preventDefault();\n  const input = document.querySelector("#name-input");\n  const name = input.value;\n  if (name.length > 0) {\n    document.querySelector("#greeting").textContent = "Hello, " + name + "!";\n  }\n});',
    hints: ['Read each line carefully', 'addEventListener attaches a function to an event', 'event.preventDefault() stops the default browser behavior'],
    concepts: ['js-events', 'addEventListener', 'event-handling'],
    solution: '',
    validation: { type: 'output', expected: [] },
    questions: [
      {
        question: 'What event is being listened for?',
        options: ['submit', 'click', 'keydown', 'load'],
        answer: 1,
        explanation: 'The addEventListener is called with "click" as the first argument, so it listens for click events on the button.',
      },
      {
        question: 'What does event.preventDefault() do?',
        options: ['Stops the event from firing', 'Prevents the default browser behavior (like form submission)', 'Removes the event listener', 'Prevents other click handlers from running'],
        answer: 1,
        explanation: 'event.preventDefault() stops the browser\'s default action for that event — for example, preventing a form from submitting and reloading the page.',
      },
      {
        question: 'What happens if the name input is empty?',
        options: ['An error is thrown', 'The greeting says "Hello, !"', 'Nothing happens — the if condition fails', 'The page reloads'],
        answer: 2,
        explanation: 'The code checks if (name.length > 0). If the input is empty, name.length is 0, so the condition is false and the greeting is not updated.',
      },
    ],
  },
  {
    id: 'w3_l10', worldId: 'world3', order: 10, title: 'Prompting for JavaScript',
    description: 'Describe interactive behavior so Claude Code builds it.',
    type: 'prompt', xpReward: 100, language: 'javascript',
    instruction: `You want Claude Code to create a **toggle button** that:
- Shows/hides a paragraph of text when clicked
- Changes the button text between "Show" and "Hide"
- Uses vanilla JavaScript (no frameworks)

Write a clear, specific prompt describing this interactive feature.`,
    starterCode: '',
    hints: [
      'Mention the toggle behavior: click to show/hide',
      'Specify the button text changes: "Show" ↔ "Hide"',
      'Mention vanilla JavaScript, addEventListener, display property',
    ],
    concepts: ['prompt-engineering', 'js-events', 'js-dom'],
    solution: '',
    rubric: {
      requiredConcepts: [
        { terms: ['toggle', 'show', 'hide', 'show/hide'], label: 'Toggle behavior', weight: 2 },
        { terms: ['button', 'click'], label: 'Button click', weight: 2 },
        { terms: ['text', 'paragraph', 'content'], label: 'Content to toggle', weight: 1 },
        { terms: ['javascript', 'js', 'vanilla'], label: 'Vanilla JavaScript', weight: 1 },
      ],
      specificityMarkers: [
        { terms: ['display', 'none', 'block', 'visibility'], weight: 2 },
        { terms: ['addeventlistener', 'onclick', 'event'], weight: 1 },
        { terms: ['textcontent', 'innertext', 'button text'], weight: 1 },
      ],
      minLength: 40,
    },
    simulatedResponses: {
      low: '<button onclick="toggle()">Toggle</button>\n<p id="text">Hello</p>\n<script>\nfunction toggle() { document.getElementById("text").hidden = !document.getElementById("text").hidden; }\n</script>',
      medium: '<button id="toggleBtn">Show</button>\n<p id="content" style="display:none;">This is the hidden content that appears when you click the button.</p>\n<script>\nconst btn = document.getElementById("toggleBtn");\nconst content = document.getElementById("content");\nbtn.addEventListener("click", () => {\n  if (content.style.display === "none") {\n    content.style.display = "block";\n    btn.textContent = "Hide";\n  } else {\n    content.style.display = "none";\n    btn.textContent = "Show";\n  }\n});\n</script>',
      high: '<!DOCTYPE html>\n<html>\n<head>\n<style>\n  .content { display: none; padding: 16px; background: #f0f0f0; border-radius: 8px; margin-top: 8px; }\n  .content.visible { display: block; }\n  .toggle-btn { padding: 10px 20px; background: #7dd3fc; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }\n  .toggle-btn:hover { background: #38bdf8; }\n</style>\n</head>\n<body>\n<button class="toggle-btn" id="toggleBtn">Show</button>\n<div class="content" id="content">\n  <p>This is the toggleable content. Click the button above to show or hide this paragraph.</p>\n</div>\n<script>\n  const btn = document.getElementById("toggleBtn");\n  const content = document.getElementById("content");\n  btn.addEventListener("click", () => {\n    const isVisible = content.classList.toggle("visible");\n    btn.textContent = isVisible ? "Hide" : "Show";\n  });\n</script>\n</body>\n</html>',
    },
    validation: { type: 'output', expected: [] },
  },
  {
    id: 'w3_l11', worldId: 'world3', order: 11, title: 'Building a Calculator',
    description: 'Build a simple calculator function with JavaScript.',
    type: 'concept', xpReward: 200, language: 'javascript',
    instruction: `Let's build a simple calculator function!

**Your task:** Write a function called \`calculate\` that:
- Takes three parameters: \`a\` (number), \`operator\` (string), \`b\` (number)
- Supports operators: "+", "-", "*", "/"
- Returns the result
- For division by zero, return "Error"

Then test it by logging:
\`\`\`
calculate(10, "+", 5) → 15
calculate(10, "-", 3) → 7
calculate(10, "*", 4) → 40
calculate(10, "/", 0) → Error
\`\`\``,
    starterCode: '// Build the calculate function\n\n// Test it:\n// console.log(calculate(10, "+", 5));\n// console.log(calculate(10, "-", 3));\n// console.log(calculate(10, "*", 4));\n// console.log(calculate(10, "/", 0));\n',
    hints: [
      'Use if/else or switch to check the operator',
      'For division, check if b === 0 first',
      'function calculate(a, op, b) {\n  if (op === "+") return a + b;\n  if (op === "-") return a - b;\n  if (op === "*") return a * b;\n  if (op === "/") return b === 0 ? "Error" : a / b;\n}\nconsole.log(calculate(10, "+", 5));\nconsole.log(calculate(10, "-", 3));\nconsole.log(calculate(10, "*", 4));\nconsole.log(calculate(10, "/", 0));',
    ],
    concepts: ['js-functions', 'js-conditionals', 'js-operators'],
    solution: 'function calculate(a, op, b) {\n  if (op === "+") return a + b;\n  if (op === "-") return a - b;\n  if (op === "*") return a * b;\n  if (op === "/") return b === 0 ? "Error" : a / b;\n}\nconsole.log(calculate(10, "+", 5));\nconsole.log(calculate(10, "-", 3));\nconsole.log(calculate(10, "*", 4));\nconsole.log(calculate(10, "/", 0));',
    validation: { type: 'output', expected: ['15', '7', '40', 'Error'] },
  },
  {
    id: 'w3_l12', worldId: 'world3', order: 12, title: 'Debugging JavaScript',
    description: 'Find and fix bugs in broken JavaScript code.',
    type: 'debug', xpReward: 130, language: 'javascript',
    instruction: `This function is supposed to find the largest number in an array, but it has bugs. Fix them!

Expected behavior:
- \`findMax([3, 7, 2, 9, 1])\` should return 9
- The function should log: \`Max: 9\``,
    starterCode: 'function findMax(arr) {\n  let max = 0; // BUG: should start with first element\n  for (let i = 0; i <= arr.length; i++) { // BUG: off by one\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max\n}\n\nconsole.log("Max: " + findMax([3, 7, 2, 9, 1]));',
    hints: [
      'Initialize max to arr[0] instead of 0 (what if all numbers are negative?)',
      'The loop goes one past the end: use i < arr.length, not i <= arr.length',
      'function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}\nconsole.log("Max: " + findMax([3, 7, 2, 9, 1]));',
    ],
    concepts: ['js-debugging', 'js-loops', 'js-arrays'],
    solution: 'function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}\nconsole.log("Max: " + findMax([3, 7, 2, 9, 1]));',
    validation: { type: 'output', expected: ['Max: 9'] },
  },
  {
    id: 'w3_boss', worldId: 'world3', order: 13, title: 'JavaScript Gauntlet',
    description: 'Prove your JavaScript mastery across four challenges.',
    type: 'boss', xpReward: 600, language: 'javascript',
    instruction: 'The JavaScript Gauntlet tests you across four phases of increasing difficulty.',
    starterCode: '', hints: [], concepts: ['js-functions', 'js-arrays', 'js-conditionals', 'js-loops'],
    solution: '',
    validation: { type: 'output', expected: [] },
    phases: [
      {
        type: 'concept', title: 'Phase 1: FizzBuzz', xpReward: 100, language: 'javascript',
        instruction: 'Write a loop from 1 to 15. For multiples of 3 print "Fizz", multiples of 5 print "Buzz", both print "FizzBuzz", otherwise the number.',
        starterCode: '// FizzBuzz 1-15\n',
        hints: ['Check divisible by 15 first (both 3 and 5)', 'Use % operator for remainder'],
        concepts: ['js-loops', 'js-conditionals'],
        solution: 'for(let i=1;i<=15;i++){if(i%15===0)console.log("FizzBuzz");else if(i%3===0)console.log("Fizz");else if(i%5===0)console.log("Buzz");else console.log(i);}',
        validation: { type: 'output', expected: ['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz'] },
      },
      {
        type: 'concept', title: 'Phase 2: Array Transform', xpReward: 100, language: 'javascript',
        instruction: 'Given the array [1,2,3,4,5], use .map() to double each value, then .filter() to keep only values > 4. Log the result joined by commas.\n\nExpected: 6,8,10',
        starterCode: 'const nums = [1,2,3,4,5];\n',
        hints: ['nums.map(n => n * 2)', '.filter(n => n > 4)'],
        concepts: ['js-arrays', 'js-map', 'js-filter'],
        solution: 'const nums = [1,2,3,4,5];\nconsole.log(nums.map(n=>n*2).filter(n=>n>4).join(","));',
        validation: { type: 'output', expected: ['6,8,10'] },
      },
      {
        type: 'concept', title: 'Phase 3: Object Challenge', xpReward: 100, language: 'javascript',
        instruction: 'Create an array of 3 objects, each with name and score. Write a function that returns the name of the person with the highest score. Log: "Winner: [name]"\n\nUse these people: Alice (85), Bob (92), Charlie (78)',
        starterCode: '// Find the winner\n',
        hints: ['Create array: [{name:"Alice",score:85}, ...]', 'Use reduce or loop to find max'],
        concepts: ['js-objects', 'js-arrays', 'js-functions'],
        solution: 'const people = [{name:"Alice",score:85},{name:"Bob",score:92},{name:"Charlie",score:78}];\nconst winner = people.reduce((best,p) => p.score > best.score ? p : best);\nconsole.log("Winner: " + winner.name);',
        validation: { type: 'output', expected: ['Winner: Bob'] },
      },
      {
        type: 'debug', title: 'Phase 4: Fix the Sort', xpReward: 100, language: 'javascript',
        instruction: 'This code should sort numbers from smallest to largest and log them. Fix the bugs!\n\nExpected: 1,3,5,8,9',
        starterCode: 'const nums = [5, 3, 8, 1, 9];\nnums.sort(); // BUG: default sort is alphabetical!\nconsole.log(nums.join(","));',
        hints: ['Default .sort() treats elements as strings', 'Use .sort((a, b) => a - b) for numeric sort'],
        concepts: ['js-debugging', 'js-arrays'],
        solution: 'const nums = [5, 3, 8, 1, 9];\nnums.sort((a, b) => a - b);\nconsole.log(nums.join(","));',
        validation: { type: 'output', expected: ['1,3,5,8,9'] },
      },
    ],
  },
];
