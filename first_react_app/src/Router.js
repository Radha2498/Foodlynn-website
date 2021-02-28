import React from 'react';
import { BrowserRouter , Route} from 'react-router-dom';
import Home from './Components/Home';
import Filter from './Components/Filter';
import Details from './Components/Details';
 import Header from './Components/Header';


const Router = () =>{
  
return(
<BrowserRouter>
        <Header />
        
        <Route exact path="/" component={Home}></Route>
        <Route path="/filter" component={Filter}></Route>
        <Route path="/details" component={Details}></Route>

        

</BrowserRouter>

)

}

export default Router;