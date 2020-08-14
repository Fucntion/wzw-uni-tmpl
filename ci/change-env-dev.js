const { readFileByPromise, writeFileByPromise } = require('./utils')

const shell = require('shelljs')

const confTmplFilePath = './src/common/env.dev'
const confFilePath = './src/common/env.js'

const wxMpAppid = 'wxfe5d2621576cf895'
const wxMpAppidPlaceholar = '%mpWeixinAppid%' // 占位
const manifestTmplFilePath = './src/manifest.json.tmpl'
const manifestFilePath = './src/manifest.json'

const extTmplFilePath = './src/ext.json.tmpl'
const extFilePath = './src/ext.json'

// 修改业务配置文件
async function changeEnvFile () {
  const confContent = await readFileByPromise(confTmplFilePath)
  return await writeFileByPromise(confFilePath, confContent)
}

// 修改manifest.json配置文件
async function changeManifestConf () {
  var confContent = await readFileByPromise(manifestTmplFilePath)
  confContent = confContent.replace(wxMpAppidPlaceholar, wxMpAppid)
  return await writeFileByPromise(manifestFilePath, confContent)
}

// 修改ext.json配置文件
async function changeExtConf () {
  var confContent = await readFileByPromise(extTmplFilePath)
  confContent = confContent.replace(wxMpAppidPlaceholar, wxMpAppid)
  return await writeFileByPromise(extFilePath, confContent)
}

/**
 * 火箭发射
 * @returns {Promise<void>}
 */
async function fly () {
  await changeEnvFile()
  await changeManifestConf()
  await changeExtConf()
}

fly()
