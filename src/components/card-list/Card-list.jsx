import React from 'react';
import './Card-list.css';

import { Card } from '../card/Card';

console.log("Card-List");

export const CardList = ({users, fillUps}) => (
 <div className='card-list'>
       <h1>User List</h1>
       { users.map(user => (
        <Card key={user.id} user={user} fillUps={fillUps}/>
        )) }
</div>
);