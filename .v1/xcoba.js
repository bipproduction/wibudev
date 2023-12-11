const ini = `
Error: Command failed: git add -A && git commit -m "auto push" && git push origin main 
    at checkExecSyncError (node:child_process:885:11)
    at execSync (node:child_process:957:15)
    at Object.push_auto [as fun] ([stdin]:50:5)
    at git ([stdin]:32:9)
    at [stdin]:35:1
    at Script.runInThisContext (node:vm:128:12)
    at Object.runInThisContext (node:vm:306:38)
    at node:internal/process/execution:83:21
    at [stdin]-wrapper:6:24 {
  Version: 1.0.0
  status: 1,
  signal: null,
  output: [ null, null, null ],
  pid: 60466,
  stdout: null,
  stderr: null
`

const versionMatch = ini.match(/Version: .*/);
console.log(versionMatch[0])

