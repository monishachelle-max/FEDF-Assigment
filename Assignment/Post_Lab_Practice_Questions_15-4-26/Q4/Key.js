let person = {
    name: "John",
    age: 22,
    city: "Hyderabad"
};

for (let key in person) {
    console.log(key + ": " + person[key]);
}