// 2) WhatsApp Status Image Upload using Promise

function uploadImage(uploadSuccess) {

return new Promise((resolve, reject) => {

if (uploadSuccess) {
resolve("Image uploaded successfully");
} 

else {
reject("Image upload failed");
}

});

}

uploadImage(true)

.then((result) => {
console.log(result);
})

.catch((error) => {
console.log(error);
})

.finally(() => {
console.log("Upload process completed");
});

