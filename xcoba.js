
const {spawn} = require('child_process')

console.log("halo")
const child = spawn("/bin/sh", ['-c', 'ls && hostname && echo "apa kabar"'])
child.stdout.on("data", (data) => console.log(data.toString()))
child.stderr.on("data", (data) => console.log(data.toString()))