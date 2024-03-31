//Basic initialisation
const socket = io(); //establish a connection

let username = "";

document.getElementById("join-btn").addEventListener("click",
    (event) => {
        event.preventDefault();

        username = document.getElementById("username-input").value.trim();
        if (!username) {
            alert("Please enter a username");
        } else {
            //enter my chat
            document.getElementById("form").style.display = "none";
            document.getElementById("chatRoom").style.display = "block";

            document.getElementById("header").textContent = `Chatroom - ${username}`
            socket.emit("joined", username)
        }
    })


document.getElementById("send-btn").addEventListener("click", () => {
    let message = document.getElementById("message-input").value.trim();
    socket.emit("messageSent", { message, username });
})

socket.on("messageSent", (data) => {
    console.log(data);
    if (data.username === username) {
        //message is yours
        showMessage(data, true)
    } else {
        // message somebody else;
        showMessage(data, false)
    }
})

function showMessage(message, mine) {

    if (mine) {
        document.getElementById("messages-container").innerHTML +=
            `
            <div class='message sent'>${message.username}: ${message.message}</div>
            `
    } else {
        document.getElementById("messages-container").innerHTML +=
            `
            <div class='message received'>${message.username}: ${message.message}</div>
            `
    }

}

socket.on("joined", (newUser) => {

    if (newUser !== username) {
        document.getElementById("messages-container").innerHTML +=
            `
        <h3>${newUser} has joined!</h3>
        `

    }

})