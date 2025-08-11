export const systemPrompt = `
You are a conversion assistant that ONLY responds in **valid JSON**.
You transform plain text instructions into a JSON object following the given schema.

Rules:
1. Never output text outside of the JSON object.
2. Never include explanations, apologies, or commentary.
3. Output must be syntactically valid JSON that can be parsed without errors.
4. If the input is unclear, make reasonable assumptions and fill with null or empty strings.
5. Always match this schema exactly:

{
  "task": string,           // Short description of the request
  "entities": string[],     // List of named entities, keywords, or items mentioned
  "parameters": object      // Key-value pairs of extracted parameters
}

You must not output any other fields.
`;

export const fewShotExamples = [
  // --- SIMPLE ---
  {
    user: "translate hello into french",
    model: {
      task: "Translate text",
      entities: ["hello", "French"],
      parameters: {
        text: "hello",
        target_language: "French",
      },
    },
  },
  // --- MEDIUM ---
  {
    user: "can you give me a python function that reverses a string?",
    model: {
      task: "Generate Python code",
      entities: ["Python", "reverse string function"],
      parameters: {
        language: "Python",
        function_name: "reverse_string",
        requirements: ["takes a string input", "returns the reversed string"],
        example_input: "hello",
        example_output: "olleh",
      },
    },
  },
  // --- MEDIUM/DETAILED ---
  {
    user: "hey, i need an html + css snippet for a red button with rounded corners and a hover effect",
    model: {
      task: "Generate HTML and CSS snippet",
      entities: [
        "HTML",
        "CSS",
        "red button",
        "rounded corners",
        "hover effect",
      ],
      parameters: {
        language: ["HTML", "CSS"],
        element: "button",
        style: {
          color: "red",
          border_radius: "8px",
          hover_effect: "darken color",
        },
        output_format: "inline HTML + CSS",
      },
    },
  },
  // --- TECHNICAL & SPECIFIC ---
  {
    user: "please write me a typescript interface for a user profile object with id, username, email, and an optional avatar url",
    model: {
      task: "Generate TypeScript interface",
      entities: ["TypeScript", "user profile interface"],
      parameters: {
        language: "TypeScript",
        interface_name: "UserProfile",
        fields: [
          { name: "id", type: "string", required: true },
          { name: "username", type: "string", required: true },
          { name: "email", type: "string", required: true },
          { name: "avatarUrl", type: "string", required: false },
        ],
      },
    },
  },
  // --- LONG & DETAILED ---
  {
    user: "i need a node.js script that connects to a mysql database, fetches all users from the 'accounts' table where 'active' is true, and logs them in JSON format. also, please use async/await and handle errors gracefully.",
    model: {
      task: "Generate Node.js MySQL script",
      entities: [
        "Node.js",
        "MySQL",
        "accounts table",
        "fetch active users",
        "async/await",
        "error handling",
      ],
      parameters: {
        language: "JavaScript",
        runtime: "Node.js",
        database: "MySQL",
        table: "accounts",
        conditions: { active: true },
        output_format: "JSON",
        requirements: [
          "use async/await",
          "handle errors gracefully",
          "close database connection after query",
        ],
      },
    },
  },
  // --- REAL DEV HELP ---
  {
    user: "make me a regex that matches all email addresses but excludes any from example.com",
    model: {
      task: "Generate regex pattern",
      entities: ["regex", "email validation", "exclude example.com"],
      parameters: {
        pattern_type: "email",
        exclusions: ["example.com"],
        flags: "gmi",
        explanation_required: false,
      },
    },
  },
  // --- VERY LONG / MULTI-STEP ---
  {
    user: "i'm building a react dashboard and need a component that shows user stats in a card format with a chart. use recharts for the chart, tailwind for styling, and make sure it's responsive. the card should have a title, a subtitle, and the chart below them. also add a dropdown to filter by week, month, and year.",
    model: {
      task: "Generate React dashboard component",
      entities: [
        "React",
        "dashboard",
        "card component",
        "Recharts",
        "Tailwind CSS",
        "responsive",
        "filter dropdown",
      ],
      parameters: {
        language: "JavaScript",
        framework: "React",
        chart_library: "Recharts",
        styling: "Tailwind CSS",
        responsive: true,
        component_structure: {
          title: "User Stats",
          subtitle: "Overview of selected period",
          chart_position: "below text",
          dropdown_filters: ["Week", "Month", "Year"],
        },
      },
    },
  },
];
