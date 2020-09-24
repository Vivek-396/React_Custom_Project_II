import React from 'react';
import { TaskCard } from '../task-card/Task-Card'; 
//import './ShowAll.css';

export const ShowCompleted = ({allTasks}) => (
    <div> 
        <h3>Completed Tasks</h3><hr/> { 
         allTasks.tasks.filter(function(task) {
             if (task.checked) {
               return true; // skip
             }
             return false;
           }).map( task => <TaskCard key={task.id} taskname={task.task} />)
        }
    </div>
);