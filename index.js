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

app.get('/home', (req, res) => {        
    res.send("user");      
});

async function run() {
    try {
        await client.connect();
        const database = client.db('parking_lot');
        const usersCollection = database.collection('users');
        const userCollection = database.collection('user');
        const locationCollection = database.collection('locations');
        const hostCollection = database.collection('hosts');
        const seatCollection = database.collection('Seats');
    
    app.get('/user', async (req, res) => {
        
       
        res.send("user")
       
    })
    app.put('/user/:email', async (req, res) => {
        const user = req.body;
        const filter = { email: user.email };
        const options = { upsert: true };
        const updateDoc = { $set: user };
        const result = await userCollection.updateOne(filter, updateDoc, options);
        res.json(result);
        console.log(req.body)
    })
    app.get('/hosts/:email', async (req, res) => {
        
        const email = req.params.email;
        const query = { email:email };
        const user = await hostCollection.findOne(query);
        console.log(email)
        res.send(user)
       
    })

    app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.json(result);
        console.log(req.body)
    });
    app.post('/hosts', async (req, res) => {
        const host = req.body;
        console.log(host)
        // const result = await hostCollection.insertOne(host);
        // res.json(result);
        // console.log(req.body)
    });
    app.post('/seats', async (req, res) => {
        console.log(req.body)
        const host = req.body;
        const result = await seatCollection.insertOne(host);
        res.json(result);
       
    });
    app.get('/seats/:name', async (req, res) => {
        const name = req.params.name;
        const query = { name:name };
        const user = await seatCollection.findOne(query);
        console.log(name)
        res.send(user)
       
    });

    app.put('/locations/:name', async (req, res) => {
        const location = req.body;
        const filter = { name: location.name };
        const options = { upsert: true };
        const updateDoc = { $set: location };
        const result = await locationCollection.updateOne(filter, updateDoc, options);
        res.json(result);
        console.log(req.body)
    })
    app.post('/user', async (req, res) => {
        const user = req.body;
        const filter = { email: user.email };
        const options = { upsert: true };
        const updateDoc = { $push: {vehicles:user.info} };
        const result = await userCollection.updateOne(filter, updateDoc, options);
        res.json(result);
        console.log(user)
    })
 

    app.get('/users', async (req, res) => {
        const cursor = usersCollection.find({});
        const users = await cursor.toArray();
        res.send(users);
        console.log(users)
    })
    app.get('/locations', async (req, res) => {
        const cursor = locationCollection.find({});
        const location = await cursor.toArray();
        res.send(location);
        // console.log(users)
    })
  
    app.get('/locations/:name', async (req, res) => {
       
        const name = req.params.name;
        const query = { name:name };
        const user = await locationCollection.findOne(query);
        res.send(user)
        console.log(user)
    })
    app.post('/insert/newLocation', async (req, res) => {
        const location = req.body;
        const result = await locationCollection.insertOne(location);
        res.json(result);
        console.log(req.body)
    });
            app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            console.log(query);
            const result = await usersCollection.deleteOne(query);
            console.log(result);
            res.json(result);
        })

       
    }

finally {
    // await client.close();
}
}

run().catch(err=>console.log(err));

app.listen(port, () => {           
    console.log(`Now listening on port ${port}`); 
});