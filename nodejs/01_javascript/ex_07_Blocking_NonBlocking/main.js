function moreWork(){
    console.log("sometask execution on main thread");
}

const fs = require("fs"); // import filesystem 
// const data = fs.readFileSync("./file.md"); // blocks here until file is read -> io disk 
// console.log(data);

// async 
fs.readFile("./file.md", (err, data) => {
    if (err) 
        throw err;
    console.log(data);
  });
moreWork(); // will run after console.log