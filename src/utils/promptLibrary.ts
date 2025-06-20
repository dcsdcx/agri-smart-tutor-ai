
export interface PromptTemplate {
  id: string;
  category: string;
  title: string;
  template: string;
  variables: string[];
  description: string;
}

export const PROMPT_LIBRARY: PromptTemplate[] = [
  // Lesson Generation Prompts
  {
    id: 'basic-concept',
    category: 'lesson',
    title: 'Basic Concept Explanation',
    template: 'As AgriTutor AI, explain the concept of {TOPIC} to a 2nd-year agriculture student in India. Include definitions, real-world applications, and common crops or regions if relevant. Keep it conversational but informative, using practical examples that farmers can relate to.',
    variables: ['TOPIC'],
    description: 'Basic explanation suitable for college-level students'
  },
  {
    id: 'layered-explanation',
    category: 'lesson',
    title: 'Layered Explanation',
    template: 'As AgriTutor AI, explain {TOPIC} in three levels:\n1. Like I\'m 5 (simple analogy)\n2. As a college-level student (technical details)\n3. As a competitive exam aspirant (ICAR, JRF level)\nStructure each part clearly with headers.',
    variables: ['TOPIC'],
    description: 'Multi-level explanation for different learning stages'
  },
  {
    id: 'visual-suggestion',
    category: 'lesson',
    title: 'Visual Learning Aids',
    template: 'As AgriTutor AI, suggest 2-3 diagrams, charts, or visual aids that would help a student understand {TOPIC}. Describe what each visual should show and why it\'s important for agriculture education.',
    variables: ['TOPIC'],
    description: 'Suggests visual aids to enhance understanding'
  },

  // Quiz & Assessment Prompts
  {
    id: 'generate-mcqs',
    category: 'quiz',
    title: 'Generate MCQs',
    template: 'As AgriTutor AI, create 3 multiple-choice questions about {TOPIC} for agriculture students. Each question should have 4 options. After each question, provide the correct answer with a detailed explanation of why it\'s correct and why the other options are wrong.',
    variables: ['TOPIC'],
    description: 'Creates MCQs with detailed explanations'
  },
  {
    id: 'diagnostic-remediation',
    category: 'quiz',
    title: 'Diagnostic Remediation',
    template: 'As AgriTutor AI, the student scored poorly on {TOPIC}. Provide a simplified explanation using farming analogies that could help them understand better. Also suggest one simple follow-up question to test their improved understanding.',
    variables: ['TOPIC'],
    description: 'Helps students who struggled with a topic'
  },

  // Personalization Prompts
  {
    id: 'weak-area-comparison',
    category: 'personalization',
    title: 'Weak Area Remediation',
    template: 'As AgriTutor AI, the student is weak in {WEAK_TOPIC} but strong in {STRONG_TOPIC}. Explain {WEAK_TOPIC} by comparing and connecting it with {STRONG_TOPIC} using practical agriculture examples.',
    variables: ['WEAK_TOPIC', 'STRONG_TOPIC'],
    description: 'Uses student strengths to explain weak areas'
  },
  {
    id: 'learning-path',
    category: 'personalization',
    title: 'Next Topic Suggestion',
    template: 'As AgriTutor AI, based on completed topics: {COMPLETED_TOPICS} and weak areas: {WEAK_TOPICS}, suggest the next best topic to study. Explain why this topic should come next and how it builds on previous knowledge.',
    variables: ['COMPLETED_TOPICS', 'WEAK_TOPICS'],
    description: 'Suggests optimal learning progression'
  },

  // Multimodal Prompts
  {
    id: 'image-diagnosis',
    category: 'multimodal',
    title: 'Crop Image Analysis',
    template: 'As AgriTutor AI, analyze this agricultural image. Identify what is shown (crop, plant disease, soil condition, pest damage, etc.) and provide educational insights. If it\'s a problem, suggest practical treatment options suitable for Indian farmers.',
    variables: [],
    description: 'Analyzes uploaded crop/plant images'
  },
  {
    id: 'document-summary',
    category: 'multimodal',
    title: 'Document Summary',
    template: 'As AgriTutor AI, summarize this agricultural document into key learning points. Extract important concepts, statistics, and create 2-3 self-evaluation questions for students.',
    variables: [],
    description: 'Summarizes uploaded PDF documents'
  },

  // Revision & Reinforcement
  {
    id: 'quick-summary',
    category: 'revision',
    title: 'Quick Summary',
    template: 'As AgriTutor AI, provide a concise summary of {TOPIC} in under 150 words. Use bullet points for clarity and focus on the most important concepts for agriculture students.',
    variables: ['TOPIC'],
    description: 'Creates brief topic summaries'
  },
  {
    id: 'five-minute-revision',
    category: 'revision',
    title: '5-Minute Revision Sheet',
    template: 'As AgriTutor AI, create a 5-minute revision sheet for {TOPIC} including:\n• Key definitions\n• Important diagrams to remember\n• 2 quick MCQs\n• 1 common misconception to avoid\nFormat it for quick review before exams.',
    variables: ['TOPIC'],
    description: 'Creates comprehensive revision materials'
  },

  // Regional Context
  {
    id: 'regional-context',
    category: 'contextual',
    title: 'Regional Agriculture Context',
    template: 'As AgriTutor AI, explain {TOPIC} specifically for {REGION} agriculture. Include local crops, climate conditions, soil types, common challenges, and region-specific practices or solutions.',
    variables: ['TOPIC', 'REGION'],
    description: 'Contextualizes topics for specific regions'
  }
];

export function getPromptsByCategory(category: string): PromptTemplate[] {
  return PROMPT_LIBRARY.filter(prompt => prompt.category === category);
}

export function getPromptById(id: string): PromptTemplate | undefined {
  return PROMPT_LIBRARY.find(prompt => prompt.id === id);
}

export function fillPromptTemplate(template: string, variables: Record<string, string>): string {
  let filledTemplate = template;
  
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    filledTemplate = filledTemplate.replace(new RegExp(placeholder, 'g'), value);
  });
  
  return filledTemplate;
}

export const PROMPT_CATEGORIES = [
  { id: 'lesson', name: 'Lessons', icon: '📘' },
  { id: 'quiz', name: 'Quizzes', icon: '🧪' },
  { id: 'personalization', name: 'Personalized', icon: '🎯' },
  { id: 'multimodal', name: 'Visual Analysis', icon: '🧠' },
  { id: 'revision', name: 'Revision', icon: '🔄' },
  { id: 'contextual', name: 'Regional Context', icon: '🧭' }
];
