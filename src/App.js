import React from "react";
import "./App.css";

import { CardList } from "./components/card-list/Card-list";
import { Profile } from "./components/profile-active/Profile";
import SignIn from "./components/sign-in/Sign-in";
import SignUp from "./components/sign-up/Sign-Up";
import ObjCreate from "./utils/createFormObject";

const FORM_TYPE = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
  PROFILE: "PROFILE"
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      users: [],
      active: null,
      visibleForm: "initial_screen",
      prefill: null,
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
  }

  fillUps = (id) => {
    
    if (this.state.active === null) {
      //Test condition of logged in first then proceed

      if (id != null) {
        
       const { users } = this.state;
       var temp = users[id-1].username;

       this.handleChange(temp);

        this.changeForm("SIGN_IN");      
      }
    }
  };

  setStateSynchronous(stateUpdate) {
    return new Promise(resolve => {
    this.setState(stateUpdate, () => resolve());
    });
    }
    
    handleChange = async (temp) => {
    await this.setStateSynchronous(
    state => ({refill: temp})
    );
    };


  appendInTask = (newTask) => {

    const { users,active } =this.state;
    
    var activeId = this.state.active.id;

    active.tasks.push(newTask);
    this.setState({active});
    console.log("App.js Active Tasks ",active.tasks);

    users[activeId-1].tasks.push(newTask);
    this.setState({users});
    console.log("App.js Users ",users);
  } 

  removeInTask = (index,userId) => {
    
    const { users } = this.state;
    console.log("Removed in UserTasks :",users[userId-1]);
    this.state.users[userId-1].tasks.splice(index,1);
    this.setState({users});

  }

  appendUser = (newUser) => {
    const { users } = this.state;
    this.setState({ users: [...users,newUser] });
    this.setState({visibleForm: FORM_TYPE.SIGN_IN});
  };

  activeUser = (newUser) => {
    this.setState({ active: newUser });
    this.setState({visibleForm: FORM_TYPE.PROFILE });
  };

  changeForm = (val) => {
    //alert(val);
    this.setState({visibleForm: val});
  };

  handleSignOut = () => {
    this.setState({ active: null });
    this.setState({ refill: null });
    this.changeForm("SIGN_IN");
  }

  renderForm = () => {
    const { users ,visibleForm } = this.state;
    
    switch(visibleForm) {

    case FORM_TYPE.SIGN_IN:
          return (<SignIn users={users} activeUser={this.activeUser} changeForm={this.changeForm}  refill={this.state.refill}/>);

    case FORM_TYPE.PROFILE: 
        return (<Profile active={this.state.active} handleSignOut={this.handleSignOut} appendInTask={this.appendInTask} removeInTask={this.removeInTask}/>);

    case FORM_TYPE.SIGN_UP:
    default :
        return (<SignUp users={users} appendUser={this.appendUser} changeForm={this.changeForm}/>);

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
