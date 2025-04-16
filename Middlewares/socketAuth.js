const jwt = require("jsonwebtoken")


const socketAuthMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }
    
    try {
      const decoded = jwt.verify(token, "abra ka dabra");
      socket.user = decoded;
      next();
    } catch (err) {
      return next(new Error('Authentication error'));
    }
  };

  module.exports =  socketAuthMiddleware 