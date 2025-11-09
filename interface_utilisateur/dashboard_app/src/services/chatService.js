// services/chatService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8001';

class ChatService {
  async sendMessage(message, senderId = 'web_user') {
    try {
      const response = await axios.post(`${API_URL}/api/chatbot`, {
        message: message,
        sender: senderId
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      throw error;
    }
  }
}

export default new ChatService();