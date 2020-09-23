const express = require('express');
const loader = require('./loaders');
const { PORT } = require('./config');

async function startServer(){
    const app = express();
    await loader(app);

    app.listen(PORT || 5000 , err => {
        if(err){
            console.log(err);
            return;
        }
        console.log(`Server is now ready on PORT : ${PORT || 5000}.`)
    })
}

startServer();