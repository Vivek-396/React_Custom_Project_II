import React from 'react';
import './Card-list.css';

import { Card } from '../card/Card';

export const CardList = ({users, fillUps}) => (
 <div className='list'>
 <h1 className="user-list">User List</h1>
 <div className='card-list'>
       { users.map(user => (
        <Card key={user.id} user={user} fillUps={fillUps}/>
        )) }
</div>
</div>
);