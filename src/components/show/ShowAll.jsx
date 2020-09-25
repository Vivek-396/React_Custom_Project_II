import React from 'react';
//import './ShowAll.css';

export const ShowAll = ({allTasks,checkChange,removeTask}) => (
    <div>
        <h3>Show All Tasks</h3><hr/>
        <ul>
        {
            allTasks.tasks.map(task => ( 
                <li key={task.id}>
                    { (task.checked) ? <input type='checkbox' name="checked" className="checkBtn" onChange={(e) => checkChange(task.id,e)} checked/> : <input type='checkbox' name="checked" className="checkBtn" onChange={(e) => checkChange(task.id,e)} />}
                    {task.task}
                    <button type="button" className="remove-btn" onClick={(e) => removeTask(task.id,e,allTasks.id)} >Remove</button>
                 </li>
                ) ) 
        }    
        </ul>
    </div>
);