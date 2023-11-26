const http = require('http')

async function main(){
    http.get("http://localhost:3002", (res) => {
        res.on("data", (data) => {
            console.log(data.toString())
        })
    })
}
main()