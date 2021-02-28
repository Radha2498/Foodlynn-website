// const express = require ('express');

// const router = express.Router();


// var cityController = require('../Controller/city');
// var restaurantController = require('../Controller/restaurant');
// var mealTypeController = require('../Controller/mealtype');

// router.get('/location', cityController.getCityList);
// router.get('/mealtype', mealTypeController.getMealType);
// router.get('/getRestaurantbycity/:cityName' , restaurantController.getRestaurantByCity );
// router.get('/filter' , restaurantController.filter);
// router.get('/getResById/:resId' , restaurantController.getRestaurantById );


// router.post('/addcityList',cityController.addCityList);
// router.post('/addmealtype',mealtypeController.addMealtype);
// router.post('/addRestaurantList' ,restaurantController.addRestaurantList );

// module.exports=router;




const express = require('express');


var cityController = require('../Controller/city');
var mealTypeController = require('../Controller/mealtype');
var restaurantController = require('../Controller/restaurant');
var userController = require('../Controller/User');


const router = express.Router();


router.get('/location', cityController.getCityList);
router.get('/mealtype', mealTypeController.getMealType);
router.get('/getRestaurantsbycity/:city_name', restaurantController.getRestaurantByCity);
router.post('/restaurantfilter', restaurantController.filterSearch);
router.get('/getResById/:_id', restaurantController.getRestaurantById);
router.post('/signup' , userController.signUp);
router.post('/login', userController.login)

//  router.post('/getCuisineById/cus_id ',restaurantController.getCuisineById)

router.post('/addcityList', cityController.addCityList);
 router.post('/addmealtype', mealTypeController.addMealType);
 router.post('/addRestaurantList', restaurantController.addRestaurantList);

// exporting the router
module.exports = router;





