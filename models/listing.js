const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review.js");

const ListingSchema = new Schema({
  title: { type: String, required: true },
  description: String,

  image: {
    url: String,
    filename:String
    
  },

  price: Number,
  location: String,
  country: String,
  reviews:[
    {
     type:Schema.Types.ObjectId,
     ref:"Review"
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
})

ListingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{ $in: listing.reviews}});

    }
})

module.exports = mongoose.model("Listing", ListingSchema);
