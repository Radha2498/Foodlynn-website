import React from 'react';
import '../Styles/Filter.css';
import axios from 'axios';
import queryString from 'query-string';

class Filter extends React.Component{
    constructor(){
        super();
        this.state ={
            restaurants : [],
            // locations :[],
            locationList:[],
            pageCount:[],
            // location_id : undefined,
            location:undefined,
            cuisine:[],
            cuisine_id:undefined,
            mealtype:undefined,
            hcost : undefined,
            lcost : undefined,
            page : 1,
            sort : 1
        }

    }
    componentDidMount(){
         const queryParams =queryString.parse(this.props.location.search);
         const location_id = queryParams.area;
        const mealtype_id= queryParams.mealtype_id;
         const { sort, page } = this.state;

         console.log(mealtype_id)
         let filterObj = {
            location_id: location_id,
              mealtype_id:mealtype_id,
             sort:sort,
             page:page         
        };
        axios({
            method:'POST',
            url:'http://localhost:3003/restaurantfilter',
            headers: {'Content-Type' : 'application/json'},
            data : filterObj
        }).then(res =>this.setState({restaurants : res.data.restaurant ,
            pageCount:res.data.pageCount,
            location: location_id,
             mealtype: mealtype_id,
            
            
        }) )
        .catch(err => console.log(err))
    
        axios({                                                  
            method:'GET',
            url:'http://localhost:3003/location',
            headers:{'Content-Type':'application/json'}
        }).then(response =>this.setState({locationList:response.data.location}))
        .catch(err=>console.log(err))
    }



    handleClick = (Id) =>
    {
        
        this.props.history.push(`/details/${Id}`);
    }
   
    handleLocationChange = (event) => {
       
        const area = event.target.value.split('-')[0];
        const city= event.target.value.split('-')[1];
        const { cuisine,hcost,mealtype, lcost, page, sort } = this.state;
        console.log(mealtype)

        let filterObj = {
            location_id: area,
            location_id: city,
             mealtype_id: mealtype,
            cuisine_id:cuisine.length != 0 ? cuisine : undefined,
            hcost: hcost,
            lcost: lcost,
            sort: sort,
            page: page
        };

        this.props.history.push(`/filter?area=${area}&cuisine=${cuisine}&mealtype=${mealtype}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);

        axios({
            method:'POST',
            url:'http://localhost:3003/restaurantfilter',
            headers: {'Content-Type' : 'application/json'},
            data : filterObj
        })
            .then(res => this.setState({ restaurantList: res.data.restaurant, pageCount: res.data.pageCount, location: area }))
            .catch(err => console.log(err))
    }

    handlePageChange = (pageNumber) => {
        

        const page = pageNumber;
        const { location, cuisine,mealtype, hcost, lcost, sort } = this.state;
  
        let filterObj = {
            location_id: location,
           mealtype_id:mealtype,
            cuisine_id: cuisine.length != 0 ? cuisine: undefined,
            hcost: hcost,
            lcost: lcost,
            sort: sort,
            page: page
        };

        this.props.history.push(`/filter?area=${location}&cuisine=${cuisine}&mealtype=${mealtype}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);

        axios({
            method:'POST',
            url:'http://localhost:3003/restaurantfilter',
            headers: {'Content-Type' : 'application/json'},
            data : filterObj
        })
            .then(res => this.setState({ restaurantList: res.data.restaurant, pageCount: res.data.pageCount, page: page }))
            .catch(err => console.log(err))
    }

    //present cuisine
    handleCuisineChange = (cuisineId) => {
        
        const { cuisine, location,mealtype, hcost, lcost, sort, page } = this.state;
        if (cuisine.indexOf(cuisineId) == -1) {
            cuisine.push(cuisineId);
        }
        else {
            var index = cuisine.indexOf(cuisineId);
            cuisine.splice(index, 1);
        }
          
          let filterObj = {
            location_id: location,
            mealtype_id:mealtype,
            cuisine_id: cuisine.length != 0 ? cuisine : undefined,
            hcost: hcost,
            lcost: lcost,
            sort: sort,
            page: page
        };
         
         this.props.history.push(`/filter?area=${location}&cuisine=${cuisine}&mealtype=${mealtype}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);

         axios({
            method:'POST',
            url:'http://localhost:3003/restaurantfilter',
            headers: {'Content-Type' : 'application/json'},
            data : filterObj
         })
             .then(res => this.setState({ restaurantList: res.data.restaurant, pageCount: res.data.pageCount, cuisine: cuisine }))
             .catch(err => console.log(err))
     }

//new cuisine
// handleCuisineChange = (event,cus_id) => {
//     const {cuisine} =  this.state;

// if (cuisine.indexOf(cus_id) == -1) {
//     cuisine.push(cus_id);
// }
// else {
//     var index = cuisine.indexOf(cus_id);
//     cuisine.splice(index, 1);
// }
//     const cus_id1=cuisine[0];
//     let cus_id2=cuisine[1];
//     let cus_id3=cuisine[2];

// if (cuisine[1]==undefined)
// {
//     cus_id2=cuisine[0];
// }
// if (cuisine[2]==undefined)
// {
//     cus_id3=cuisine[0];
// }
//     this.props.history.push(`/filter?cus_id1=${cus_id1}&cus_id2=${cus_id2}&cus_id3=${cus_id3}`);
//     let filterObj={cus_id1:cus_id1,cus_id2:cus_id2,cus_id3:cus_id3};
//     axios({
//         method:'POST',
//         url:'http://localhost:3003/restaurantfilter',
//         headers: {'Content-Type' : 'application/json'},
//         data : filterObj
//      })
//      .then(res => this.setState({ restaurantList: res.data.restaurant }))
//      .catch(err => console.log(err))
// }
   






 onSortChange = (sort) => {
   
    const { location, cuisine, lcost, hcost, mealtype, page } = this.state;

    let filterObj = {
        location_id: location,
        mealtype_id: mealtype,
        cuisine_id: cuisine.length != 0 ? cuisine : undefined,
        hcost: hcost,
        lcost: lcost,
        sort: Number(sort),
        page: page
    };

   
    this.props.history.push(`/filter?area=${location}&cuisine=${cuisine}&mealtype=${mealtype}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);

    axios({
        method:'POST',
        url:'http://localhost:3003/restaurantfilter',
        headers: {'Content-Type' : 'application/json'},
        data : filterObj
    })
        .then(res => this.setState({ restaurants: res.data.restaurant, sort: Number(sort), pageCount: res.data.pageCount }))
        .catch(err => console.log(err))
}

//previous code

//    onSortChange =(Id) =>{
//        const {lcost, hcost} = this.state;
//        const filterObj = {
//         mealtype_id: 1,
//         sort:Number(Id),
//         lcost:lcost,
//         hcost:hcost
       
//    };
//    axios({
//        method:'POST',
//        url:'http://localhost:3003/restaurantfilter',
//        headers: {'Content-Type' : 'application/json'},
//        data : filterObj
//    }).then(res =>this.setState({restaurants : res.data.restaurant , sort:Number(Id), pageCount:res.data.pageCount}) )
//    .catch(err => console.log(err))

//    }



handleCostChange = (lcost, hcost) => {
    
    const { location, mealtype, cuisine, sort, page } = this.state;
    let filterObj = {
        location_id: location,
        mealtype_id: mealtype,
        cuisine_id: cuisine.length != 0 ? cuisine : undefined,
        hcost: hcost,
        lcost: lcost,
        sort: sort,
        page: page
    };
    this.props.history.push(`/filter?area=${location}&cuisine=${cuisine}&mealtype=${mealtype}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);

    axios({
        method:'POST',
        url:'http://localhost:3003/restaurantfilter',
        headers: {'Content-Type' : 'application/json'},
        data : filterObj
    })
        .then(res => this.setState({
            restaurants: res.data.restaurant,
            lcost: Number(lcost),
            hcost: Number(hcost),
            pageCount: res.data.pageCount
        }))
        .catch(err => console.log(err))
}

//previous code
//    handleCostChange =(lcost , hcost) =>{
//     const {sort } = this.state;
//     const filterObj = {
//         mealtype_id:1,
//        lcost:Number(lcost),
//        hcost:Number(hcost),
//        sort:sort
       
//    };
//    axios({
//        method:'POST',
//        url:'http://localhost:3003/restaurantfilter',
//        headers: {'Content-Type' : 'application/json'},
//        data : filterObj
//    }).then(res =>this.setState({restaurants : res.data.restaurant,
//      lcost:Number(lcost),
//      hcost:Number(hcost),
//      pageCount:res.data.pageCount}) )
//    .catch(err => console.log(err))

//    }
    
    render()
    {
        
        const {restaurants, pageCount, locationList, sort,image} = this.state;
        
      return(
        <div>
        <div>
    {/* <div><h1 className="logosection">e!</h1></div> */}
    {/* <div className="login">Login</div> */}
    {/* <div className="Rectangle1"></div> */}
    {/* <div className="Rect2"><p>Create Account</p></div>  */}
    
</div>
<div><h1 className="heading1">Breakfast places in Pune</h1></div> 
<div className="container-fluid">
        <div className="row">
        <div className="col-sm-4 col-md-4 col-lg-4" >
        <div className="blocknew" >
            
            <div className="Rect3">
                <h3 style={{color: 'darkblue', fontFamily: 'Times New Roman', marginLeft:'30px', paddingTop:'32px', fontSize:'22px' }}>Filters</h3> 
                <label style={{marginLeft:'25px', fontFamily: 'Times New Roman', lineHeight: '2.5', height:'10px', color:'darkblue', fontSize:'18px'}}>Select Location</label>
    
                <div className="custom-select" style= {{width:'200px'}} >
                <select className="select1" onChange={this.handleLocationChange} >
                    <option>Select</option>
                    {locationList.map((item) => {
                                          return <option value={`${item.location_id}-${item.city_id}`}>{`${item.name}`}</option>
                                        // return <option value={`${item.name}`}>{`${item.name}`}</option>
                                        })}
                </select>
                </div><br />
    
                <div className="cusine"><span style={{color:'darkblue', fontSize :'18px'}}>Cuisine</span><br />
                <input type="checkbox"  name="Cusine"  className="NorthIndian" value="1" onChange={ () => this.handleCuisineChange ('1')} />North Food<br />
                <input type="checkbox"  name="Cusine" className="SouthFood"   onChange={ () => this.handleCuisineChange ('2')}/>South Food<br />
                <input type="checkbox"  name="Cusine" className="Chinese"   onChange={ () => this.handleCuisineChange ('3')}/>Chinese Food<br />
                <input type="checkbox"  name="Cusine" className="FastFood"  onChange={ () => this.handleCuisineChange ('4')} />Fast Food<br />
                <input type="checkbox"  name="Cusine" className="StreetFood"   onChange={ () => this.handleCuisineChange ('6')}/>Street Food<br />
                  </div> 
    
                <div className="price">
                    <span style={{color:'darkblue'}}>Cost For Two</span><br />
                    <input type="radio"  name="Price" style={{fontSize:'5px'}} className="p1" onChange={()=> this.handleCostChange(1, 500)} />Less than &#8377; 500<br />
                    <input type="radio"  name="Price" style={{fontSize:'5px'}} className="p2" onChange={()=> this.handleCostChange(500, 1000)}/>&#8377; 500 to &#8377; 1000<br />
                    <input type="radio"  name="Price" style={{fontSize:'5px'}} className="p3" onChange={()=> this.handleCostChange(1000, 1500)}/>&#8377; 1000 to &#8377; 1500<br />
                    <input type="radio"  name="Price" style={{fontSize:'5px'}} className="p4"  onChange={()=> this.handleCostChange(1500, 2000)}/>&#8377; 1500 to &#8377; 2000<br />
                    <input type="radio"  name="Price" style={{fontSize:'5px'}} className="p5" onChange={()=> this.handleCostChange(2000,5000)}/>&#8377; 2000+<br />
                </div>     
                
                <div className="sort" >
                    <span style={{color:'darkblue'}}>Sort</span><br />
                    <input type="radio"  name="sort" style={{fontSize:'5px'}}className="s1"  checked={sort == 1} onChange={() =>this.onSortChange('1')} />Price low to high<br />
                    <input type="radio"  name="sort" style={{fontSize:'5px'}} className="s2"   checked={sort == -1} onChange={() =>this.onSortChange('-1')} />Price high to low<br />
                </div>
    
            </div>
        </div>
        </div>


        <div className="col-sm-8 col-md-8 col-lg-8">
            {restaurants.length >0 ? restaurants.map((item)=>{
                return  <div className="item" onClick ={ () => this.handleClick(item._id)}> 
                <div className="row">
                    <div className="col-sm-4 col-sm-4 col-sm-4">
                        <img src= {require ('../Images/breakfast.png')} className="image-1" width="150px" height="150px" />
                    </div>
                    <div className="col-sm-8 col-sm-8 col-sm-8 section-1">
                    <div className="The-Big-Chill-Cakery">{item.name}</div>
                    <div className="FORT">{item.locality}</div>
            <div className="Shop-1-Plot-D-Samruddhi-Complex-Chincholi-"> {item.city_name}</div>
    
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-4 col-sm-4 col-sm-4">
                        <div className="Cuisine-type">Cuisine</div>
                        <div className="Cuisine-type">Cost for Two</div>
                    </div>
                    <div className="col-sm-8 col-sm-8 col-sm-8">
            <div className="bakery-type1"> {item.cuisine.map((item) => item.name + ', ')}</div>
                       <div className="bakery-type2">{item.cost}</div>  
                    </div>
                </div>
            
            </div> 
             

            }): <div className="data"> No Data Found</div>}
       
        
       </div>
        <div className="pagination" style={{ marginLeft: '17%', marginTop:' 4%'}}  >
                <a href="#">&laquo;</a>
               { pageCount.map((item)=>{
                   return  <a href="#">{item}</a>

                })}
                <a href="#">&raquo;</a>
               
              </div>
          
    
</div>
</div>
</div>
      )
      }  
        }
    
    export default Filter;