const fs = require("fs");

function readFileContent(filePath) {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        console.log(data);
    } catch (error) {
        console.error(`Error reading file ${filePath} : ${error.message} `);
    }
}

readFileContent("test-files/file1.txt");
readFileContent("test-files/empty-file.txt");
readFileContent("test-files/nonexistent-file.txt");
