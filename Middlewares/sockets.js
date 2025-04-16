const { Server } = require('socket.io');
const socketAuthMiddleware = require("../Middlewares/socketAuth.js")
const onlineTracker = require("../Middlewares/onlineStatus.js")
const Message=require("../Model/messages.js")

function setupSocketServer(server) {
  // Initialize Socket.IO
  const io = new Server(server,{
    cors: {
        // Allow connections from your frontend origin
        origin: ["http://localhost:5173", "http://localhost:3000"], // Add all your frontend origins
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
      },
  });

  // Socket authentication middleware
  io.use(socketAuthMiddleware);

  // Socket.IO connection handler
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    if (socket.user) {
      const userId = socket.user.userID;
      
      // Track online status
      onlineTracker.addUser(userId, socket.id);
      io.emit('user_status', { userId, status: 'online' });
      
      // Automatically join their own room
      socket.join(userId.toString());
      
      // Handle new messages
      socket.on('send_message', async (data) => {
        try {
          // Save message to database
          const message = await Message.create({
            senderId: data.senderId,
            recipientId: data.recipientId,
            content: data.content,
            read: false
          });
          
          const messageData = {
            id: message.id,
            senderId: message.senderId,
            recipientId: message.recipientId,
            content: message.content,
            read: message.read,
            createdAt: message.createdAt
          };
          
          // Broadcast message to recipient's room
          io.to(data.recipientId.toString()).emit('receive_message', messageData);
          
          // Send confirmation to sender
          socket.emit('message_sent', { success: true, messageId: message.id });
        } catch (error) {
          console.error('Error saving message:', error);
          socket.emit('message_sent', { success: false, error: 'Failed to save message' });
        }
      });
      
      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        onlineTracker.removeUser(userId);
        io.emit('user_status', { userId, status: 'offline' });
      });
    }
  });

  return io;
}

module.exports = setupSocketServer;