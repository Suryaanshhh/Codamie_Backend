const axios = require('axios');
const aiBot = async (req, res) => {
    try {
      const { message, conversationHistory } = req.body;
      
      // Format the conversation history for Llama-2 model input
      let formattedConversation = '';
      
      if (conversationHistory && conversationHistory.length > 0) {
        conversationHistory.forEach(entry => {
          formattedConversation += `User: ${entry.user}\nAssistant: ${entry.bot}\n`;
        });
      }
      
      // Add the current message
      formattedConversation += `User: ${message}\nAssistant:`;
      
      // Prepare the payload for Hugging Face Inference API
      const payload = {
        inputs: formattedConversation,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true
        }
      };
  
      // Make request to Hugging Face Inference API for the Llama-2-Emotional-ChatBot
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Response from Hugging Face:', response.data);
      // Extract the response text
      let botResponse = response.data[0]?.generated_text || "";
      
      // Clean up the response - extract only the assistant's reply
      // botResponse = botResponse.substring(botResponse.lastIndexOf("Assistant:") + 10).trim();
      
      // console.log('Bot response:', botResponse);

      // If there are additional exchanges in the response, cut it off
      // if (botResponse.includes("User:")) {
      //   botResponse = botResponse.substring(0, botResponse.indexOf("User:")).trim();
      // }
  
      res.json({ generated_text: botResponse });
    } catch (error) {
      console.error('Error with chatbot API:', error.response?.data || error.message);
      res.status(500).json({ 
        error: 'Failed to process message', 
        details: error.response?.data || error.message 
      });
    }
  }

  module.exports = aiBot