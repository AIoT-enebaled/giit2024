import { trainingData } from './training_data';
import { pythonFundamentals } from './python_fundamentals';
import MLService from './MLService';

interface ConversationContext {
  topic: string;
  lastQuestion: string;
  lastResponse: string;
  questionCount: number;
  pythonMode: boolean;
}

class ChatbotService {
  private static instance: ChatbotService;
  private context: ConversationContext;
  private mlService: MLService;

  private constructor() {
    this.mlService = MLService.getInstance();
    this.context = {
      topic: '',
      lastQuestion: '',
      lastResponse: '',
      questionCount: 0,
      pythonMode: false
    };
  }

  public static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService();
    }
    return ChatbotService.instance;
  }

  public async getResponse(input: string): Promise<string> {
    const normalizedInput = input.toLowerCase().trim();
    this.context.questionCount++;
    
    // Handle common acknowledgments with context
    if (this.isAcknowledgment(normalizedInput)) {
      const response = this.context.pythonMode ? 
        "Would you like to learn more about Python programming? Feel free to ask about any specific topic!" :
        "What else would you like to know about our courses or programs?";
      return this.enhanceResponse(response, normalizedInput);
    }

    // Handle greetings with personalized touch
    if (this.isGreeting(normalizedInput)) {
      const response = "Hello! I'm your personal learning assistant at GiiT. I can help you with:\n" +
        "1. Learning Python programming\n" +
        "2. Answering questions about our courses\n" +
        "3. Providing resources and guidance\n";
      return this.enhanceResponse(response, normalizedInput);
    }

    // Handle goodbyes with context
    if (this.isGoodbye(normalizedInput)) {
      const response = this.getContextualGoodbye();
      return this.enhanceResponse(response, normalizedInput);
    }

    // Try to find a response
    let response = '';
    
    // First check if it's a Python question
    if (this.isPythonRelated(normalizedInput)) {
      this.context.pythonMode = true;
      response = (await this.findPythonMatch(normalizedInput)) ?? '';
      if (response) {
        this.context.topic = 'python';
        this.context.lastResponse = response;
        this.context.lastQuestion = normalizedInput;
        return this.enhanceResponse(response, normalizedInput);
      }
    }

    // Then check general questions
    response = (await this.findGeneralMatch(normalizedInput)) ?? '';
    if (response) {
      this.context.pythonMode = false;
      this.context.lastResponse = response;
      this.context.lastQuestion = normalizedInput;
      return this.enhanceResponse(response, normalizedInput);
    }

    // Default response if no conditions are met
    return this.enhanceResponse(this.getDefaultResponse(this.isPythonRelated(normalizedInput)), normalizedInput);
  }

  private async enhanceResponse(response: string, input: string): Promise<string> {
    try {
      // Only enhance responses if we have enough context
      if (this.context.questionCount > 1) {
        const contextString = `Previous topic: ${this.context.topic}, Previous question: ${this.context.lastQuestion}, Current input: ${input}`;
        return await this.mlService.enhanceResponse(response, contextString);
      }
      return response;
    } catch (error) {
      console.error('Error enhancing response:', error);
      return response;
    }
  }

  private getContextualGoodbye(): string {
    if (this.context.pythonMode) {
      return "Thanks for learning about Python with me! Remember to practice coding regularly. If you have more questions later, I'll be here to help!";
    }
    return "Thank you for your interest in GiiT! We look forward to helping you achieve your tech goals. Feel free to come back if you have any more questions!";
  }

  private findPythonMatch(input: string): string | null {
    const normalizedInput = input.toLowerCase().trim();

    // First check for exact matches
    const exactMatch = pythonFundamentals.find(qa => 
      normalizedInput === qa.question.toLowerCase().trim() ||
      normalizedInput === qa.topic.toLowerCase().trim()
    );
    
    if (exactMatch) {
      return exactMatch.answer;
    }

    // Then check for contained matches
    const containsMatch = pythonFundamentals.find(qa =>
      qa.question.toLowerCase().includes(normalizedInput) ||
      qa.topic.toLowerCase().includes(normalizedInput)
    );

    if (containsMatch) {
      return containsMatch.answer;
    }

    // Finally do fuzzy matching
    let bestMatch = {
      answer: '',
      score: 0
    };

    for (const qa of pythonFundamentals) {
      const score = this.calculateMatchScore(input, qa);
      if (score > bestMatch.score) {
        bestMatch = { answer: qa.answer, score: score };
      }
    }

    return bestMatch.score >= 0.5 ? bestMatch.answer : null;
  }

  private findGeneralMatch(input: string): string | null {
    const normalizedInput = input.toLowerCase().trim();
    let bestMatch = {
      answer: '',
      score: 0
    };

    for (const qa of trainingData) {
      const score = this.calculateMatchScore(normalizedInput, qa);
      if (score > bestMatch.score) {
        bestMatch = { answer: qa.answer, score: score };
      }
    }

    return bestMatch.score >= 0.4 ? bestMatch.answer : null;
  }

  private calculateMatchScore(input: string, qa: { question: string; topic?: string }): number {
    const normalizedInput = input.toLowerCase().trim();
    const normalizedQuestion = qa.question.toLowerCase().trim();
    const normalizedTopic = qa.topic?.toLowerCase().trim() || '';
    let score = 0;

    // Word matching
    const inputWords = normalizedInput.split(/\W+/).filter(word => word.length > 2);
    const questionWords = normalizedQuestion.split(/\W+/).filter(word => word.length > 2);
    const topicWords = normalizedTopic ? normalizedTopic.split(/\W+/).filter(word => word.length > 2) : [];

    // Check for exact phrase matches
    if (normalizedQuestion.includes(normalizedInput)) {
      score += 5;
    }
    if (normalizedTopic && normalizedTopic.includes(normalizedInput)) {
      score += 4;
    }

    // Check for word matches
    for (const word of inputWords) {
      if (questionWords.includes(word)) {
        score += 2;
      }
      if (topicWords.includes(word)) {
        score += 1;
      }
    }

    // Normalize score
    return score / (inputWords.length || 1);
  }

  private getDefaultResponse(isPythonQuestion: boolean): string {
    if (isPythonQuestion) {
      return "I can help you learn about Python programming. You can ask me about:\n" +
             "- Basic concepts (variables, data types)\n" +
             "- Lists and collections\n" +
             "- Functions and methods\n" +
             "- Control flow (if/else, loops)\n" +
             "- And more!\n\n" +
             "What specific Python topic would you like to know about?";
    }
    
    return "I can help you with information about:\n" +
           "- Our courses and programs\n" +
           "- Class schedules and duration\n" +
           "- Registration process\n" +
           "- Teaching methods\n" +
           "- And more!\n\n" +
           "What would you like to know?";
  }

  private isAcknowledgment(input: string): boolean {
    const acknowledgments = ['ok', 'okay', 'thanks', 'thank you', 'great', 'good', 'alright', 'got it', 'understood'];
    return acknowledgments.some(ack => input.includes(ack));
  }

  private isGreeting(input: string): boolean {
    const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => input.includes(greeting));
  }

  private isGoodbye(input: string): boolean {
    const goodbyes = ['bye', 'goodbye', 'see you', 'farewell', 'take care'];
    return goodbyes.some(goodbye => input.includes(goodbye));
  }

  private isPythonRelated(input: string): boolean {
    const pythonKeywords = [
      'python', 'list', 'lists', 'variable', 'variables', 'function', 'functions',
      'loop', 'loops', 'if', 'else', 'print', 'class', 'classes', 'dictionary',
      'tuple', 'set', 'operator', 'operators'
    ];
    
    const normalizedInput = input.toLowerCase().trim();
    
    // If the input is very short (1-2 words), be more lenient
    if (normalizedInput.split(/\s+/).length <= 2) {
      return pythonKeywords.some(keyword => normalizedInput.includes(keyword)) ||
             pythonFundamentals.some(qa => 
               normalizedInput === qa.question.toLowerCase().trim() ||
               normalizedInput === qa.topic.toLowerCase().trim()
             );
    }
    
    return pythonKeywords.some(keyword => normalizedInput.includes(keyword));
  }
}

export default ChatbotService;
