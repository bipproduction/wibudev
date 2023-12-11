const arg = process.argv.splice(2);
const _ = require('lodash');
const sub_arg2 = require('../src/sub_arg2');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

; (async () => {
    if (_.isEmpty(arg)) return console.log("require parameter")

    const param = {
        "--email": null,
        "--password": null
    }
    const sub = sub_arg2(_.keys(param), arg)
    if (!sub.success) return console.log("require: ", sub.require.join(" "))
    const user = await prisma.user.findUnique({ where: { email: sub.data['--email'] } })
    if (!user) return console.log("wrong email or password")
    console.log(user.id)
})()