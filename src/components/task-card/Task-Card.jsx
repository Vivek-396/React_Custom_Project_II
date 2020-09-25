import React from 'react';

export const TaskCard = (props) => (
    <li key={props.id}>{props.taskname}</li>
);