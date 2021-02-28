const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const RestaurantSchema = new Schema({
 
    _id: {                                  
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    location_id: {
        type: Number,
        required: true
    },
    city_id: {
        type: Number,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    thumb: {
        type: Array,
        required: true
    },
    aggregate_rating: {
        type: Number,
        required: true
    },
    rating_text: {
        type: String,
        required: true
    },
    min_price: {
        type: Number,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    type: {
        type: Array,
        required: true
    },
    cuisine_id: {
        type: Number,
        required: true
    }  
 })


 module.exports = mongoose.models.Restaurant || mongoose.model('restaurant', RestaurantSchema); //previous 
//module.exports = mongoose.models.Restaurant || mongoose.model('restdata', RestaurantSchema);    //new