import React from 'react';
import './Profile.css';
import  Tasks  from '../tasks/Tasks';

export const Profile = ({active,handleSignOut,appendInTask,removeInTask}) => (

 <div className='sign'>
       <div className="header">
          <h1>Welcome to Task</h1>
          <h2>Active User</h2>

          <button type="button" className="upperBtn" onClick={()=>handleSignOut(active.id)} >Sign Out</button>
        </div>
        <div className="form">
          {active !== null ? 
              (<div>
                <div className="details">
                  <h2>{active.username}</h2><hr/> 
                  <p>Name : {active.name}</p>
                  <p>Phone No. : {active.phone}</p>
                  <p>Email : {active.email}</p>
                  </div>
                  <br/>
                  <Tasks active={active} appendInTask={appendInTask} removeInTask={removeInTask}/>

                </div>)
              : (<p>No one is active at this moment.</p>)}
          </div>
</div>
);