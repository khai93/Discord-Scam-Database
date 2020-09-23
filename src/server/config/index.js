const path = require('path');
const results = require('dotenv').config({path : path.join(__dirname , '.env')});

if(results.error) throw new Error('Failed to parse .env file in the config directory.');

module.exports = {
    PORT : process.env.PORT
}