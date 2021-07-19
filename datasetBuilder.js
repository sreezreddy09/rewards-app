const fs = require('fs');
let result = [];
let users = [
    "Nancy Griffin", "Harold Moore", "Margaret Reed", "Bonnie Green", "Kathy Brooks",
    "Randy Long", "Gregory Evans", "Rebecca Brown", "Shawn Russell", "Martin Phillips"
];

let newList = [];

let startTS = 1619852400000;
let endTS = 1627801199000;
let diff = 52991994;
let idPrefix = "test-serial-";

while ( startTS < endTS ) {
    let user = users[Math.round(Math.random()* (9-0) + 0)];
    // if(users.length) {
    //     user = users.shift();
    //     newList.push(user);
    // } else {
    //     users = users.concat(newList);
    //     newList = [];
    //     user = users.shift();
    //     newList.push(user);
    // }
    let transaction = {
        id : idPrefix + startTS,
        name: user,
        timeStamp: startTS,
        amount: Number((Math.random() * (150 - 1) + 1).toFixed(2))
    }

    startTS = startTS + diff;
    result.push(transaction);
}

fs.writeFileSync("./src/data.json", JSON.stringify(result, null, 4), "utf-8")




