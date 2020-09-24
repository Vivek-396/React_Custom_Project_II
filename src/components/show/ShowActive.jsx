import React from 'react';
import { TaskCard } from '../task-card/Task-Card'; 
//import './ShowAll.css';

export const ShowActive = ({allTasks}) => (
    <div>
        <h3>Active Tasks</h3>
        { 
         allTasks.tasks.filter(function(task) {
             if (!task.checked) {
               return true; // skip
             }
             return false;
           }).map( task => <TaskCard key={task.id} taskname={task.task} />)
        }
    </div>
);