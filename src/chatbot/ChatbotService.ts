import { trainingData } from './training_data';
import { pythonFundamentals } from './python_fundamentals';

class ChatbotService {
  private static instance: ChatbotService;
  private previousContext: string | null = null;

  private constructor() {}

  public static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService();
    }
    return ChatbotService.instance;
  }

  public async getResponse(input: string): Promise<string> {
    const normalizedInput = input.toLowerCase().trim();
    
    // Handle common acknowledgments
    if (this.isAcknowledgment(normalizedInput)) {
      return "Is there anything else you'd like to know about our courses?";
    }

    // Handle greetings
    if (this.isGreeting(normalizedInput)) {
      return "Hello! I'm here to help you learn about our courses. What would you like to know?";
    }

    // Handle goodbyes
    if (this.isGoodbye(normalizedInput)) {
      return "Thank you for your interest in GiiT! If you have any more questions later, feel free to ask.";
    }

    const response = this.findBestMatch(normalizedInput);
    if (response) {
      this.previousContext = normalizedInput;
      return response;
    }

    // If no good match is found
    return "I'm not sure about that. You can ask me about our courses, pricing, registration, or schedules. How can I help you?";
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

  private findBestMatch(input: string): string {
    const words = input.split(/\W+/).filter(word => word.length > 2);
    let bestMatch = {
      answer: '',
      score: 0
    };

    // Check if the question is about Python
    if (this.isPythonRelated(input)) {
      for (const qa of pythonFundamentals) {
        const questionWords = qa.question.toLowerCase().split(/\W+/).filter(word => word.length > 2);
        const topicWords = qa.topic.toLowerCase().split(/\W+/).filter(word => word.length > 2);
        let matchScore = 0;

        // Check for word matches in both question and topic
        for (const word of words) {
          if (questionWords.includes(word)) {
            matchScore += 2;
          }
          if (topicWords.includes(word)) {
            matchScore += 3; // Give higher weight to topic matches
          }
        }

        // Boost score for Python-specific terms
        const pythonTerms = [
          'python', 'variable', 'type', 'loop', 'if', 'else', 'print',
          'function', 'class', 'list', 'tuple', 'dictionary', 'set'
        ];

        if (pythonTerms.some(term => input.includes(term))) {
          matchScore += 2;
        }

        // Normalize score
        const normalizedScore = matchScore / Math.max(words.length, questionWords.length);

        if (normalizedScore > bestMatch.score) {
          bestMatch = {
            answer: qa.answer,
            score: normalizedScore
          };
        }
      }

      // If we found a good Python-related match, return it
      if (bestMatch.score > 0.3) {
        return bestMatch.answer;
      }
    }

    // If no Python match found or not a Python question, check regular training data
    for (const qa of trainingData) {
      const questionWords = qa.question.toLowerCase().split(/\W+/).filter(word => word.length > 2);
      let matchScore = 0;

      // Check for word matches
      for (const word of words) {
        if (questionWords.includes(word)) {
          matchScore += 2;
        }
      }

      // Boost score for key terms
      const keyTerms = {
        'course': ['course', 'class', 'program'],
        'price': ['cost', 'price', 'fee', 'fees', 'pricing', 'pay', 'payment'],
        'duration': ['long', 'duration', 'time', 'months', 'weeks'],
        'registration': ['register', 'enroll', 'join', 'start'],
      };

      for (const [category, terms] of Object.entries(keyTerms)) {
        if (terms.some(term => input.includes(term))) {
          matchScore += 3;
          // If the question also contains this category's terms, boost score
          if (terms.some(term => qa.question.toLowerCase().includes(term))) {
            matchScore += 2;
          }
        }
      }

      // Context awareness
      if (this.previousContext && 
          qa.question.toLowerCase().includes(this.previousContext)) {
        matchScore += 2;
      }

      // Normalize score based on question length
      const normalizedScore = matchScore / Math.max(words.length, questionWords.length);

      if (normalizedScore > bestMatch.score) {
        bestMatch = {
          answer: qa.answer,
          score: normalizedScore
        };
      }
    }

    // Only return if we have a reasonably good match
    return bestMatch.score > 0.3 ? bestMatch.answer : '';
  }

  private isPythonRelated(input: string): boolean {
    const pythonKeywords = [
      'python', 'programming', 'code', 'variable', 'function', 'class',
      'loop', 'if', 'else', 'print', 'data type', 'list', 'tuple',
      'dictionary', 'set', 'boolean', 'string', 'integer', 'float'
    ];
    return pythonKeywords.some(keyword => input.toLowerCase().includes(keyword));
  }
}

export default ChatbotService;
