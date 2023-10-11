require('dotenv').config();
const express = require('express');
const app = express();
const https = require('https')
const fs = require('fs');
//const helmet = require('helmet');
const cors = require('cors');
const hsts = require('./middleware/hsts')
const mongoose = require('mongoose');

//DB
mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log('Db connected...'));

//Middleware
//app.use(helmet());
app.use(cors({origin: 'https://localhost:3000', optionsSuccessStatus:200}))
app.use(express.json());
app.use(hsts);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));

app.use((reg,res,next)=>
{
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,ContentType,Accept,Authorization');
res.setHeader('Access-Control-Allow-Methods', '*');
 next();
});




//Listen
https.createServer(
        {
            key: fs.readFileSync('./keys/privatekey.pem'),
            cert: fs.readFileSync('./keys/certificate.pem'),
            passphrase: 'friedgreentomatoes',
        },
        app
     )
     .listen(3000);








































/*const express = require('express')
const app = express()
const urlprefix = '/api'




const mongoose = require('mongoose')
const Fruit = require('./models/fruit')
const fs = require('fs')
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
    server:{sslCA: cert}};
    const connstring='mongodb+srv://st10081751:Pholisa_123@cluster0.klj8utg.mongodb.net/?retryWrites=true&w=majority'

    const fruitRoutes = require("./routes/fruit.js");
    
    mongoose.connect(connstring)
    .then(()=>
    {
        console.log('Connected :-)')
    })
    .catch(()=>
    {
        console.log('NOT connected :-(')
    },options);


      app.use(express.json())

     
    /* app.post(urlprefix+'/fruits',(req, res) => {
      const fruit = new Fruit(
        {
            id: req.body.id,
            name: req.body.name
        }

      )
      fruit.save();
      res.status(201).json({
        message:'Fruit created',
        fruit: fruit
      })
    })


    app.get(urlprefix+'/fruits', (req, res) => {
       /* const orders = [
            {
                id: "1",
                name : "Orange"
            },
            {
                id: "2",
                name : "Banana"
            },
            {
                id: "3",
                name : "Pear"
            }
        ]
        res.json(
            {
            message: "Fruits",
            orders: orders
            }
        )*/

        /*Fruit.find().then((fruits)=>{
            res.json(
                {
                    message: 'Fruits found',
                    fruits:fruits
                }
            )
        })
        
    })


    app.delete(urlprefix+ "/fruits/:id",(req, res)=>{
    Fruit.deleteOne({_id: req.params.id})
    .then((result)=>
    {
    res.status(200).json({message: "Fruit Deleted"});
    });
    })

    app.use(urlprefix+'/fruits', fruitRoutes)
    module.exports = app;
     
    /* const express = require('express')
    const app = express()
    const urlprefix = '/api'
    

     app.get(urlprefix+'/fruits',(req, res) => {

        Fruit.find().then((fruits)=>{
            req.json(
                {
                    message: 'Fruits found',
                    fruits:fruits
                }
            )
        })
})
    
    */

   

    /* app.get(urlprefix+'/orders', (req, res) => {
        const orders = [
            {
                id: "1",
                name : "Orange"
            },
            {
                id: "2",
                name : "Banana"
            },
            {
                id: "3",
                name : "Pear"
            }
        ]
        res.json(
            {
            message: "Fruits",
            orders: orders
            }
        )
        
    })

    module.exports = app; */

    /* const express = require ('express')
const app = express()

app.get('/',(req, res) => {
    res.send('Hello World Express')
})

    app.get('/test',(req, res) => {
        res.send('Hello World Express /test')
    })

    module.exports = app; */