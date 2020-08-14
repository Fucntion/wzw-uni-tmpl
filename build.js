// 局部模式
const shell = require('shelljs')

if (shell.exec('npm run trans:build').code !== 0) { // 执行npm run build 命令
  shell.echo('Error: clean failed')
  shell.exit(1)
}

if (shell.exec('npm run build:mp-weixin').code !== 0) { // 执行npm run build 命令
  shell.echo('Error: run failed')
  shell.exit(1)
}
