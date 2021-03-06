import React from 'react';
import './Card.css';

console.log("Card");

export const Card = ({user, fillUps}) => (
     <div className="card-container" onClick={()=>fillUps(user.id)} id={user.id}>
         <h2>{user.name}</h2>
         <h3 className="userName">{user.username}</h3>
         <h3>{user.email}</h3>
         <h3>{user.phone}</h3>
         <h3>{user.website}</h3>
    </div>
);