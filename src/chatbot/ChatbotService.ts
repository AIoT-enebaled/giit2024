import { trainingData } from './training_data';

class ChatbotService {
  private static instance: ChatbotService;
  private model: any = null;
  private tokenizer: any = null;
  private isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService();
    }
    return ChatbotService.instance;
  }

  public async initialize() {
    if (this.isInitialized) return;

    try {
      const { pipeline } = await import('@xenova/transformers');
      
      // Load the model and tokenizer
      this.model = await pipeline('text2text-generation', 'Xenova/t5-small');
      this.isInitialized = true;
      
      console.log('Chatbot initialized successfully');
    } catch (error) {
      console.error('Error initializing chatbot:', error);
      throw error;
    }
  }

  private findMostSimilarQuestion(userQuestion: string): string {
    // Simple similarity scoring using word overlap
    const userWords = new Set(userQuestion.toLowerCase().split(' '));
    
    let bestMatch = {
      question: trainingData[0].question,
      score: 0
    };

    for (const qa of trainingData) {
      const questionWords = new Set(qa.question.toLowerCase().split(' '));
      let overlap = 0;
      
      for (const word of userWords) {
        if (questionWords.has(word)) overlap++;
      }
      
      const score = overlap / Math.max(userWords.size, questionWords.size);
      
      if (score > bestMatch.score) {
        bestMatch = {
          question: qa.question,
          score: score
        };
      }
    }

    return bestMatch.question;
  }

  private getAnswerForQuestion(question: string): string {
    const qa = trainingData.find(qa => qa.question === question);
    return qa ? qa.answer : "I'm sorry, I don't have an answer for that question.";
  }

  public async getResponse(userQuestion: string): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('Chatbot not initialized');
    }

    try {
      // Find the most similar question from our training data
      const mostSimilarQuestion = this.findMostSimilarQuestion(userQuestion);
      const answer = this.getAnswerForQuestion(mostSimilarQuestion);

      // Use T5 to generate a more natural response
      const response = await this.model(answer, {
        max_length: 100,
        temperature: 0.7
      });

      return response[0].generated_text || answer;
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm sorry, I encountered an error while processing your question.";
    }
  }
}

export default ChatbotService;
