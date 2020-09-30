import React from "react";
import "./App.css";

import { CardList } from "./components/card-list/Card-list";
import { Profile } from "./components/profile-active/Profile";
import SignIn from "./components/sign-in/Sign-in";
import SignUp from "./components/sign-up/Sign-Up";
import ObjCreate from "./utils/createFormObject";

import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';

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
      refill: null,
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

        //this.changeForm("SIGN_IN");    
        this.props.history.push("/login"); 
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

    users[activeId-1].tasks.push(newTask);
    this.setState({users});
  } 

  removeInTask = (index,userId) => {
    
    const { users } = this.state;
    users[userId-1].tasks.splice(index,1);
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
    this.setState({visibleForm: val});
  };

  handleSignOut = () => {
    this.setState({ active: null });
    this.setState({ refill: null });
    //this.changeForm("SIGN_IN");
  }

  renderForm = () => {
    const { users ,visibleForm, active, refill } = this.state;
    
    switch(visibleForm) {

    case FORM_TYPE.SIGN_IN:
          return (<SignIn users={users} activeUser={this.activeUser} changeForm={this.changeForm}  refill={refill}/>);

    case FORM_TYPE.PROFILE: 
        return (<Profile active={active} handleSignOut={this.handleSignOut} appendInTask={this.appendInTask} removeInTask={this.removeInTask}/>);

    case FORM_TYPE.SIGN_UP:
    default :
        return (<SignUp users={users} appendUser={this.appendUser} changeForm={this.changeForm}/>);

    }
  }

  render() {
    const { users } = this.state;

    return (
      <div className="App">

      <Router>
        <CardList users={users} fillUps={this.fillUps} />

        {/* {this.renderForm()} */}
        
        <Switch>
          <Route path="/" exact>
            <SignUp users={users} appendUser={this.appendUser} changeForm={this.changeForm}/>   
          </Route>
          <Route path="/login">
            <SignIn users={users} activeUser={this.activeUser} changeForm={this.changeForm}  refill={this.state.refill}/>
          </Route>
          <Route path="/profile">
            <Profile active={this.state.active} handleSignOut={this.handleSignOut} appendInTask={this.appendInTask} removeInTask={this.removeInTask}/>
          </Route>
        </Switch>
        
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
