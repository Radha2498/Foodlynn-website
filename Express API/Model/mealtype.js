const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const MealTypeSchema = new Schema({
    _id :{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    meal_type: {
        type: Number,
        required: true
    }
    
})

module.exports = mongoose.model('mealType', MealTypeSchema);  