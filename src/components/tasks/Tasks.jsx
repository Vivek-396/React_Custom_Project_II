import React from 'react';
import taskObjCreate from "../../utils/createTaskObject";
import {ShowAll} from '../show/ShowAll';
import {ShowCompleted} from '../show/ShowCompleted';
import {ShowActive} from '../show/ShowActive';
import { BrowserRouter as Router,Link, Route, Switch, withRouter } from 'react-router-dom';

// const TAB_TYPE = {
//     SHOW_ALL: "SHOW_ALL",
//     SHOW_ACTIVE: "SHOW_ACTIVE",
//     SHOW_COMPLETED: "SHOW_COMPLETED" 
//   };

var count=0;

class Tasks extends React.Component {

    constructor (props) {

        super();

        this.state = {
             taskname : "",
             checked : false,
             visibleTab: "initial_screen"
        };
    }

    checkChange=(id,event)=>{

        const { active } = this.props;
        var index=-1;

        for(var i=0;i<active.tasks.length;i++)
        {
            if(active.tasks[i].id===id)
            {
                console.log("Remove",id);
                index=i;
                break;
            }
        }

        active.tasks[index].checked=event.target.checked;
        this.setState({active});
    }

    removeTask=(id,e,userId)=>{

        var index=-1;
        const { active } = this.props;
      
        for(var i=0;i<active.tasks.length;i++)
        {
            if(active.tasks[i].id===id)
            {
                console.log("Remove",id);
                index=i;
                break;
            }
        }
        active.tasks.splice(index, 1);
        
        this.setState({active});

        this.props.removeInTask(index,userId);
    }

    // changeTab = (val) => {
    //     this.setState({visibleTab: val});
    //   };
    
    // renderTab = () => {
        
    //     const { visibleTab } =this.state;

    //     switch(visibleTab) {
    
    //     case TAB_TYPE.SHOW_ACTIVE:
    //           return <ShowActive allTasks={this.props.active}/>;
    
    //     case TAB_TYPE.SHOW_COMPLETED: 
    //         return <ShowCompleted allTasks={this.props.active} />;
    
    //     case TAB_TYPE.SHOW_ALL:
    //         default :
    //         return <ShowAll allTasks={this.props.active} checkChange={this.checkChange} removeTask={this.removeTask}/>;
    //     }
    // }  

    // handleShowAll = () => {
    //     this.changeTab(TAB_TYPE.SHOW_ALL);
    // }

    // handleActive = () => {
    //     this.changeTab(TAB_TYPE.SHOW_ACTIVE);
    // }

    // handleCompleted = () => {
          
    //       this.changeTab(TAB_TYPE.SHOW_COMPLETED);
    // }

    handleTaskName = event => {
        //console.log(event.target.value);
        this.setState({ taskname : event.target.value });
    }

    handleCheckbox = event => {
      const { checked } = this.state;

        if(event.target != null){
            (checked === true) ? this.setState({ checked: false }) : this.setState({ checked: true }) 
        }
    }

    appendTasks = (event) => {

        event.preventDefault();

        const { taskname, checked } = this.state;
        var taskObj = new taskObjCreate(count,taskname,checked);
        count++;
        this.props.appendInTask(taskObj);

        this.setState((state)=>({taskname:""}));
        event.target.elements[1].checked=false;

        console.log(this.props);
        
    }

    render(){
        return(
          <div >
            <Router>
            <form className="add-tasks"  onSubmit = {this.appendTasks} >

            <label htmlFor="taskname"><b>Add Task</b> 
            <input type='text' value={this.state.taskname} placeholder="Enter Task name" onChange={this.handleTaskName} name="taskname" className="taskbar" required/>
            </label>
            <input type='checkbox' value={this.state.password}  onChange={this.handleCheckbox} name="checked" className="checkBtn"/>
            
            <button type="submit" className="addTaskBtn">Add Task</button>
            </form>
            
            <br/>

          <div className="header"> 
            <h2>Tasks - List</h2>
            <hr/>
            <Link to={this.props.match.url + `/${this.props.active.id}`}>
            <button type="button" className="taskBtn" >Show All Tasks</button>
            </Link>
            <Link to={this.props.match.url + `/${this.props.active.id}/active`}>
            <button type="button" className="taskBtn"  >Active Tasks</button>
            </Link>
            <Link to={this.props.match.url + `/${this.props.active.id}/completed`}>
            <button type="button" className="taskBtn"  >Completed Tasks</button>
            </Link>
          </div>

          <div className="lists">
              <Switch>
                  <Route path={this.props.match.url + `/${this.props.active.id}`} exact>
                     <ShowAll allTasks={this.props.active} checkChange={this.checkChange} removeTask={this.removeTask}/>   
                  </Route>
                  <Route path={this.props.match.url + `/${this.props.active.id}/active`}>
                    <ShowActive allTasks={this.props.active}/>
                  </Route>
                  <Route path={this.props.match.url + `/${this.props.active.id}/completed`}>
                    <ShowCompleted allTasks={this.props.active} />
                  </Route>
              </Switch>
            {/* {this.renderTab()} */}
          </div>
 
          </Router>
        </div>
      )
    }
}

export default withRouter(Tasks);