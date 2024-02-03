const cp = require("child_process");

function executeCommand(command) {
    cp.exec(command, function (err, op) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(op);
    });
}

executeCommand("ls -la");

executeCommand('echo "Hello, Node.js!"');
