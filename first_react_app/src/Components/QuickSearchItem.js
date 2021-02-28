import React from 'react';
import {withRouter} from 'react-router-dom';


class QuickSearchItem extends React.Component{
    handleClick = (Id) =>
    {
        this.props.history.push(`/filter/?mealtype_id=${Id}`);
    }
   render() {
       const { id , name , content, image} =this.props;
       return (
        <div className="col-sm-12 col-md-12 col-lg-4"   onClick ={() => this.handleClick(id)}>
        <div className="block-1">
                      <div className="imgitem1"><img src={require('../' + image)} className="img-1" width="90px" height="90px" /></div>
                       <div className="details-item1">
                           <div className="breakfast" >{name}</div>  
                                <div className="details1">{content}
                                </div>  
                            </div> 
                        </div>
                    </div>

       )
   }

    }
    export default withRouter(QuickSearchItem);