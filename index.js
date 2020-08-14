#!/usr/bin/env node

const fs = require('fs');
const current_dir = process.cwd()

let prefixName = 'icon_'

let args = process.argv.slice(2)

if (args.length > 0) {
    prefixName = args[0]
}

const filesArr = []

fs.readdir(current_dir,(err, files) => {
    if (err) {
        throw err
    }
    if (files.length === 0) {
        console.log('未读取到文件')
        return false
    }
    files.forEach((file, index) => {
        filterFiles(file)
    })
    renameFile()
})

function filterFiles(file) {
    let stats = fs.statSync(file);
    if (!stats.isDirectory()) {
        filesArr.push(file)
    }
}

function renameFile (file, index) {
    filesArr.forEach((file, index) => {
        let arr = file.split('.')
        let format = arr[arr.length - 1]
        let newPath = `${prefixName}${index}.${format}`
        fs.rename(file, newPath, err => {
            if (err) {
                console.log(`[${file}] rename fail`)
            }
            console.log(`[${file}] rename [${newPath}] success`)
        })
    })
}