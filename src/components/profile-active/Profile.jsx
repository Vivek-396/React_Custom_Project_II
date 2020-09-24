import React from 'react';
import './Profile.css';

import  Tasks  from '../tasks/Tasks';

export const Profile = ({active,handleSignOut,appendInTask,removeInTask}) => (

 <div id='profile'>
       <div>
          <h1>Welcome to Task</h1>
          <h2>Active User</h2>
          <hr/> 
          <button type="button" className="upperBtn" onClick={()=>handleSignOut(active.id)} >Sign Out</button>
          {active !== null ? 
              (<div className="details">
                  <h2>Username : {active.username}</h2> 
                  <p>Name : {active.name}</p>
                  <p>Phone No. : {active.phone}</p>
                  <p>Email : {active.email}</p>
                  <hr/>

                  <Tasks active={active} appendInTask={appendInTask} removeInTask={removeInTask}/>

                </div>)
              : (<p>No one is active at this moment.</p>)}
          </div>
</div>
);