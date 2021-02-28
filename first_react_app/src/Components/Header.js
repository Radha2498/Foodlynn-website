import React from 'react';
import Modal from 'react-modal';
import '../Styles/Header.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
    //   background            : 'silver',
    //   border                : 'solid 2px black',
       color                 : 'black',
       padding               : '46px',
    //    height                : '342px',
       width                 : '349px'   
    }
  };


class Header extends React.Component{
    constructor(){
        super();
        this.state={
            signUpModelIsOpen : false,
            loginModelIsOpen : false,
            email :'',
            pwd :'',
            FN :'',
            LN :'',
            isLoggedIn:false
        }
    }

    signUp = () =>{
        this.setState({ signUpModelIsOpen : true});
    }

    login = () =>{
        this.setState({ loginModelIsOpen : true});
    }

    handleCancelSignUp =() => {
        this.setState({ signUpModelIsOpen : false});

    }

    handleCancelLogin =() => {
        this.setState({ loginModelIsOpen : false});

    }

    handleChange = (event ,state) =>{
        this.setState({ [state] : event.target.value});

    }

    handleSignUp = () =>{
        const {email, pwd, FN, LN} =this.state;
        const signUpObj = {
            email:email,
            password:pwd,
            firstname :FN,
            lastname:LN
        };
        axios({
            method:'POST',
            url:'http://localhost:3003/signUp',
            Header:{'Content-Type':'application/json'},
            data:signUpObj
        }).then(response =>{
            if(response.data.message=='User Signed Sucessfully'){
                this.setState({signUpModelIsOpen : false,
                    email :'',
                    pwd :'',
                    FN :'',
                    LN :''
                });
                alert(response.data.message);
                
            }
        })
        .catch(err=>console.log(err))
    }

    handleLogin =()=>{
        const {email , pwd} = this.state;
        const loginObj = {
            email:email,
            password:pwd
        
        };
        axios({
            method:'POST',
            url:'http://localhost:3003/login',
            Header:{'Content-Type':'application/json'},
            data:loginObj
        }).then(response =>{
        this.setState({ isLoggedIn :response.data.isAuthenticated, 
            loginModelIsOpen:false,
            email :'',
            pwd :''
        });
            sessionStorage.setItem('isLoggedIn',response.data.isAuthenticated);

        }).catch(err => console.log(err))

    }

    handleNavigate = () => {
        this.props.history.push("/");
        
    }
   

    render(){
        const {signUpModelIsOpen ,  loginModelIsOpen, email, pwd, FN, LN  } =this.state
        return(
            <div style ={{width:'100%' ,height:'43px',backgroundColor:'#ce0505',color:'white'}}>
                

                <button className="btn btn-Dark btn-sm enter"  onClick={this.login} style={{color: 'black',marginTop: '8px'}}><i>Login</i></button>
                <button className="btn btn-Dark btn-sm  sign" onClick={this.signUp} style={{color: 'black',marginTop: '6px',marginLeft: '10px'}}><i>Create an account</i></button>

                <div className="restlogo" style ={{color: 'red', borderRadius: '123%',
                 backgroundColor: 'white',marginLeft: '6%', width: '37px',fontSize: '29px',
                 fontFamily: 'times new roman', height: '36px',paddingLeft: '6px',marginTop:' -32px'}} onClick={this.handleNavigate}>F!</div>
                   
         <Modal
          isOpen={signUpModelIsOpen}
          style={customStyles}
        >
           <div className="logos">F!</div>
          
         <div className="input-group" style={{marginLeft: '37px'}}>
            <h3 style={{lineHeight:'31px',marginLeft: '28px',fontFamily:'serif', marginTop: '26px'}} >SignUp User</h3>
            <div><span> </span><input type ="text"     value={email} placeholder="Email"    className="form-control"  style={{height:'48px',width:'256px',     marginLeft:'-35px'}}    onChange={(event) => this.handleChange(event ,'email')} /></div>
            <div><span></span><input type ="password"  value={pwd}  placeholder="Password"  className="form-control"  style={{height:'48px',marginTop: '8px',  width:'256px',marginLeft:'-35px'}}    onChange={(event) => this.handleChange(event ,'pwd')}/></div>
            <div><span></span><input type ="text"      value={FN}   placeholder="FirstName" className="form-control"  style={{marginTop: '8px',height:'48px',  width:'256px',marginLeft:'-35px'}}    onChange={(event) => this.handleChange(event ,'FN')}/></div>
            <div><span></span><input type ="text"      value={LN}  placeholder="LastName"   className="form-control"  style={{marginTop: '8px',height:'48px',  width:'256px',marginLeft:'-35px'}}    onChange={(event) => this.handleChange(event ,'LN')}/></div>
            <button onClick={this.handleSignUp} className="btn btn-sm btn-danger" style={{marginTop: '19px', width:'128px',marginLeft:'-34px',height:'40px'}}>SignUp</button>
            <button className="btn btn-sm btn-danger" style={{marginTop: '19px',marginLeft:'7px', width:'120px',height:'40px'}} onClick={this.handleCancelSignUp}>Cancel</button>
            <hr/>
            <div>Already have an account?<a> Login</a></div>
         </div>
        
        </Modal>

        <Modal
          isOpen={loginModelIsOpen}
          style={customStyles}
        >
 
         
         <div className="input-group">
         <div className="logoos">F!</div>
            <h3 style={{lineHeight:'31px',marginLeft: '72px',fontFamily:'serif'}}>Login User</h3>
            {/* <div><span>Email        </span><input type ="text" style={{marginLeft:'51px'}}/></div>
            <div><span>Password     </span><input type ="text" style={{marginLeft:'27px'}}/></div> */}

            <div><span>   </span><input  className="logg" type ="text" className="form-control"  value={email}  placeholder="Email"      style={{marginLeft:'12px',width: '225px', fontFamily:'serif',height:'43px'}}    onChange={(event) => this.handleChange(event ,'email')}/></div>
            <div><span>   </span><input className="sup" type ="password" className="form-control"   value={pwd} placeholder="Password"   style={{marginLeft: '12px', width: '224px',fontFamily: 'serif',marginTop: '10px',height:'43px'}}  onChange={(event) => this.handleChange(event ,'pwd')}/></div>
           
            <button onClick={this.handleLogin} className="btn btn-sm btn-danger" style={{marginTop: '19px',marginLeft:'9px',height:'38px', width:'113px'}}>Login</button>
            <button className="btn btn-sm btn-danger" style={{marginTop: '19px',marginLeft:'7px',height:'38px',width:'113px'}} onClick={this.handleCancelLogin}>Cancel</button>
            <hr/>
            <div style={{marginLeft:'48px'}}>New to Foodlynn? <a>SignUp</a></div>
         </div>
          
        </Modal>

            </div>
            
        )
    }
}

export default withRouter(Header);

