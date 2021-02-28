import React from 'react';
import '../Styles/Home.css';
import QuickSearchItem from './QuickSearchItem';


class QuickSearch extends React.Component{
    
    render(){
      const {meal} = this.props
      return(

        <div>
      

    <div className="quick-search">
        <h2>Quick Searches</h2>
        <span className="discover">Discover restatent by type of meal</span> 
     </div>

     <div className="container-fluid">
     <div className="row">
        {meal.map((item)=>{
            return <QuickSearchItem id={item._id} name = {item.name} content ={item.content} image={item.image}/>
        })} 
     
                </div>
        
        </div>
        </div>
        
    
      )
    }   
    }

    
    export default QuickSearch;