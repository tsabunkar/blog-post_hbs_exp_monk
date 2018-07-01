const url = process.env.MONGODB_URI;
// console.log(url);
const db = require('monk')(url)

module.exports ={
    db
}