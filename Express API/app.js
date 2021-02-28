const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');        
const approuter = require ('./Routes/router');
const { json } = require('body-parser');
const cors =require('cors')



 const hostname = 'localhost';
const port = 3003;

const app = express();
app.use(cors())
app.options('*', cors())


app.use(bodyParser.json()); 


app.use('/' , approuter);




// app.use((req , res, next )=>{

   
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Origin', 'GET , POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Origin', 'Content-Type, Authorization');
//     next();
// })

//****LOCAL CONNECTION*/

// mongoose.connect("mongodb://localhost/restaurant_details" , { useNewUrlParser : true, useUnifiedTopology :true});
// mongoose.connection.once('open',function() 
// {
// console.log("connection has been created .......");
// })
// .on('error',function(error){
//      console.log('connection error' .error);
//  })

// app.listen (port , () =>{
// console.log("server is running....." + port); 
// })

//CLOUD CONNECTION

mongoose.connect('mongodb+srv://Radha_24:radha1998@cluster0.hkwaq.mongodb.net/food_app?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(client => {
    // starting the server using the listen function
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
        console.log("Connection has been created.....")
    });
}).catch(err => {
    console.log(err);
})