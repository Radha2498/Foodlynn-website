import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


class Details extends React.Component{
  placeOrder = () =>{
    if(sessionStorage.getItem("isLoggedIn")){
       alert('Order Placed Successfully!!!' );
     }
     else{
        alert("please Login to place the Order");
     }
    
      
  }
  
  
  
   constructor() {
     super();
     this.state = {
    restaurant :{}


     }
   }



   componentDidMount(){
    const restId = this.props.location.pathname.split('/')[2];
    axios({
      method:'GET',
      url:'http://localhost:3003/getResById/' + restId ,
      headers:{'Content-Type':'application/json'}

    }).then(res =>this.setState({restaurant :res.data.restaurant}))
    .catch(err=>console.log(err))

   }

    handleNavigateDetails = () => {
         this.props.history.push(`/filter/?mealtype_id=${1}`);
       
    }


    render(){
      const {restaurant} = this.state;
      return(
        
        
        <div>
          
            {/* <img src = {require ('../Images/home image.png')} className='newimage' style ={{ maxHeight: '426px',width: '100%'}}/> */}
            {restaurant != null ?
            <React.Fragment>
            <Carousel>
              {restaurant && restaurant.thumb && restaurant.thumb.map((item =>{
                return  <div>
                <img src={item} />
                
            </div>
              }))}
               
               
            </Carousel>
           
            <Tabs>
            <TabList>
            <Tab>Overview</Tab>
            <Tab>Contact</Tab>
            <Tab>Payment</Tab>
            </TabList>
 
            <TabPanel>
             <div style ={{fontFamily:'times new roman'}}> 
            <h2 style ={{color:"darkblue"}}>About the places</h2>
            <h3>Cuisine</h3>
            <h5>{restaurant.cuisine_name}</h5>
            <h3>Avarage Cost</h3>
            <h5>₹{restaurant.cost}</h5>
            </div>

            </TabPanel>

            <TabPanel>
            <div style ={{fontFamily:'times new roman'}}> 
            <h3>Phone number</h3>
            <h5>{restaurant.contact_number}</h5>
            <h3>Restaurant name</h3>
            <h5>{restaurant.name}</h5>
            <h3>Address</h3>
            <h5>{restaurant.address}</h5>
            </div>
            </TabPanel>

            <TabPanel>
            <div style ={{fontFamily:'times new roman'}}>   
            <h2 style ={{color:"darkblue"}}>Place Order</h2>
            <h3>{restaurant.name}</h3> 
            <h5>Panner Tikka Masala</h5> 
            <h5>Cost ₹{restaurant.cost}</h5>
            <h5>Payment Mode : Cash</h5>
            {/* <button  onClick = { (button) =>this.placeOrder(button)}>Place Order</button> */}
            <button className="btn-sm btn btn-danger" style={{width:'154px'}} onClick = {this.placeOrder}>Place Order</button>
           </div>
            </TabPanel>

            </Tabs>
            </React.Fragment> : null }

            <button className="btn-sm btn btn-danger" style={{position:'absolute', marginTop:'7px',width:'153px'}} onClick={this.handleNavigateDetails}>Go back</button>
              
        </div>
    
      )
    }  
    }
    
    export default Details;