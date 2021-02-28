import React from 'react';
import '../Styles/Home.css';
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';
import axios from 'axios';

class Home extends React.Component{

    constructor(){
        super();
        this.state={
           
            locations:[],
            mealtypes:[]
        }
    }
 
    componentDidMount() {
 
      
        axios({                                                  
            method:'GET',
            url:'http://localhost:3003/location',
            headers:{'Content-Type':'application/json'}
        }).then(response =>this.setState({locations:response.data.location}))
        .catch(err=>console.log(err))

        axios({
            method:'GET',
            url:'http://localhost:3003/mealtype',
            headers:{'Content-Type':'application/json'}
        }).then(response =>this.setState({mealtypes:response.data.mealtype}))
        .catch(err=>console.log(err))
    }
  
    render(){
        const { locations ,mealtypes} = this.state;
      return(
        <React.Fragment>
        <Wallpaper city={locations}/>
        <QuickSearch meal={mealtypes}/>
        </React.Fragment>  
    
      )
    }   
    }

    
    export default Home;