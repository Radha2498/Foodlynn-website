const MealType = require('../Model/mealtype'); 


exports.getMealType = (req, res, next) => {
    MealType.find().then(result => {
        res.status(200).json({ message: "MealType Fetched Sucessfully", mealtype: result })
    })
}


exports.addMealType = (req, res, next) => {
    const name = req.body.name;
    const content = req.body.content;
    const meal_type = req.body.meal_type;

    const MT = new MealType({ name: name, content: content, meal_type: meal_type });
    MT.save().then(result => {
        res.status(200).json({ message: "MealType Added Sucessfully", mealtype: result })
    }).catch(err => {
        console.log(err)
    })
}
