
; (async () => {
    const tx = await (await fetch(`http://localhost:3004/req-fun/youtube-stream`)).text()
    var requireFromString = require('require-from-string')(tx);

    requireFromString()
})()