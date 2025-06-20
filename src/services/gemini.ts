
interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export async function askGemini(prompt: string, imageBase64?: string): Promise<string> {
  try {
    // Using the existing API key from the current implementation
    const apiKey = 'AIzaSyC1ubuDXowRKPPjxrOzxSDmUUgjgWcZFj4';
    
    let requestBody: any = {
      contents: [{
        parts: []
      }]
    };

    // Add text prompt
    requestBody.contents[0].parts.push({ text: prompt });

    // Add image if provided
    if (imageBase64) {
      requestBody.contents[0].parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64
        }
      });
    }

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received from AI.';
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get response from AI. Please try again.');
  }
}

export function generatePrompt(
  topic: string, 
  purpose: 'explain' | 'quiz' | 'remediate' | 'summary' | 'visual' | 'regional',
  additionalContext?: { weakTopic?: string; strongTopic?: string; region?: string; level?: string }
): string {
  const agriTutorPrefix = "As AgriTutor AI, ";
  
  switch (purpose) {
    case 'explain':
      return `${agriTutorPrefix}explain the concept of ${topic} to a 2nd-year agriculture student in India. Include definitions, real-world applications, and common crops or regions if relevant. Keep it conversational but informative, using practical examples that farmers can relate to.`;
    
    case 'quiz':
      return `${agriTutorPrefix}create 3 multiple-choice questions about ${topic} for agriculture students. Each question should have 4 options. After each question, provide the correct answer with a detailed explanation of why it's correct and why the other options are wrong.`;
    
    case 'remediate':
      if (additionalContext?.strongTopic) {
        return `${agriTutorPrefix}the student is weak in ${topic} but strong in ${additionalContext.strongTopic}. Explain ${topic} by comparing and connecting it with ${additionalContext.strongTopic} using practical agriculture examples.`;
      } else {
        return `${agriTutorPrefix}the student scored poorly on ${topic}. Provide a simplified explanation using farming analogies that could help them understand better. Also suggest one simple follow-up question to test their improved understanding.`;
      }
    
    case 'summary':
      return `${agriTutorPrefix}provide a concise summary of ${topic} in under 150 words. Use bullet points for clarity and focus on the most important concepts for agriculture students.`;
    
    case 'visual':
      return `${agriTutorPrefix}suggest 2-3 diagrams, charts, or visual aids that would help a student understand ${topic}. Describe what each visual should show and why it's important for agriculture education.`;
    
    case 'regional':
      const region = additionalContext?.region || 'India';
      return `${agriTutorPrefix}explain ${topic} specifically for ${region} agriculture. Include local crops, climate conditions, soil types, common challenges, and region-specific practices or solutions.`;
    
    default:
      return `${agriTutorPrefix}provide information about ${topic} for agriculture students.`;
  }
}
