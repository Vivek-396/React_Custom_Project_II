import React from 'react';
import ObjCreate from "../../utils/createFormObject";
import {Link, withRouter} from 'react-router-dom';

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

    // handleSignIn = (e) => {
    //    var val = "SIGN_IN";
    //    this.props.changeForm(val);
    // }

    handleChange = event => {
      const { value, name } = event.target;
      this.setState({ [name]: value });
    }

    signUp = (event) => {
      const{ name, username, email, phone, website } =this.state;
       
      alert("Signed Up successfully");
      event.preventDefault();
      const id_e=(this.props.users.length+1);
      this.setState({ id : id_e });

      var objUser = new ObjCreate(id_e,name,username,email,phone,website);
      
      this.props.appendUser(objUser);

      this.props.history.push('/login');
    }

    render(){
        return(
          <div className="sign">
          
          <div className="header" >
            <h1 >Sign Up</h1>
            <p>Please fill in this form to create an account.</p>

            <Link to="/login">
            <button type="button" className="upperBtn" onClick = {this.handleSignIn} >Log In</button>
            </Link>

          </div>
 
          <form className="form"  onSubmit = {this.signUp} >

            <label htmlFor="name"><b>Name</b> 
            <input type='text' value={this.state.name} placeholder="Enter Name" onChange={this.handleChange} name="name" required/>
            </label>
 
            <label htmlFor="username"><b>Username</b>
            <input type='text' value={this.state.username} placeholder="Enter Username" onChange={this.handleChange} name="username" required/>
            </label>

            <label htmlFor="phone"><b>Phone No.</b>
            <input type='number' value={this.state.phone} placeholder="Enter Phone No." onChange={this.handleChange} name="phone" required/>
            </label>

            <label htmlFor="email"><b>Email</b>
            <input type='email' value={this.state.email} placeholder="Enter Email" onChange={this.handleChange} name="email" required/>
            </label>

            <label htmlFor="website"><b>Website</b>
            <input type='text' value={this.state.website} placeholder="Enter Website" onChange={this.handleChange} name="website" required/>
            </label>

            <button type="submit">Sign Up</button>

          </form>
        </div>
      )
    }
}

export default withRouter(SignUp);