import { trainingData } from './training_data';

class ChatbotService {
  private static instance: ChatbotService;

  private constructor() {}

  public static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService();
    }
    return ChatbotService.instance;
  }

  public async initialize(): Promise<void> {
    return Promise.resolve();
  }

  private findBestMatch(input: string): string {
    const normalizedInput = input.toLowerCase().trim();
    const words = normalizedInput.split(/\W+/).filter(word => word.length > 2);
    
    let bestMatch = {
      question: '',
      score: 0
    };

    for (const qa of trainingData) {
      const questionWords = qa.question.toLowerCase().split(/\W+/).filter(word => word.length > 2);
      let matchScore = 0;

      // Check for word matches
      for (const word of words) {
        if (questionWords.includes(word)) {
          matchScore++;
        }
      }

      // Boost score for key terms
      const keyTerms = ['course', 'class', 'register', 'cost', 'price', 'duration', 'learn', 'about'];
      for (const term of keyTerms) {
        if (normalizedInput.includes(term) && qa.question.toLowerCase().includes(term)) {
          matchScore += 0.5;
        }
      }

      // Normalize score based on question length
      const score = matchScore / Math.max(words.length, questionWords.length);

      if (score > bestMatch.score) {
        bestMatch = {
          question: qa.question,
          score: score
        };
      }
    }

    return bestMatch.score > 0.2 ? bestMatch.question : '';
  }

  public async getResponse(userInput: string): Promise<string> {
    try {
      const matchedQuestion = this.findBestMatch(userInput);
      
      if (!matchedQuestion) {
        return "I'm not sure about that. You can ask me about our courses, pricing, registration, or class schedules. How can I help you?";
      }

      const qa = trainingData.find(qa => qa.question === matchedQuestion);
      return qa?.answer || "I'm sorry, I don't have specific information about that. Is there something else I can help you with?";
    } catch (error) {
      console.error('Error in getResponse:', error);
      return "I apologize, but I'm having trouble understanding. Could you rephrase your question?";
    }
  }
}

export default ChatbotService;
