import React from 'react';
import ObjCreate from "../../utils/createFormObject";

class SignIn extends React.Component{
    constructor(props){
        super();

        this.state = {
          username: "",
          password:"",
        };
    }

    componentDidMount(){}

    handleSignUp = () => {
        var val = "SIGN_UP";
      this.props.changeForm(val);
    }

    handleChange = event => {
      const { value, name } = event.target;
      this.setState({ [name]: value });
    }

    signIn = (event) => {
      event.preventDefault();
      var index=-1;
      //const {person} = this.state;

      if(this.props.refill!==null)
      {
        //alert(this.props.refill);
      }
     
      if(this.username===this.password){
          var len = this.props.users.length;

          for(var i=0;i<len;i++){
              //console.log(this.props.users[i].username," : ",this.state.username);
              if(this.props.users[i].username === this.state.username){
                  index=i;
              }
          }

          if(index!==-1){
              alert("Success");

              //Handle Login
              let ele = this.props.users[index];
              var objUser = new ObjCreate(index+1,ele.name,ele.username,ele.email,ele.phone,ele.website,ele.tasks);
              this.props.activeUser(objUser);
          }
          else{
            alert("User Not present in db");
            //Revert Back to sign up
            this.props.changeForm("SIGN_UP");
          }
      }
      else{
          alert("Failure");
          this.props.changeForm("SIGN_IN");
      }
    }

    render(){
        return(
          <div className="sign">
      
          <div className="header">
            <h1>Log In</h1>
            <p>Kindly fill details for log in.</p>

            <button type="button" className="upperBtn" onClick = {this.handleSignUp} >Sign Up</button>

          </div>
 
          
          <form className="form"  onSubmit = {this.signIn} >

            <label for="username"><b>Username</b> </label>
            <input type='text' value={this.username} placeholder="Enter Username" onChange={this.handleChange} name="username" required/>
  
            <label for="phone"><b>Password</b> </label>
            <input type='password' value={this.password} placeholder="Enter Password" onChange={this.handleChange} name="password" required/>

            <button type="submit">Log In</button>
  
          </form>
          
        </div>
      )
    }
}

export default SignIn;