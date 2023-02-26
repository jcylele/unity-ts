//TODO Not Used Yet
// Step1 clear js files in dst while leaving the meta files
// Step2 copy files in src to dst

const copyfiles = require('copyfiles')

const src = process.argv[2]
const dst = process.argv[3]