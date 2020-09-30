import React from 'react';
import './Profile.css';
import  Tasks  from '../tasks/Tasks';
import { Link } from 'react-router-dom';

//()=>handleSignOut(active.id) onClick of handleSignOut

export const Profile = ({active,appendInTask,removeInTask}) => (

 <div className='sign'>
       <div className="header">
          <h1>Profile Page</h1>
          <h2>Active User</h2>

          <Link to="/login"><button type="button" className="upperBtn" >Sign Out</button></Link>
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