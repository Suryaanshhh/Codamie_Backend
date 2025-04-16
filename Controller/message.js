const Message=require("../Model/messages.js")
const { Op } = require('sequelize');
exports.getMessages = async (req, res) => {
    try {
      const { recipientId } = req.params;
      console.log(req.user)
      const senderId = req.user.id;
      
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { senderId, recipientId },
            { senderId: recipientId, recipientId: senderId }
          ]
        },
        order: [['createdAt', 'ASC']]
      });
      
      res.json({ messages });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  };
  
  exports.markMessagesAsRead = async (req, res) => {
    try {
      const { senderId } = req.params;
      const recipientId = req.user.id;
      
      await Message.update(
        { read: true },
        {
          where: {
            senderId,
            recipientId,
            read: false
          }
        }
      );
      
      res.json({ success: true });
    } catch (error) {
      console.error('Error marking messages as read:', error);
      res.status(500).json({ error: 'Failed to mark messages as read' });
    }
  };