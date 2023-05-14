const express = require('express')
const app = express();  
const cors = require('cors');
const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId;            
const port=process.env.PORT || 5000 

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://parking-lot:zMRSytRoK1wKcGRr@cluster0.kvzsn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err=>{
    const collection=client.db("parking_lot").collection("users")
    console.log('connected')

})

// console.log(client)

app.get('/', (req, res) => {        
    res.send("user");      
});

app.listen(port, () => {           
    console.log(`Now listening on port ${port}`); 
});