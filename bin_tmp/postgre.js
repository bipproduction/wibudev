const root = require('child_process').execSync('npm root -g').toString().trim()
console.log("version 1.0.0")
const arg = process.argv.splice(2)
const { execSync } = require('child_process')

const list_menu = [
    {
        id: "db_dump",
        des: "backup database",
        arg: "dbuk",
        act: async function () {
            const sub = sub_arg(["--db-name"])
            if (sub) {
                execSync(`pg_dump -U bip -h localhost -p 5433 -d ${sub['--db-name']} -W -F c -f ${sub['--db-name']}.dump`, { stdio: "inherit" })
            }

        }
    },
    {
        id: "db_import",
        des: "import database",
        arg: "dim",
        act: async function () {
            execSync('pg_restore -U bip -h localhost -p 5433 -d raven_stone2 -W -c -v raven_stone2.dump', { stdio: "inherit" })
        }
    }
]

function help() {
    console.log(`
${list_menu.map((v) => v.arg + "\t" + v.des).join("\n")}
    `)
}

function sub_arg(list_prop) {
    const prop = {}
    const require = []
    const _arg = arg.splice(1)

    for (let i in list_prop) {
        const idx = _arg.findIndex((v) => v === list_prop[i])
        if (idx > -1) {
            const val = _arg[idx + 1]
            if (val) {
                prop[_arg[idx]] = val
            } else {
                prop[list_prop[i]] = null
                require.push(list_prop[i])
            }
        } else {
            prop[list_prop[i]] = null
            require.push(list_prop[i])
        }

    }

    if (require.length > 0) {
        console.log(`
Require:
${list_prop.join("\n")}
        `)
        return null
    }
    return prop
}

async function main() {
    // javascript-obfuscator index.js -o index2.js --compact true --self-defending true --string-array true
    if (arg.length === 0) return help()
    const cmd = list_menu.find(v => v.arg === arg[0])
    if (!cmd) return help()
    cmd.act()
}

main()

// pg_dump -U bip -h localhost -p 5433 -d raven_v2 -W -F c -f raven_v2.dump
// pg_restore -U bip -h localhost -p 5433 -d raven_v2 -W -c -v raven_v2.dump