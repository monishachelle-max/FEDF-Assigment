function filterEmployees(employees) {
    let result = [];

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].salary > 50000) {
            result.push(employees[i].name);
        }
    }

    return result;
}

let empList = [
    { name: "A", salary: 40000 },
    { name: "B", salary: 60000 },
    { name: "C", salary: 70000 }
];

console.log(filterEmployees(empList));  