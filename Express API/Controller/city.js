const location = require('../Model/city');  
exports.getCityList = (req, res, next) => {
    location.find().then(result => {
        res.status(200).json({ message: "City Fetched Sucessfully", location: result })
    })
}
exports.addCityList = (req, res, next) => {
    const name = req.body.name;
    const city_id = req.body.city_id;
    const location_id = req.body.location_id;
    const country_name = req.body.country_name;
    const Cities = new City({ name: name, city_id: city_id, location_id: location_id, country_name: country_name });
    Cities.save().then(result => {
        res.status(200).json({ message: "City Added Sucessfully", city: result })
    }).catch(err => {
        console.log(err)
    })
}

