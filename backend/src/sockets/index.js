const chatSocket = require("../features/chat/chat.socket");

module.exports = function socketLoader(io) {
  chatSocket(io);
};
