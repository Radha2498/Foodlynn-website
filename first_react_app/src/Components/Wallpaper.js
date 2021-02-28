import React from 'react';
import '../Styles/Home.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class  Wallpaper extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      suggestions : [],
      text : '',
      restaurants : []

    }
  }


  // onTextChange = (e) =>{
  //   const value = e.target.value;
  //   const { restaurants } = this.state;
  //   let suggestions = [];

  //   if(value.length > 0){
  //     suggestions = restaurants.filter(item=>item.name.toLowerCase().includes(value.toLowerCase()));
  //   }

  //   this.setState(()=>({
  //     suggestions ,
  //     text:value
  //   }))
  // }


  onTextChange = (e) => {
    const value = e.target.value;
    const { restaurants } = this.state;
    let suggestions = [];

    if (value.length > 0) {
        suggestions = restaurants.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    }
    this.setState(() => ({
        suggestions: suggestions,
        text: value
    }))
}

  selectedText(value){
    this.setState({
        text : value.name,
        suggestions : [],
    },
     ()=>{
       this.props.history.push(`/details/?restaurants=${value._id}`);
    })

  }

  // renderSuggestion = () =>{

  //   let {suggestions} = this.state;
  //   if(suggestions.length===0){
  //     return null;
  //   }
  //   return(
  //     <ul>
  //       {
  //       suggestions.map((item) => (<li onClick={()=> this.selectedText(item)}>{item.name}</li>))
  //       }
  //     </ul>
  //   )
  // }

  renderSuggestions = () => {
    let { suggestions } = this.state;

    if (suggestions.length === 0) {
        return null;
    }
    return (
        <ul >
            {
                suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{`${item.name}, ${item.city}`}</li>))
            }
        </ul>
    );
}


  handleChange = (event) =>{
    
    const area= event.target.value.split('-')[0];
    const city= event.target.value.split('-')[1];

    sessionStorage.setItem('area' , area);
    sessionStorage.setItem('city' , city)
    
    axios({
      method:'GET',
      url:`http://localhost:3003/getRestaurantsbycity/${area}`,
      headers: {'Content-Type' : 'application/json'},
  }).then(res => this.setState({ restaurants: res.data.restaurantList }))
      .catch(err => console.log(err))
}


  
   
    render(){
         const {city} =this.props;
         const {text} =this.state;
        
      return(
        <div>
         <h1 className="logo">F!</h1>
         <img src={require('../Images/home image.png')} className="image11" width=" 1345px;" height="500px"  />
         <div className="h4 ">Find the best restaurants, cafés, and bars</div>
         
        
             
        <div>
        <div>
        <select className="select-list"  style={{    marginLeft: '14%'}}onChange={this.handleChange}>
            <option value="0">Select</option>
            {                                             
              city.map((item, index )=>{
              // return <option key ={index} value={item.name}>{item.name}</option>
              // return <option key ={index} value={`${item.name}`}>{`${item.name}`}</option>
              return <option key ={index} value={`${item.location_id}-${item.city_id}`}>{`${item.name}`}</option>
             })}
        

        </select> 
        </div>
             {/* <div>
                <div id ="notebook">
                <input id="query"  type="text" onChange={this.onTextChange} value={text}/>
                {this.renderSuggestion()}
                </div>
             </div> */}
        <div >
       

        {/* <input  type="text" className="search" placeholder="Search for Restaurent" /><p><span className="glyphicon glyphicon-search search-icon" ></span></p> */}
        </div> 
        </div>

   
        </div>
        
    
      )
    }   
    }

    
    export default withRouter(Wallpaper);