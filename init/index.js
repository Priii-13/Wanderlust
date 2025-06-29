const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err)
})

async function main(){
await mongoose.connect(MONGO_URL);
}
const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"68598f0eacb6d02a92926a00"}));
    await Listing.insertMany(initData.data);
    console.log("data is initialized");
}
initDB();