import React from 'react';
import ObjCreate from "../../utils/createFormObject";
import { Link, withRouter } from 'react-router-dom';

class SignIn extends React.Component{
    constructor(props){
        super();

        this.state = {
          username: "",
          password:"",
          prefilledUsername: null
        };
    }

    static getDerivedStateFromProps(newProps,prevState){
      if(newProps.refill && newProps.refill !== prevState.prefilledUsername){
        return ({ username : newProps.refill , password : newProps.refill, prefilledUsername : newProps.refill });
      }
      return null;
    }

    // handleSignUp = () => {
    //   var val = "SIGN_UP";
    //   this.props.changeForm(val);

    // }

    handleChange = event => {
      const { value, name } = event.target;
      this.setState({ [name]: value });
    }


    signIn = (event) => {

      const { username, password} = this.state;
      event.preventDefault();
      var index=-1;
    
      if(username===password){
          var len = this.props.users.length;

          for(var i=0;i<len;i++){
              if(this.props.users[i].username === username){
                  index=i; break; 
          }}

          if(index!==-1){
              alert("Success");

              //Handle Login
              let ele = this.props.users[index];
              var objUser = new ObjCreate(index+1,ele.name,ele.username,ele.email,ele.phone,ele.website,ele.tasks);
              this.props.activeUser(objUser);

              this.props.history.push(`/profile/${objUser.id}`);

          }
          else{
            alert("User not present");
            //Revert Back to sign up
           // this.props.changeForm("SIGN_UP");
            //
          }
      }
      else{
          alert("Invalid Credentials");
          //this.props.changeForm("SIGN_IN");
          //
      }
    }

    render(){
        return(
          <div className="sign">
      
          <div className="header">
            <h1>Log In</h1>
            <p>Kindly fill details for log in.</p>

            <Link to='/'>
            <button type="button" className="upperBtn" onClick = {this.handleSignUp} >Sign Up</button>
            </Link>
          </div>
 
          <form className="form"  onSubmit = {this.signIn} >
            <label htmlFor="username"><b>Username</b> 
            <input type='text' value={(this.state.username)} placeholder="Enter Username" onChange={this.handleChange} name="username" required/>
            </label>
  
            <label htmlFor="phone"><b>Password</b> 
            <input type='password' value={(this.state.password)} placeholder="Enter Password" onChange={this.handleChange} name="password" required/>
            </label>

            <button type="submit">Log In</button>
          </form>
          
        </div>
      )
    }
}

export default withRouter(SignIn);