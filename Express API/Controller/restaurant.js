const Restaurant = require('../Model/restaurant');  


exports.filterSearch = (req, res, next) => {
    const queryParams = req.body;   

     const location_id= queryParams.location_id;
    const mealtype_id= queryParams.mealtype_id;
    const cuisine_id=queryParams.cuisine_id;
    const hcost = queryParams.hcost;
    const lcost = queryParams.lcost;
    const page = queryParams.page ? queryParams.page : 1;    
    const sort = queryParams.sort ? queryParams.sort : 1;    
    const perPageCount = queryParams.perPageCount ? queryParams.perPageCount : 5;

    let start;
    let end;
    start = Number(page * perPageCount) - perPageCount;   
    end = Number(page * perPageCount);
    let payload = {};  

    
    if (mealtype_id) {
        payload = {
            mealtype_id: Number(mealtype_id)
        }
    }
    if (mealtype_id && hcost && lcost) {
        payload = {
          
            cost: { $gt: lcost, $lt: hcost },
            mealtype_id:Number(mealtype_id)
        }
    }
    if (mealtype_id && location_id ) {
        payload = {
             location_id :Number(location_id),
            // city : Number(location_id),
            mealtype_id: Number( mealtype_id)
        }
    }
    if (mealtype_id && cuisine_id) {
        payload = {
            cuisine_id:{$in:cuisine_id},
            mealtype_id: Number( mealtype_id)            
        }
    }
    if (location_id  && cuisine_id &&  mealtype_id) {
        payload = {
            location_id  :Number(location_id),
            // city : Number(location_id),
            cuisine_id:{$in:cuisine_id},
            mealtype_id: Number( mealtype_id)
        }
    }
    if (location_id   && cuisine_id &&  mealtype_id && hcost && lcost) {
        payload = {
             location_id  :Number(location_id),
            // city : Number(location_id),
            cuisine_id:{$in:cuisine_id},
            mealtype_id: Number( mealtype_id),
            cost: { $gt: lcost, $lt: hcost }
        }
    }
    Restaurant.find(payload).sort({ cost: sort }).then(result => {
        const count = Math.ceil(result.length / 5);
        const pageCountArr = [];
        const resultValues = result.slice(start, end);  // to return paginated items
        for (var i = 1; i <= count; i++) {
            pageCountArr.push(i);
        }
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant: resultValues, pageCount: pageCountArr, totalCount: result.length })
    }).catch(err => {
        res.status(500).json({ message: err })
    });
}

// getRestaurantByCity function to get restaurants by city name

exports.getRestaurantByCity = (req, res,next) => {
    const city_name = req.params.city_name;
    Restaurant.find({location_id:city_name}).then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully",restaurant : result })
    }) .catch(err => console.log(err));
}

// // getRestaurantById function to get restaurants by Id
exports.getRestaurantById = (req, res, next) => {
    const _id = req.params._id;
    Restaurant.findById(_id).then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant: result })
    }).catch(err => console.log(err));
}

// // addRestaurantList function to add restaurants to DB
exports.addRestaurantList = (req, res, next) => {
    const _id = req.body._id;
    const name = req.body.name;
    const city =req.body.city;
    const location_id = req.body.location_id;
    const city_id = req.body.city_id;
    const locality = req.body.locality;
    const thumb = req.body.thumb;
    const cost = req.body.cost;
    const contact_number =req.body.contact_number;
    const type = req.body.type;
    const cuisine_id = req.body.cuisine_id;
    const Rest = new Restaurant({ _id:_id , name: name, city:city,location_id:location_id,city_id:city_id,locality:locality,thumb:thumb,cost:cost,contact_number:contact_number,type:type,cuisine_id:cuisine_id  });
    Rest.save().then(result => {
        res.status(200).json({ message: "Restaurant Added Sucessfully", restaurant: result })
    }).catch(err => {
        console.log(err)
    })
}


exports.getCuisineById=(req,res,next)=>
{
const cus_id1=res.body.cus_id1;
const cus_id2=res.body.cus_id2;
const cus_id3=res.body.cus_id3;
const cus_id4=res.body.cus_id4;
const cus_id5=res.body.cus_id5;

Restaurant.find({cuisine :{$elemMatch:{$id :{$in :[cus_id1,cus_id2,cus_id3,cus_id4,cus_id5]}}}})
.then(response =>{
    res.status(200).json({restaurant:response});

}).catch(err=>{
    res.status(500).json(err)
})
}