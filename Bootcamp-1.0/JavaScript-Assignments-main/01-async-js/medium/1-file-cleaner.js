// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs');

fs.readFile("./test.txt", "utf-8", (err, content)=>{

    if(err){
        console.error(err)
        return;
    }

    const s = content.trim().replace(/\s+/g, ' ');

    fs.writeFile("./test.txt", s, err=>{
        console.log(err);
    });

})



