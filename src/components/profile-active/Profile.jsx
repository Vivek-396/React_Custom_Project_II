import React from 'react';
import './Profile.css';

export const Profile = ({active,handleSignOut}) => (

 <div id='profile'>
       <div>
          <h1>Welcome to Task</h1>
          <h2>Active User</h2>
          <hr/>
          <button type="button" className="upperBtn" onClick={handleSignOut} >Sign Out</button>
          {active.length !== 0 ? 
              (<div className="details">
                  <p>Username : {active[0].username}</p>
                  <p>Name : {active[0].name}</p>
                  <p>Phone No. : {active[0].phone}</p>
                  <p>Email : {active[0].email}</p>
                  <hr/>
                </div>)
              : (<p>No one is active at this moment.</p>)}
          </div>
</div>
);