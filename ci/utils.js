var fs = require('fs')

const readFileByPromise = (buildConfFilePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(buildConfFilePath, function (err, data) {
      if (err) {
        reject(err)
      }
      // console.log('data:', data)
      // console.log('data.toString(\'utf8\'):', data.toString('utf8'))
      // console.log('data.toString():', data.toString())
      resolve(data.toString())
    })
  })
}

const writeFileByPromise = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, 'utf8', function (err) {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

module.exports = {
  writeFileByPromise, readFileByPromise
}
