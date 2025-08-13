export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'creative' | 'business' | 'educational' | 'general';
  textToJsonPrompt: string;
  enhancedPrompt: string;
  tags: string[];
}

export const promptLibrary: PromptTemplate[] = [
  // Technical Prompts
  {
    id: 'create-website',
    title: 'Create a Website',
    description: 'Build a modern responsive website with specific features',
    category: 'technical',
    textToJsonPrompt: 'create a responsive website for a coffee shop with menu, contact form, and online ordering',
    enhancedPrompt: 'Create a modern, responsive website for a coffee shop that includes a visually appealing homepage with hero section, a detailed menu page with categories and prices, a contact form with validation, an online ordering system with cart functionality, and mobile-friendly navigation. Use modern web technologies and ensure accessibility compliance.',
    tags: ['web development', 'responsive design', 'e-commerce']
  },
  {
    id: 'api-development',
    title: 'REST API Development',
    description: 'Design and implement RESTful APIs',
    category: 'technical',
    textToJsonPrompt: 'build a REST API for user authentication and profile management',
    enhancedPrompt: 'Design and implement a secure REST API for user authentication and profile management that includes endpoints for user registration, login with JWT tokens, password reset functionality, profile CRUD operations, input validation, error handling, and comprehensive API documentation with examples.',
    tags: ['api', 'backend', 'authentication', 'jwt']
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    description: 'Create cross-platform mobile applications',
    category: 'technical',
    textToJsonPrompt: 'develop a mobile app for expense tracking',
    enhancedPrompt: 'Develop a cross-platform mobile application for personal expense tracking that features intuitive expense entry with categories, receipt photo capture, spending analytics with charts, budget setting and alerts, data export functionality, and offline capability with cloud synchronization.',
    tags: ['mobile', 'react native', 'flutter', 'expense tracking']
  },
  {
    id: 'database-design',
    title: 'Database Schema Design',
    description: 'Design efficient database schemas',
    category: 'technical',
    textToJsonPrompt: 'design database schema for e-commerce platform',
    enhancedPrompt: 'Design a comprehensive database schema for an e-commerce platform that includes tables for users, products, categories, orders, payments, inventory, reviews, and shipping, with proper relationships, indexes, constraints, and normalization to ensure data integrity and optimal performance.',
    tags: ['database', 'sql', 'e-commerce', 'schema design']
  },

  // Creative Prompts
  {
    id: 'brand-identity',
    title: 'Brand Identity Design',
    description: 'Create comprehensive brand identity packages',
    category: 'creative',
    textToJsonPrompt: 'create brand identity for sustainable fashion startup',
    enhancedPrompt: 'Create a comprehensive brand identity for a sustainable fashion startup that includes logo design with multiple variations, color palette reflecting eco-friendly values, typography system, brand guidelines, business card and letterhead designs, social media templates, and packaging concepts that align with sustainability principles.',
    tags: ['branding', 'logo design', 'sustainability', 'fashion']
  },
  {
    id: 'content-strategy',
    title: 'Content Marketing Strategy',
    description: 'Develop comprehensive content marketing plans',
    category: 'creative',
    textToJsonPrompt: 'create content marketing strategy for tech startup',
    enhancedPrompt: 'Develop a comprehensive content marketing strategy for a B2B tech startup that includes target audience analysis, content pillars and themes, editorial calendar for 3 months, blog post topics with SEO keywords, social media content plan, lead magnets, email newsletter strategy, and performance metrics to track success.',
    tags: ['content marketing', 'seo', 'social media', 'b2b']
  },
  {
    id: 'video-production',
    title: 'Video Production Plan',
    description: 'Plan and execute video content creation',
    category: 'creative',
    textToJsonPrompt: 'plan video series for cooking tutorials',
    enhancedPrompt: 'Plan a comprehensive video series for cooking tutorials that includes episode structure and format, equipment and lighting setup, recipe selection with difficulty progression, filming schedule and locations, post-production workflow, thumbnail and title optimization, and distribution strategy across multiple platforms.',
    tags: ['video production', 'cooking', 'tutorials', 'youtube']
  },

  // Business Prompts
  {
    id: 'business-plan',
    title: 'Business Plan Development',
    description: 'Create comprehensive business plans',
    category: 'business',
    textToJsonPrompt: 'write business plan for online tutoring platform',
    enhancedPrompt: 'Write a comprehensive business plan for an online tutoring platform that includes executive summary, market analysis with competitor research, detailed service offerings, target customer segments, marketing and sales strategy, operational plan, financial projections for 3 years, funding requirements, and risk assessment with mitigation strategies.',
    tags: ['business plan', 'edtech', 'market analysis', 'financial projections']
  },
  {
    id: 'market-research',
    title: 'Market Research Analysis',
    description: 'Conduct thorough market research studies',
    category: 'business',
    textToJsonPrompt: 'analyze market for plant-based food products',
    enhancedPrompt: 'Conduct comprehensive market research analysis for plant-based food products that includes market size and growth trends, consumer behavior and preferences, competitive landscape analysis, pricing strategies, distribution channels, regulatory considerations, target demographics, and opportunities for market entry or expansion.',
    tags: ['market research', 'food industry', 'plant-based', 'consumer analysis']
  },
  {
    id: 'sales-strategy',
    title: 'Sales Strategy Framework',
    description: 'Develop effective sales strategies and processes',
    category: 'business',
    textToJsonPrompt: 'create sales strategy for SaaS product',
    enhancedPrompt: 'Create a comprehensive sales strategy for a B2B SaaS product that includes lead generation tactics, sales funnel optimization, customer persona development, pricing strategy with different tiers, sales process documentation, CRM implementation plan, team structure and training, and key performance indicators to measure success.',
    tags: ['sales strategy', 'saas', 'b2b', 'lead generation']
  },

  // Educational Prompts
  {
    id: 'course-curriculum',
    title: 'Online Course Creation',
    description: 'Design comprehensive online learning experiences',
    category: 'educational',
    textToJsonPrompt: 'design online course for digital marketing',
    enhancedPrompt: 'Design a comprehensive online course for digital marketing that includes structured learning modules, hands-on projects and assignments, video lessons with clear objectives, downloadable resources and templates, quizzes and assessments, community discussion forums, certification criteria, and a progression path from beginner to advanced levels.',
    tags: ['online learning', 'digital marketing', 'curriculum design', 'certification']
  },
  {
    id: 'training-program',
    title: 'Employee Training Program',
    description: 'Develop corporate training and development programs',
    category: 'educational',
    textToJsonPrompt: 'create employee training program for customer service',
    enhancedPrompt: 'Create a comprehensive employee training program for customer service excellence that includes onboarding modules, communication skills development, conflict resolution techniques, product knowledge training, role-playing exercises, performance evaluation criteria, ongoing coaching framework, and measurable learning outcomes.',
    tags: ['employee training', 'customer service', 'professional development', 'onboarding']
  },

  // General Prompts
  {
    id: 'project-management',
    title: 'Project Management Plan',
    description: 'Create detailed project management frameworks',
    category: 'general',
    textToJsonPrompt: 'create project plan for office relocation',
    enhancedPrompt: 'Create a detailed project management plan for office relocation that includes timeline with milestones, task breakdown structure, resource allocation, budget planning, risk assessment, stakeholder communication plan, vendor management, employee transition strategy, and post-move evaluation criteria.',
    tags: ['project management', 'office relocation', 'planning', 'logistics']
  },
  {
    id: 'event-planning',
    title: 'Event Planning Guide',
    description: 'Plan and execute successful events',
    category: 'general',
    textToJsonPrompt: 'plan corporate conference for 500 attendees',
    enhancedPrompt: 'Plan a comprehensive corporate conference for 500 attendees that includes venue selection and layout, speaker recruitment and management, registration and ticketing system, catering and dietary accommodations, audio-visual requirements, marketing and promotion strategy, attendee engagement activities, and post-event follow-up plan.',
    tags: ['event planning', 'conference', 'corporate events', 'logistics']
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    description: 'Streamline business processes with automation',
    category: 'general',
    textToJsonPrompt: 'automate invoice processing workflow',
    enhancedPrompt: 'Design an automated invoice processing workflow that includes document scanning and data extraction, approval routing based on amount thresholds, integration with accounting software, exception handling for discrepancies, notification system for stakeholders, audit trail maintenance, and performance metrics tracking.',
    tags: ['automation', 'workflow', 'invoice processing', 'business process']
  }
];

export const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'technical', name: 'Technical' },
  { id: 'creative', name: 'Creative' },
  { id: 'business', name: 'Business' },
  { id: 'educational', name: 'Educational' },
  { id: 'general', name: 'General' }
] as const;
