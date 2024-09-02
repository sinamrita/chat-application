const messages = require("../models/messages");
const conversations = require("../models/conversations");
const { getSocketId, io } = require("../socketIO/socket");

const send_message = async (req, res) => {
  const { id: receiverId } = req.params;
  const { message } = req.body;
  const senderId = req.user._id;

  try {
    let conversation = await conversations.findOne({
      participants: {
        $all: [senderId, receiverId]
      }
    });

    if (!conversation) {
      conversation = await conversations.create({
        participants: [senderId, receiverId]
      });
    }

    const newMessage = new messages({
      sender_id: senderId,
      receiver_id: receiverId,
      message
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([newMessage.save(), conversation.save()]);
    const socketId = getSocketId(newMessage.receiver_id);

    io.to(socketId).emit("recieved-message", newMessage);

    res.status(200).json({
      code: 1,
      message: "Message sent successfully.",
      message: newMessage
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: 0,
      message: "Internal Server Error."
    });
  }
};

const get_messages = async (req, res) => {
  const { id: receiverId } = req.params;
  const senderId = req.user._id;
  try {
    const messages = await conversations
      .findOne({
        participants: {
          $all: [senderId, receiverId]
        }
      })
      .populate("messages");

    if (messages) {
      res.status(200).json({
        code: 1,
        message: "Message fetch successfully.",
        messages: messages.messages
      });
    } else {
      res.status(201).json({
        code: 1,
        message: "Message not found.",
        messages: []
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: 0,
      message: "Internal Server Error."
    });
  }
};

module.exports = {
  send_message,
  get_messages
};
