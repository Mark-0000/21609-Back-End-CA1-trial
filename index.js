const { MongoClient } = require("mongodb");

//database link
const url = "mongodb+srv://admin:admin@21609.zfx6j.mongodb.net/CA1?retryWrites=true&w=majority"
const client = new MongoClient(url, { useUnifiedTopology: true });

// The database to use
const dbName = "CA1";

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

let db, col;

app.get('/', (req, res) => {
    //send to '/' the text hello world.
    res.send('21609 CA1 Mark Christian Albinto')

})
//get Hotel router

app.get('/hotel', (req, res) => {
    console.log('You are in the hotel route');

    async function getHotel() {
        let out
        const filter = { name: "CandleWood Suites" }
        const hotelque = await col.findOne(filter);
        out = hotelque.name + " " + hotelque.location
        // Print to the console
        console.log(hotelque.name, hotelque.location);

        //sending to the postman
        res.send(out)


    }
    getHotel();

})

//post Hotel route
app.post('/hotel', (req, res) => {
    console.log('I have received a post request in the /hotel route');

    //create a hotel object
    let myhotel = new Hotel(req.body.name, req.body.rooms, req.body.staffs, req.body.location, req.body.RoomService)

    //insert it to the database
    col.insertOne(myhotel);
    res.sendStatus(200)

})


// hotel router for the update
app.put('/hotel', (req, res) => {
    console.log(' Hotel router for update ');
    async function findHotel() {
        try {
            const foundHotel = await col.findOne({ "_id": ObjectId(req.body.id) })
            //if the hotel is found edit it and send a message to the user
            if (foundHotel !== null) {
                let hotel = new Hotel(
                    foundHotel.name,
                    foundHotel.rooms,
                    foundHotel.staffs,
                    foundHotel.location,
                    foundHotel.RoomService)
                hotel.name = req.body.name;
                // console.log(car);
                try {
                    const updateResult = await col.updateOne(
                        { "_id": ObjectId(req.body.id) },
                        { $set: hotel })
                } catch (err) {
                    console.log(err.stack)
                }
                // console.log(updateResult.modifiedCount)       
                res.send("The Hotel was updated");
            } else {
                //if the hotel is not found send a message to the user saying that this entry does not exist
                res.send("The Hotel was not updated");
            }
        } catch (err) {
            res.send("Object id is invalid")
        }
    };
    findHotel();

})

//hotel router to delete
app.delete('/hotel', (req, res) =>{
 
    console.log('Hotel router to delete one car');
 
    console.log(req.body.id)
 
    col.deleteOne({"_id": ObjectId(req.body.id)})
    async function findHotel() {
        const foundHotel = await  col.findOne({"_id": ObjectId(req.body.id)})
        if(foundCar !== null){
            res.send("The entry was not deleted")
        }
        res.send("The entry was deleted")
    };
    findHotel();
})


//start application
async function run() {
    try {
        //wait till it connects then print connected succesfully
        await client.connect();
        console.log("Connected correctly to server");
        db = client.db(dbName);

        // Use the collection "Hotel"
        col = db.collection("Hotel");



        // I commented this out because it's already been uploaded to database for easier debugging
        /*
        // Construct a document/object                                                                                                                                                          
        let myhotel = {
            "name": "Four Seasons",
            "rooms": 25,
            "staffs": 70,
            "location": "Dublin, Ireland",
            "RoomService": true
        }
        let myhotel1 = {
            "name": "CandleWood Suites",
            "rooms": 10,
            "staffs": 25,
            "location": "Cork, Ireland",
            "RoomService": false
        }
        let myhotel2 = {
            "name": "Sapphires hotel",
            "rooms": 20,
            "staffs": 45,
            "location": "Belfast, Ireland",
            "RoomService": true
        }
 
        // Insert a single document
        const p = await col.insertOne(myhotel);
        const q = await col.insertOne(myhotel1);
        const r = await col.insertOne(myhotel2);
 
 
        
 
        // Find one document
        const filter = { name: "Four Seasons" }
        const hotelque = await col.findOne(filter);
 
        // Print to the console
        console.log(hotelque.name, hotelque.location);
 
 
        
 
        //updating documnet
        const updateDoc = {
            $set: {
                rooms: 15
            },
        }
 
        //using the file ther from the findone we can also use it to update
        await col.updateOne(filter, updateDoc)
 
 
        //deleting the document
        const query = { name: "Four Seasons" };
 
        const result = await col.deleteOne(query);
        */

        app.listen(3000)
    } catch (err) {
        console.log(err.stack);
    }

    finally {
        //await client.close();
    }
}

run().catch(console.dir);



//create Hotel class 
class Hotel {
    constructor(name, rooms, staffs, location, RoomService = false) {
        this.name = name;
        this.rooms = rooms;
        this.staffs = staffs;
        this.location = location;
        this.RoomService = RoomService;
    }

    printValues() {
        console.log(this.name, this.rooms, this.staffs, this.location, this.RoomService);
    }
}

