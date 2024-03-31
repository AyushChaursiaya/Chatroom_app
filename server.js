// Initialising all my variables and dependencies - MERN (E for Express)
const express = require('express');
//Initialising our Express app
const app = express();
//Making our server
const server = require('http').Server(app);
//Socket Io Variable 
const io = require('socket.io')(server);
//Basic Initialisation Done.
//To link our html with this server file
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('messageSent', (data) => {
        console.log('Message sent:', data);
        io.emit('messageSent', data);
    });

    socket.on("joined", (username) => {
        io.emit("joined", username)
    })

});




//Making the port, and listening on port
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});