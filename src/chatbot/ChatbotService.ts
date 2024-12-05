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
    
    // First try exact matches from both datasets
    const exactPythonMatch = pythonFundamentals.find(qa => 
      normalizedInput === qa.question.toLowerCase().trim()
    );
    
    const exactGeneralMatch = trainingData.find(qa =>
      normalizedInput === qa.question.toLowerCase().trim() &&
      qa.topic.toLowerCase() === "courses"
    );
    
    if (exactPythonMatch) return exactPythonMatch.answer;
    if (exactGeneralMatch) return exactGeneralMatch.answer;

    // Then try semantic matches with topic context
    const isPythonQuestion = this.isPythonRelated(normalizedInput);
    const isCourseQuestion = normalizedInput.includes('course') || 
                           normalizedInput.includes('class') || 
                           normalizedInput.includes('cost') ||
                           normalizedInput.includes('price') ||
                           normalizedInput.includes('fee');

    // Use appropriate dataset based on context
    const dataset = isPythonQuestion ? pythonFundamentals : 
                   isCourseQuestion ? trainingData.filter(qa => qa.topic === "Courses") :
                   trainingData;

    // Calculate match scores
    let bestMatch = {
      answer: '',
      score: 0
    };

    for (const qa of dataset) {
      const score = this.calculateMatchScore(input, qa);
      if (score > bestMatch.score) {
        bestMatch = { answer: qa.answer, score: score };
      }
    }

    // Return match if confidence is high enough
    return bestMatch.score >= 0.6 ? bestMatch.answer : null;
  }

  private findGeneralMatch(input: string): string | null {
    const normalizedInput = input.toLowerCase().trim();
    let bestMatch = {
      answer: '',
      score: 0,
      topic: ''
    };

    // First try to match within the current topic
    if (this.context.topic) {
      for (const qa of trainingData) {
        if (qa.topic === this.context.topic) {
          const score = this.calculateMatchScore(normalizedInput, qa);
          if (score > bestMatch.score) {
            bestMatch = { answer: qa.answer, score: score, topic: qa.topic };
          }
        }
      }
      
      // If we found a good match within the current topic, return it
      if (bestMatch.score >= 0.6) {
        return bestMatch.answer;
      }
    }

    // If no good match in current topic, search all topics
    for (const qa of trainingData) {
      const score = this.calculateMatchScore(normalizedInput, qa);
      if (score > bestMatch.score) {
        bestMatch = { answer: qa.answer, score: score, topic: qa.topic };
      }
    }

    // Update context with the new topic if we found a match
    if (bestMatch.score >= 0.5) {
      this.context.topic = bestMatch.topic;
      return bestMatch.answer;
    }

    return null;
  }

  private calculateMatchScore(input: string, qa: { question: string; topic?: string }): number {
    const normalizedInput = input.toLowerCase().trim();
    const normalizedQuestion = qa.question.toLowerCase().trim();
    
    // Split into words and remove common words
    const commonWords = new Set(['the', 'is', 'at', 'which', 'on', 'in', 'a', 'an', 'and', 'or', 'but', 'how', 'what', 'when', 'where', 'who']);
    const inputWords = normalizedInput.split(/\s+/).filter(word => !commonWords.has(word));
    const questionWords = normalizedQuestion.split(/\s+/).filter(word => !commonWords.has(word));
    
    // Count matching words
    const matchedWords = inputWords.filter(word => questionWords.includes(word)).length;
    
    // Calculate base score
    const percentageMatch = matchedWords / Math.max(inputWords.length, questionWords.length);
    
    // Check for key phrases that indicate the same intent
    const keyPhrases: { [_: string]: string[] } = {
      'cost': ['price', 'how much', 'fee', 'fees'],
      'duration': ['how long', 'length', 'time'],
      'schedule': ['when', 'timing', 'hours'],
      'location': ['where', 'place', 'address'],
      'requirements': ['need', 'required', 'prerequisite']
    };

    let phraseBonus = 0;
    for (const [_, phrases] of Object.entries(keyPhrases)) {
      const inputHasPhrase = phrases.some(p => normalizedInput.includes(p));
      const questionHasPhrase = phrases.some(p => normalizedQuestion.includes(p));
      if (inputHasPhrase && questionHasPhrase) {
        phraseBonus = 0.3;
        break;
      }
    }

    // Add topic relevance bonus
    const topicBonus = qa.topic?.toLowerCase().includes(normalizedInput) ? 0.2 : 0;

    return Math.min(1.0, percentageMatch + phraseBonus + topicBonus);
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
    const pythonKeywords = ['python', 'programming', 'code', 'function', 'variable', 'loop', 'list', 'dictionary'];
    const normalizedInput = input.toLowerCase();
    
    // Don't trigger Python mode for course-related questions
    if (normalizedInput.includes('course') || 
        normalizedInput.includes('cost') || 
        normalizedInput.includes('price') || 
        normalizedInput.includes('how much') || 
        normalizedInput.includes('how long')) {
      return false;
    }
    
    return pythonKeywords.some(keyword => normalizedInput.includes(keyword));
  }
}

export default ChatbotService;
