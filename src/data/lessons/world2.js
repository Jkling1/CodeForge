// World 2: First Builds — HTML & CSS
export const world2Lessons = [
  {
    id: 'w2_l1', worldId: 'world2', order: 1, title: 'What Is HTML',
    description: 'Learn the skeleton of the web — HTML tags and structure.',
    type: 'concept', xpReward: 50, language: 'html',
    instruction: `HTML (HyperText Markup Language) is the foundation of every webpage. It uses **tags** to define structure: headings, paragraphs, links, images, and more.

Every HTML document has this basic structure:
\`\`\`html
<html>
  <head><title>Page Title</title></head>
  <body>
    <!-- Content goes here -->
  </body>
</html>
\`\`\`

**Your task:** Write a complete HTML page with:
- An \`<html>\` tag wrapping everything
- A \`<head>\` with a \`<title>\`
- A \`<body>\` containing an \`<h1>\` heading and a \`<p>\` paragraph`,
    starterCode: '<!-- Write your HTML here -->\n',
    hints: [
      'Start with <html> and close it with </html>',
      'Inside <html>, add <head> with <title>, then <body>',
      '<html><head><title>My Page</title></head><body><h1>Hello</h1><p>Welcome</p></body></html>',
    ],
    concepts: ['html-structure', 'html-tags'],
    solution: '<html>\n<head><title>My Page</title></head>\n<body>\n<h1>Hello World</h1>\n<p>Welcome to my first page.</p>\n</body>\n</html>',
    validation: {
      type: 'html',
      checks: [
        { type: 'contains', value: '<html>', label: 'Has <html> tag' },
        { type: 'contains', value: '<head>', label: 'Has <head> tag' },
        { type: 'contains', value: '<title>', label: 'Has <title> tag' },
        { type: 'contains', value: '<body>', label: 'Has <body> tag' },
        { type: 'contains', value: '<h1>', label: 'Has <h1> heading' },
        { type: 'contains', value: '<p>', label: 'Has <p> paragraph' },
      ],
    },
  },
  {
    id: 'w2_l2', worldId: 'world2', order: 2, title: 'Essential HTML Tags',
    description: 'Headings, links, images, and lists — the building blocks.',
    type: 'concept', xpReward: 75, language: 'html',
    instruction: `HTML has many tags for different content types:
- \`<h1>\` to \`<h6>\` — headings (h1 is largest)
- \`<a href="url">\` — links
- \`<img src="url" alt="description">\` — images
- \`<ul>\` and \`<ol>\` — unordered and ordered lists
- \`<li>\` — list items

**Your task:** Create HTML with:
- An \`<h2>\` heading
- A link using \`<a>\` with an href attribute
- An unordered list (\`<ul>\`) with at least 3 \`<li>\` items`,
    starterCode: '<!-- Create heading, link, and list -->\n',
    hints: [
      'Use <h2>Your Title</h2> for the heading',
      'Links look like <a href="https://example.com">Click me</a>',
      'Lists: <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>',
    ],
    concepts: ['html-tags', 'html-links', 'html-lists'],
    solution: '<h2>My Favorite Things</h2>\n<a href="https://example.com">Visit Example</a>\n<ul>\n<li>Coding</li>\n<li>Music</li>\n<li>Coffee</li>\n</ul>',
    validation: {
      type: 'html',
      checks: [
        { type: 'contains', value: '<h2>', label: 'Has <h2> heading' },
        { type: 'regex', value: '<a\\s+href=', label: 'Has link with href' },
        { type: 'contains', value: '<ul>', label: 'Has unordered list' },
        { type: 'count', value: '<li>', label: 'Has at least 3 list items', min: 3 },
      ],
    },
  },
  {
    id: 'w2_l3', worldId: 'world2', order: 3, title: 'HTML Forms',
    description: 'Inputs, buttons, and form structure.',
    type: 'concept', xpReward: 75, language: 'html',
    instruction: `Forms let users input data. Key elements:
- \`<form>\` — wraps the form
- \`<input type="text">\` — text input
- \`<input type="email">\` — email input
- \`<textarea>\` — multi-line text
- \`<button>\` — clickable button
- \`<label>\` — labels for inputs

**Your task:** Create a form with:
- A \`<form>\` wrapper
- At least one \`<input>\` element
- A \`<button>\` element
- A \`<label>\` element`,
    starterCode: '<!-- Build a form -->\n',
    hints: [
      'Start with <form> and </form>',
      'Add <input type="text"> inside the form',
      '<form><label>Name:</label><input type="text"><button>Submit</button></form>',
    ],
    concepts: ['html-forms', 'html-inputs'],
    solution: '<form>\n<label>Name:</label>\n<input type="text" placeholder="Enter name">\n<button>Submit</button>\n</form>',
    validation: {
      type: 'html',
      checks: [
        { type: 'contains', value: '<form>', label: 'Has <form> element' },
        { type: 'contains', value: '<input', label: 'Has <input> element' },
        { type: 'contains', value: '<button>', label: 'Has <button> element' },
        { type: 'contains', value: '<label>', label: 'Has <label> element' },
      ],
    },
  },
  {
    id: 'w2_l4', worldId: 'world2', order: 4, title: 'What Is CSS',
    description: 'Selectors, properties, and values — making things beautiful.',
    type: 'concept', xpReward: 50, language: 'css',
    instruction: `CSS (Cascading Style Sheets) controls how HTML looks. It uses **selectors** to target elements, and **properties** to change their appearance.

Basic syntax:
\`\`\`css
selector {
  property: value;
}
\`\`\`

Common properties: \`color\`, \`background-color\`, \`font-size\`, \`margin\`, \`padding\`, \`border\`.

**Your task:** Write CSS that includes:
- A rule setting \`color\` on some element
- A rule setting \`background-color\`
- A rule setting \`font-size\``,
    starterCode: '/* Write your CSS rules here */\n',
    hints: [
      'Example: h1 { color: blue; }',
      'Try: body { background-color: #333; }',
      'h1 { color: blue; }\nbody { background-color: #f0f0f0; font-size: 16px; }',
    ],
    concepts: ['css-basics', 'css-selectors'],
    solution: 'h1 {\n  color: blue;\n}\nbody {\n  background-color: #f0f0f0;\n  font-size: 16px;\n}',
    validation: {
      type: 'html',
      checks: [
        { type: 'contains', value: 'color', label: 'Uses color property' },
        { type: 'contains', value: 'background', label: 'Uses background property' },
        { type: 'contains', value: 'font-size', label: 'Uses font-size property' },
      ],
    },
  },
  {
    id: 'w2_l5', worldId: 'world2', order: 5, title: 'CSS Layout Basics',
    description: 'Flexbox — the modern way to arrange elements.',
    type: 'concept', xpReward: 100, language: 'css',
    instruction: `Flexbox is the most important CSS layout tool. Apply \`display: flex\` to a container, and its children become flex items.

Key properties:
- \`display: flex\` — enables flexbox
- \`justify-content\` — horizontal alignment (center, space-between, etc.)
- \`align-items\` — vertical alignment
- \`gap\` — spacing between items
- \`flex-direction\` — row or column

**Your task:** Write CSS that:
- Uses \`display: flex\`
- Uses \`justify-content\`
- Uses \`align-items\``,
    starterCode: '/* Create a flexbox layout */\n.container {\n  \n}\n',
    hints: [
      'Add display: flex; to .container',
      'Try justify-content: center; and align-items: center;',
      '.container { display: flex; justify-content: center; align-items: center; gap: 16px; }',
    ],
    concepts: ['css-flexbox', 'css-layout'],
    solution: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n}',
    validation: {
      type: 'html',
      checks: [
        { type: 'regex', value: 'display:\\s*flex', label: 'Uses display: flex' },
        { type: 'contains', value: 'justify-content', label: 'Uses justify-content' },
        { type: 'contains', value: 'align-items', label: 'Uses align-items' },
      ],
    },
  },
  {
    id: 'w2_l6', worldId: 'world2', order: 6, title: 'CSS Grid',
    description: 'Two-dimensional layouts with CSS Grid.',
    type: 'concept', xpReward: 100, language: 'css',
    instruction: `CSS Grid gives you control over rows AND columns. Use \`display: grid\` on a container.

Key properties:
- \`display: grid\`
- \`grid-template-columns\` — define column widths
- \`grid-template-rows\` — define row heights
- \`gap\` — spacing between cells

Example: \`grid-template-columns: 1fr 1fr 1fr;\` creates 3 equal columns.

**Your task:** Write CSS that:
- Uses \`display: grid\`
- Defines \`grid-template-columns\`
- Uses \`gap\``,
    starterCode: '/* Create a grid layout */\n.grid {\n  \n}\n',
    hints: [
      'Start with display: grid;',
      'Add grid-template-columns: 1fr 1fr 1fr;',
      '.grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }',
    ],
    concepts: ['css-grid', 'css-layout'],
    solution: '.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}',
    validation: {
      type: 'html',
      checks: [
        { type: 'regex', value: 'display:\\s*grid', label: 'Uses display: grid' },
        { type: 'contains', value: 'grid-template-columns', label: 'Defines columns' },
        { type: 'contains', value: 'gap', label: 'Uses gap' },
      ],
    },
  },
  {
    id: 'w2_l7', worldId: 'world2', order: 7, title: 'Responsive Design',
    description: 'Making pages work on any screen size.',
    type: 'concept', xpReward: 100, language: 'css',
    instruction: `Responsive design means your page looks good on phones, tablets, and desktops. The key tool is the **media query**:

\`\`\`css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
\`\`\`

This changes the layout when the screen is 768px or narrower.

**Your task:** Write CSS that includes:
- A \`@media\` query
- At least one style change inside the media query`,
    starterCode: '/* Make it responsive */\n.nav {\n  display: flex;\n  gap: 16px;\n}\n\n/* Add a media query below */\n',
    hints: [
      'Use @media (max-width: 768px) { }',
      'Inside, change .nav to flex-direction: column;',
      '.nav { display: flex; gap: 16px; }\n@media (max-width: 768px) { .nav { flex-direction: column; } }',
    ],
    concepts: ['css-responsive', 'media-queries'],
    solution: '.nav {\n  display: flex;\n  gap: 16px;\n}\n@media (max-width: 768px) {\n  .nav {\n    flex-direction: column;\n  }\n}',
    validation: {
      type: 'html',
      checks: [
        { type: 'contains', value: '@media', label: 'Has media query' },
        { type: 'regex', value: 'max-width|min-width', label: 'Uses width breakpoint' },
      ],
    },
  },
  {
    id: 'w2_l8', worldId: 'world2', order: 8, title: 'Prompting for HTML/CSS',
    description: 'Learn to describe a layout so Claude Code builds it right.',
    type: 'prompt', xpReward: 100, language: 'html',
    instruction: `You want Claude Code to build a **navigation bar** with:
- A logo/site name on the left
- Three navigation links on the right
- Horizontal layout using flexbox
- A dark background with light text

Write a prompt to Claude Code that clearly describes this navigation bar. Be specific about the layout, colors, and structure.`,
    starterCode: '',
    hints: [
      'Mention the specific elements: logo, links, flexbox layout',
      'Include color details: dark background, light text, specific colors if possible',
      'Describe the layout: logo on left, links on right, using space-between',
    ],
    concepts: ['prompt-engineering', 'html-structure', 'css-flexbox'],
    solution: '',
    rubric: {
      requiredConcepts: [
        { terms: ['nav', 'navigation', 'navbar'], label: 'Navigation element', weight: 2 },
        { terms: ['logo', 'site name', 'brand'], label: 'Logo/brand element', weight: 1 },
        { terms: ['link', 'links', 'anchor', 'menu item'], label: 'Navigation links', weight: 2 },
        { terms: ['flex', 'flexbox', 'horizontal'], label: 'Flexbox layout', weight: 2 },
        { terms: ['dark', 'background', 'color'], label: 'Color specification', weight: 1 },
      ],
      specificityMarkers: [
        { terms: ['space-between', 'justify', 'left', 'right'], weight: 2 },
        { terms: ['padding', 'px', 'rem', 'height'], weight: 1 },
        { terms: ['hover', 'responsive', 'mobile'], weight: 1 },
      ],
      minLength: 50,
    },
    simulatedResponses: {
      low: '<nav>\n  <a href="#">Link 1</a>\n  <a href="#">Link 2</a>\n</nav>',
      medium: '<nav style="display:flex; justify-content:space-between; background:#333; padding:16px;">\n  <div class="logo">MySite</div>\n  <div class="links">\n    <a href="#">Home</a>\n    <a href="#">About</a>\n    <a href="#">Contact</a>\n  </div>\n</nav>',
      high: '<nav style="display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:12px 24px;">\n  <div style="font-size:1.25rem; font-weight:bold; color:#7dd3fc;">MySite</div>\n  <div style="display:flex; gap:24px;">\n    <a href="#" style="color:#f1f5f9; text-decoration:none;">Home</a>\n    <a href="#" style="color:#f1f5f9; text-decoration:none;">About</a>\n    <a href="#" style="color:#f1f5f9; text-decoration:none;">Contact</a>\n  </div>\n</nav>',
    },
    validation: { type: 'output', expected: [] },
  },
  {
    id: 'w2_l9', worldId: 'world2', order: 9, title: 'Building a Landing Page',
    description: 'Prompt Claude Code to build a complete landing page.',
    type: 'prompt', xpReward: 120, language: 'html',
    instruction: `Now let's think bigger. You want Claude Code to build a **landing page** with:
- A hero section with a large heading, subtitle, and call-to-action button
- A features section with 3 feature cards in a row
- A footer with copyright text

Write a detailed prompt that describes the full page layout, structure, and styling.`,
    starterCode: '',
    hints: [
      'Describe each section separately: hero, features, footer',
      'Mention specific elements: heading, paragraph, button, cards',
      'Include layout details: centered content, grid/flex for cards, responsive',
    ],
    concepts: ['prompt-engineering', 'html-structure', 'css-layout'],
    solution: '',
    rubric: {
      requiredConcepts: [
        { terms: ['hero', 'header', 'banner'], label: 'Hero section', weight: 2 },
        { terms: ['heading', 'title', 'h1'], label: 'Main heading', weight: 1 },
        { terms: ['button', 'cta', 'call to action'], label: 'Call to action', weight: 2 },
        { terms: ['feature', 'card', 'section'], label: 'Features section', weight: 2 },
        { terms: ['footer', 'copyright', 'bottom'], label: 'Footer', weight: 1 },
        { terms: ['three', '3', 'grid', 'row'], label: 'Three cards layout', weight: 1 },
      ],
      specificityMarkers: [
        { terms: ['centered', 'center', 'max-width'], weight: 1 },
        { terms: ['responsive', 'mobile', 'media query'], weight: 2 },
        { terms: ['color', 'background', 'gradient'], weight: 1 },
        { terms: ['padding', 'margin', 'spacing'], weight: 1 },
      ],
      minLength: 80,
    },
    simulatedResponses: {
      low: '<div>\n  <h1>Welcome</h1>\n  <button>Click</button>\n  <div>Feature 1</div>\n  <div>Feature 2</div>\n  <footer>Copyright</footer>\n</div>',
      medium: '<header style="text-align:center; padding:60px 20px;">\n  <h1>Welcome to Our Product</h1>\n  <p>The best solution for your needs</p>\n  <button style="padding:12px 24px; background:#7dd3fc; border:none; border-radius:8px;">Get Started</button>\n</header>\n<section style="display:flex; gap:20px; padding:40px;">\n  <div style="flex:1; padding:20px; background:#f5f5f5; border-radius:8px;"><h3>Feature 1</h3><p>Description</p></div>\n  <div style="flex:1; padding:20px; background:#f5f5f5; border-radius:8px;"><h3>Feature 2</h3><p>Description</p></div>\n  <div style="flex:1; padding:20px; background:#f5f5f5; border-radius:8px;"><h3>Feature 3</h3><p>Description</p></div>\n</section>\n<footer style="text-align:center; padding:20px;">© 2025</footer>',
      high: '<!-- Hero Section -->\n<header style="text-align:center; padding:80px 20px; background:linear-gradient(135deg, #0f172a, #1e293b); color:#f1f5f9;">\n  <h1 style="font-size:3rem; margin-bottom:16px;">Build Amazing Products</h1>\n  <p style="font-size:1.25rem; color:#94a3b8; max-width:600px; margin:0 auto 32px;">The modern toolkit for developers who want to ship faster and build better.</p>\n  <button style="padding:14px 32px; background:#7dd3fc; color:#0f172a; border:none; border-radius:8px; font-size:1rem; font-weight:bold; cursor:pointer;">Get Started Free →</button>\n</header>\n\n<!-- Features Section -->\n<section style="display:grid; grid-template-columns:repeat(3,1fr); gap:24px; padding:60px 40px; max-width:1100px; margin:0 auto;">\n  <div style="padding:24px; background:#1e293b; border-radius:12px; border:1px solid #334155;">\n    <h3 style="color:#7dd3fc;">⚡ Fast</h3>\n    <p style="color:#94a3b8;">Lightning-fast performance out of the box.</p>\n  </div>\n  <div style="padding:24px; background:#1e293b; border-radius:12px; border:1px solid #334155;">\n    <h3 style="color:#4ade80;">🔒 Secure</h3>\n    <p style="color:#94a3b8;">Enterprise-grade security built in.</p>\n  </div>\n  <div style="padding:24px; background:#1e293b; border-radius:12px; border:1px solid #334155;">\n    <h3 style="color:#fbbf24;">📦 Simple</h3>\n    <p style="color:#94a3b8;">Get started in minutes, not hours.</p>\n  </div>\n</section>\n\n<!-- Footer -->\n<footer style="text-align:center; padding:24px; border-top:1px solid #334155; color:#64748b;">\n  © 2025 ProductName. All rights reserved.\n</footer>',
    },
    validation: { type: 'output', expected: [] },
  },
  {
    id: 'w2_l10', worldId: 'world2', order: 10, title: 'CSS Animations',
    description: 'Hover effects, transitions, and keyframe animations.',
    type: 'concept', xpReward: 75, language: 'css',
    instruction: `CSS can animate elements with **transitions** and **keyframes**.

Transitions: smooth changes on hover or state change.
\`\`\`css
.button { transition: background-color 0.3s ease; }
.button:hover { background-color: blue; }
\`\`\`

Keyframes: custom multi-step animations.
\`\`\`css
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.icon { animation: spin 2s linear infinite; }
\`\`\`

**Your task:** Write CSS that includes:
- A \`transition\` property
- Either a \`:hover\` rule or an \`@keyframes\` animation`,
    starterCode: '/* Add animations */\n',
    hints: [
      'Use transition: all 0.3s ease; on an element',
      'Add a :hover rule that changes a property',
      '.button { transition: all 0.3s ease; }\n.button:hover { transform: scale(1.1); background-color: #7dd3fc; }',
    ],
    concepts: ['css-animations', 'css-transitions'],
    solution: '.button {\n  transition: all 0.3s ease;\n  background: #334155;\n  padding: 12px 24px;\n}\n.button:hover {\n  transform: scale(1.05);\n  background: #7dd3fc;\n}',
    validation: {
      type: 'html',
      checks: [
        { type: 'contains', value: 'transition', label: 'Uses transition' },
        { type: 'regex', value: ':hover|@keyframes|animation', label: 'Has hover or animation' },
      ],
    },
  },
  {
    id: 'w2_l11', worldId: 'world2', order: 11, title: 'Debugging HTML/CSS',
    description: 'Find and fix bugs in broken HTML and CSS.',
    type: 'debug', xpReward: 100, language: 'css',
    instruction: `This CSS layout is supposed to create a centered card with a title and text, but it's broken. The issues:
- The card should be centered on the page (it's not)
- The flexbox direction should be column (items stacked vertically)
- The text color should be readable (currently same as background)

Find and fix all the bugs!`,
    starterCode: '.page {\n  display: flex;\n  justify-content: flex-start; /* BUG: should center */\n  align-items: flex-start; /* BUG: should center */\n  min-height: 100vh;\n}\n.card {\n  display: flex;\n  flex-direction: row; /* BUG: should be column */\n  background: #1e293b;\n  color: #1e293b; /* BUG: same as background! */\n  padding: 24px;\n  border-radius: 12px;\n}',
    hints: [
      'Look at justify-content and align-items — they should center the card',
      'flex-direction should be column to stack items vertically',
      'The color is the same as background — change it to something readable',
    ],
    concepts: ['css-debugging', 'css-flexbox'],
    solution: '.page {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}\n.card {\n  display: flex;\n  flex-direction: column;\n  background: #1e293b;\n  color: #f1f5f9;\n  padding: 24px;\n  border-radius: 12px;\n}',
    validation: {
      type: 'html',
      checks: [
        { type: 'regex', value: 'justify-content:\\s*center', label: 'Centers horizontally' },
        { type: 'regex', value: 'align-items:\\s*center', label: 'Centers vertically' },
        { type: 'regex', value: 'flex-direction:\\s*column', label: 'Uses column direction' },
        { type: 'regex', value: 'color:\\s*(?!#1e293b)', label: 'Text color is readable' },
      ],
    },
  },
  {
    id: 'w2_l12', worldId: 'world2', order: 12, title: 'Multi-Page Structure',
    description: 'Prompt Claude Code to build a multi-page site structure.',
    type: 'prompt', xpReward: 100, language: 'html',
    instruction: `You want Claude Code to create HTML for a **3-page website** structure:
- Home page with a welcome message
- About page with a bio
- Contact page with a form

All pages should share the same navigation bar with links to each page.

Write a prompt that describes this multi-page structure clearly, including the navigation that appears on every page.`,
    starterCode: '',
    hints: [
      'Mention all three pages: Home, About, Contact',
      'Describe the shared navigation bar with links',
      'Be specific about what content goes on each page',
    ],
    concepts: ['prompt-engineering', 'html-structure', 'site-structure'],
    solution: '',
    rubric: {
      requiredConcepts: [
        { terms: ['home', 'index', 'main page'], label: 'Home page', weight: 1 },
        { terms: ['about', 'bio', 'information'], label: 'About page', weight: 1 },
        { terms: ['contact', 'form', 'email'], label: 'Contact page', weight: 1 },
        { terms: ['nav', 'navigation', 'menu', 'links'], label: 'Navigation', weight: 2 },
        { terms: ['shared', 'every page', 'all pages', 'consistent'], label: 'Shared navigation', weight: 2 },
      ],
      specificityMarkers: [
        { terms: ['<a', 'href', 'link to'], weight: 1 },
        { terms: ['form', 'input', 'button'], weight: 1 },
        { terms: ['header', 'footer', 'section'], weight: 1 },
      ],
      minLength: 60,
    },
    simulatedResponses: {
      low: '<nav><a>Home</a><a>About</a></nav>\n<h1>Welcome</h1>',
      medium: '<!-- Home Page -->\n<nav>\n  <a href="index.html">Home</a>\n  <a href="about.html">About</a>\n  <a href="contact.html">Contact</a>\n</nav>\n<h1>Welcome to My Site</h1>\n<p>This is the home page.</p>',
      high: '<!-- Shared Navigation (appears on all pages) -->\n<nav style="display:flex; gap:24px; padding:16px; background:#1e293b;">\n  <a href="index.html" style="color:#7dd3fc;">Home</a>\n  <a href="about.html" style="color:#94a3b8;">About</a>\n  <a href="contact.html" style="color:#94a3b8;">Contact</a>\n</nav>\n\n<!-- HOME PAGE (index.html) -->\n<main style="padding:40px;">\n  <h1>Welcome to My Website</h1>\n  <p>Explore our pages using the navigation above.</p>\n</main>\n\n<!-- ABOUT PAGE (about.html) -->\n<!-- Same nav as above -->\n<main style="padding:40px;">\n  <h1>About Me</h1>\n  <p>I am a web developer learning to build with Claude Code.</p>\n</main>\n\n<!-- CONTACT PAGE (contact.html) -->\n<!-- Same nav as above -->\n<main style="padding:40px;">\n  <h1>Contact</h1>\n  <form>\n    <label>Name: <input type="text"></label><br>\n    <label>Email: <input type="email"></label><br>\n    <label>Message: <textarea></textarea></label><br>\n    <button type="submit">Send</button>\n  </form>\n</main>',
    },
    validation: { type: 'output', expected: [] },
  },
  {
    id: 'w2_boss', worldId: 'world2', order: 13, title: 'First Build Boss',
    description: 'Build a complete styled webpage — combining everything from World 2.',
    type: 'boss', xpReward: 500, language: 'html',
    instruction: 'The First Build Boss challenges you across three phases: write HTML structure, fix broken CSS, and prompt for a responsive layout.',
    starterCode: '', hints: [], concepts: ['html-structure', 'css-layout', 'css-debugging', 'prompt-engineering'],
    solution: '',
    validation: { type: 'output', expected: [] },
    phases: [
      {
        type: 'concept', title: 'Phase 1: HTML Structure', xpReward: 100, language: 'html',
        instruction: 'Write an HTML page with a header containing a site title, a main section with an h2 and two paragraphs, and a footer with copyright text.',
        starterCode: '<!-- Build the page structure -->\n',
        hints: ['Use <header>, <main>, and <footer> semantic tags'],
        concepts: ['html-structure'],
        solution: '<header><h1>My Site</h1></header>\n<main><h2>Welcome</h2><p>First paragraph.</p><p>Second paragraph.</p></main>\n<footer>© 2025</footer>',
        validation: { type: 'html', checks: [
          { type: 'contains', value: '<header>', label: 'Has header' },
          { type: 'contains', value: '<main>', label: 'Has main' },
          { type: 'contains', value: '<footer>', label: 'Has footer' },
          { type: 'contains', value: '<h2>', label: 'Has h2' },
          { type: 'count', value: '<p>', label: 'Has 2+ paragraphs', min: 2 },
        ]},
      },
      {
        type: 'debug', title: 'Phase 2: Fix the CSS', xpReward: 100, language: 'css',
        instruction: 'This CSS should create a centered page with a max-width, but has bugs. Fix them!',
        starterCode: '.page {\n  max-width: 800;\n  margin: 0;\n  padding: 20px;\n  font-family: sans;\n}',
        hints: ['max-width needs a unit (px)', 'margin: 0 auto; centers the page'],
        concepts: ['css-debugging'],
        solution: '.page {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n  font-family: sans-serif;\n}',
        validation: { type: 'html', checks: [
          { type: 'regex', value: 'max-width:\\s*800px', label: 'max-width has px unit' },
          { type: 'regex', value: 'margin:\\s*0\\s+auto', label: 'Uses margin auto for centering' },
        ]},
      },
      {
        type: 'prompt', title: 'Phase 3: Prompt for Responsive Layout', xpReward: 100, language: 'html',
        instruction: 'Write a prompt asking Claude Code to create a responsive two-column layout that stacks to one column on mobile. Include a sidebar and main content area.',
        starterCode: '',
        hints: ['Mention grid or flexbox, sidebar, main content, and mobile stacking'],
        concepts: ['prompt-engineering', 'css-responsive'],
        solution: '',
        rubric: {
          requiredConcepts: [
            { terms: ['two column', '2 column', 'sidebar', 'two-column'], label: 'Two-column layout', weight: 2 },
            { terms: ['responsive', 'mobile', 'stack'], label: 'Responsive behavior', weight: 2 },
            { terms: ['grid', 'flex', 'layout'], label: 'Layout method', weight: 1 },
          ],
          specificityMarkers: [
            { terms: ['media query', 'breakpoint', '768px'], weight: 2 },
            { terms: ['main content', 'sidebar'], weight: 1 },
          ],
          minLength: 40,
        },
        simulatedResponses: {
          low: '<div style="display:flex"><aside>Sidebar</aside><main>Content</main></div>',
          medium: '<div style="display:grid; grid-template-columns:250px 1fr; gap:20px;">\n  <aside>Sidebar</aside>\n  <main>Main content</main>\n</div>',
          high: '<style>\n.layout { display:grid; grid-template-columns:280px 1fr; gap:24px; padding:20px; }\n@media (max-width:768px) { .layout { grid-template-columns:1fr; } }\n</style>\n<div class="layout">\n  <aside style="background:#1e293b; padding:20px; border-radius:8px;">Sidebar</aside>\n  <main style="padding:20px;">Main content area</main>\n</div>',
        },
        validation: { type: 'output', expected: [] },
      },
    ],
  },
];
