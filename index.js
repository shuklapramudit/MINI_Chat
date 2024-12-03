const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

main().then(() => {
    console.log("Connection successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
//Index Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats });
})
//New Routes
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});
//Create Route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({  // Use 'Chat' instead of 'newChat'
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    console.log(newChat);
    newChat.save()  // Save the new chat to the database
        .then((savedChat) => {
            console.log("Chat saved successfully!");
        })
        .catch((err) => {
            console.log("Error saving chat:", err);
        });
        res.redirect("/chats");
});

// Edit Rpute
app.get("/chats/:id/edit", async (req, res)=>{
    let{id}=req.params;
    let chat=await Chat.findById(id); 
    res.render("edit.ejs", {chat});
})
// Update Route
app.put("/chats/:id", async(req, res)=>{
    let{id}=req.params;
    let {msg: newMsg}=req.body;
    console.log(newMsg);
    let updatedChat=await Chat.findByIdAndUpdate(id, {msg:newMsg}, {runValidators:true}, {new:true});
    console.log(updatedChat);
    res.redirect("/chats")
})
// Disroy Route
app.delete("/chats/:id", async (req, res)=>{
    let{id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

app.get("/", (req, res) => {
    res.send("Root is working");
});

app.listen(8080, () => {
    console.log("App is listening on port 8080");
});