import React from 'react';
import ObjCreate from "../../utils/createFormObject";

class SignUp extends React.Component{
    constructor(props){
        super();

        this.state = {
          id:"",
          name:"",
          username: "",
          email:"",
          phone:"",
          website:""
        };
    }

    handleSignIn = () => {
       alert("Yet to come");
      //console.log(this.props.users[0]);
    }

    handleChange = event => {
      const { value, name } = event.target;
      this.setState({ [name]: value });
    }

    signUp = (event) => {
      alert("Signed Up successfully");
      event.preventDefault();
      const id_e=(this.props.users.length+1);
      this.setState({ id : id_e });

      var objUser = new ObjCreate(id_e,this.state.name,this.state.username,this.state.email,this.state.phone,this.state.website);
      
      this.props.appendUser(objUser);
    }

    render(){
        return(
          <div id="signUp">
      
          <div>
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <button type="button" className="upperBtn" onClick = {this.handleSignIn} >Log In</button>
            <hr/>
          </div>
 
          <form className="SignUp"  onSubmit = {this.signUp} >

            <label for="name"><b>Name</b>  </label>
            <input type='text' value={this.name} placeholder="Enter Name" onChange={this.handleChange} name="name" required/>

            <label for="username"><b>Username</b> </label>
            <input type='text' value={this.username} placeholder="Enter Username" onChange={this.handleChange} name="username" required/>
  
            <label for="phone"><b>Phone No.</b> </label>
            <input type='number' value={this.phone} placeholder="Enter Phone No." onChange={this.handleChange} name="phone" required/>

            <label for="email"><b>Email</b> </label>
            <input type='email' value={this.email} placeholder="Enter Email" onChange={this.handleChange} name="email" required/>

            <label for="website"><b>Website</b> </label>
            <input type='text' value={this.website} placeholder="Enter Website" onChange={this.handleChange} name="website" required/>

            <button type="submit">Sign Up</button>
          
          </form>
        </div>
      )
    }
}

export default SignUp;