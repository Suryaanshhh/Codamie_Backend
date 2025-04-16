const onlineUsers = new Map();

exports.addUser = (userId, socketId) => {
  onlineUsers.set(userId, socketId);
};

exports.removeUser = (userId) => {
  onlineUsers.delete(userId);
};

exports.getSocketId = (userId) => {
  return onlineUsers.get(userId);
};

exports.isUserOnline = (userId) => {
  return onlineUsers.has(userId);
};

exports.getAllOnlineUsers = () => {
  return Array.from(onlineUsers.keys());
};
