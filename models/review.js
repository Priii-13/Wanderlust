const mongoose = require("mongoose");
const { Schema } = mongoose;
const { listingSchema } = require("../schema");

const reviewSchema = new Schema({
    comments:String,
    rating:
    {type:Number,
        min:1,
        max:5
    },
    createdAt:
    {
        type:Date,
        default:Date.now()
    }
})


module.exports = mongoose.model("Review",reviewSchema);
