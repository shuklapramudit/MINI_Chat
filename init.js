const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => {
    console.log("Connection successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let chats=[
    {
        from: "Shobhit",
        to: "Divyanshi",
        msg: "I love your coding",
        created_at: new Date()
    },
    {
        from: "Neha",
        to: "preeti",
        msg: "send me the joining process of your company",
        created_at: new Date()
    },
    {
        from: "Ayush",
        to: "navya",
        msg: "Love Your Charecter",
        created_at: new Date()
    },
    {
        from: "Rohit",
        to: "Meenu",
        msg: "Love fougure",
        created_at: new Date()
    },
    {
        from: "Rohit",
        to: "Mohit",
        msg: "Teach us JS",
        created_at: new Date()
    }
]
Chat.insertMany(chats);
