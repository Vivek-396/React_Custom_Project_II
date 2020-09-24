import React from 'react';
//import './Card.css';

export const TaskCard = (props) => (
    <li key={props.id}>{props.taskname}</li>
);