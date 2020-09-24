import React from 'react';
import taskObjCreate from "../../utils/createTaskObject";
import {ShowAll} from '../show/ShowAll';
import {ShowCompleted} from '../show/ShowCompleted';
import {ShowActive} from '../show/ShowActive';

const TAB_TYPE = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_ACTIVE: "SHOW_ACTIVE",
    SHOW_COMPLETED: "SHOW_COMPLETED" 
  };

var count=0;

class Tasks extends React.Component {

    constructor (props) {

        super(props);

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

    changeTab = (val) => {
        this.setState({visibleTab: val});
      };
    
    renderTab = () => {
        
        const { visibleTab } =this.state;

        switch(visibleTab) {
    
        case TAB_TYPE.SHOW_ACTIVE:
              return <ShowActive allTasks={this.props.active}/>;
    
        case TAB_TYPE.SHOW_COMPLETED: 
            return <ShowCompleted allTasks={this.props.active} />;
    
        case TAB_TYPE.SHOW_ALL:
            default :
            return <ShowAll allTasks={this.props.active} checkChange={this.checkChange} removeTask={this.removeTask}/>;
        }
    }  

    handleShowAll = () => {
        this.changeTab(TAB_TYPE.SHOW_ALL);
    }

    handleActive = () => {
        this.changeTab(TAB_TYPE.SHOW_ACTIVE);
    }

    handleCompleted = () => {
          
          this.changeTab(TAB_TYPE.SHOW_COMPLETED);
    }

    handleTaskName = event => {
        //console.log(event.target.value);
        this.setState({ taskname : event.target.value });
    }

    handleCheckbox = event => {
        if(event.target != null){
            (this.state.checked === true) ? this.setState({ checked: false }) : this.setState({ checked: true }) 
        }
    }

    appendTasks = (event) => {

        event.preventDefault();
        
        var taskObj = new taskObjCreate(count,this.state.taskname,this.state.checked);
        console.log(taskObj);
        count++;
        this.props.appendInTask(taskObj);
    }

    render(){
        return(
          <div >
      
            <form className="add-tasks"  onSubmit = {this.appendTasks} >

            <label for="taskname"><b>Add Task</b> </label>
            <input type='text' value={this.taskname} placeholder="Enter Task name" onChange={this.handleTaskName} name="taskname" className="taskbar" required/>
            <input type='checkbox' value={this.password}  onChange={this.handleCheckbox} name="checked" className="checkBtn"/>
            
            <button type="submit" className="addTaskBtn">Add Task</button>
            </form>
            
            <br/>
          <div className="header"> 
            <h2>Tasks - List</h2>
            <button type="button" className="taskBtn" onClick={this.handleShowAll} >Show All Tasks</button>
            <button type="button" className="taskBtn" onClick={this.handleActive} >Active Tasks</button>
            <button type="button" className="taskBtn" onClick={this.handleCompleted} >Completed Tasks</button>
          </div>
          <div className="lists">
            {this.renderTab()}
          </div>
 
         
        </div>
      )
    }
}

export default Tasks;