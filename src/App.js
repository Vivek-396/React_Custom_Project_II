import React from "react";
import "./App.css";

import { CardList } from "./components/card-list/Card-list";
import { Profile } from "./components/profile-active/Profile";
import SignIn from "./components/sign-in/Sign-in";
import SignUp from "./components/sign-up/Sign-Up";
import ObjCreate from "./utils/createFormObject";


const FORM_TYPE = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SING_UP",
  PROFILE: "PROFILE" 
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      users: [],
      active: [],
      visibleForm: "initial_screen"
    };
  }

  fetchUsers=()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        let formattedUsers = users.map(
          (el) =>
            new ObjCreate(
              el.id,
              el.name,
              el.username,
              el.email,
              el.phone,
              el.website
            )
        );
        this.setState({users: formattedUsers});
      });
  }

  componentDidMount() {
    this.fetchUsers();
    //this.setState({visibleForm: this.FORM_TYPE.SIGN_UP});
  }

  fillUps = (id) => {
    //alert("Yet to come...");

    if (this.state.active.length === 0) {
      //Test condition of logged in first then proceed
      var ele = document.getElementById("signIn");
      ele.style.display = "block";
      document.getElementById("signUp").style.display = "none";

      //console.log(this.state.users[el-1].username);

      if (id != null) {
        var index = id.target.getAttribute("id");
        var form_ele = document.getElementsByClassName("SignIn");
        form_ele[0].username.value = this.state.users[index - 1].username;
        form_ele[0].psw.value = this.state.users[index - 1].username;
        //console.log(id.target.getAttribute('id'));
      }
    }
  };

  appendUser = (newUser) => {
    this.setState({ users: [...this.state.users, newUser] });
    this.setState({visibelForm: FORM_TYPE.SIGN_IN});
  };

  activeUser = (newUser) => {
    this.setState({ active: [...this.state.active, newUser] });
    this.setState({visibelForm: FORM_TYPE.PROFILE });
  };

  renderForm = () => {
    const { users ,visibleForm } = this.state;
    console.log(visibleForm);
    
    switch(visibleForm) {

    case FORM_TYPE.SIGNIN:
        return <SignIn users={users} activeUser={this.activeUser}/>;

    case FORM_TYPE.SIGNUP:
        return <SignUp users={users} appendUser={this.appendUser}/>;

    case FORM_TYPE.PROFILE:
        return <Profile active={this.state.active} handleSignOut={this.handleSignOut}/>;
    
    default :
        return <SignUp users={users} appendUser={this.appendUser}/>;

    }
  }

  render() {
    const { users } = this.state;

    return (
      <div className="App">
        <CardList users={users} fillUps={this.fillUps} />
        {this.renderForm()}
      </div>
    );
  }
}

export default App;
