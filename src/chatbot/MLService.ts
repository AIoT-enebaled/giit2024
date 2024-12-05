import axios from 'axios';

class MLService {
  private static instance: MLService;
  private readonly API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';
  private readonly API_KEY = process.env.HUGGING_FACE_API_KEY || '';

  private constructor() {}

  public static getInstance(): MLService {
    if (!MLService.instance) {
      MLService.instance = new MLService();
    }
    return MLService.instance;
  }

  public async generateResponse(input: string): Promise<string> {
    try {
      const response = await axios.post(
        this.API_URL,
        { inputs: input },
        {
          headers: {
            'Authorization': `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.generated_text) {
        return response.data.generated_text;
      }
      return '';
    } catch (error) {
      console.error('Error calling Hugging Face API:', error);
      return '';
    }
  }

  public async enhanceResponse(baseResponse: string, context: string): Promise<string> {
    try {
      const prompt = `Given this context: "${context}", enhance this response: "${baseResponse}"`;
      const enhancedResponse = await this.generateResponse(prompt);
      return enhancedResponse || baseResponse;
    } catch (error) {
      console.error('Error enhancing response:', error);
      return baseResponse;
    }
  }
}

export default MLService;
