const {Schema,model,Types} = require('mongoose');

const conversationSchema = new Schema({
    participants : [
        {
            type : Types.ObjectId,
            ref:'user',
            required:true
        }
    ],
    messages : [
        {
            type : Types.ObjectId,
            ref:'message',
            required:true
        }
    ],
},{timestamps:true})

const conversations = model('conversation',conversationSchema);

module.exports = conversations
