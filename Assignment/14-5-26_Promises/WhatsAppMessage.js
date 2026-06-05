// 1) WhatsApp Message Delivery using Promise

function sendMessage(internetConnection) {

return new Promise((resolve, reject) => {

if (internetConnection) {
resolve("Message delivered successfully");
} 

else {
reject("Message delivery failed");
}

});

}

sendMessage(true)

.then((message) => {
console.log(message);
})

.catch((error) => {
console.log(error);
});
