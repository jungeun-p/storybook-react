import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../lib/store';
import Task from './Task';
import TaskList from './TaskList';

function InboxScreen() {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.taskbox);
    useEffect(() => {
        dispatch(fetchTasks());
    }, []);
    return (
        <div className="page lists-show">
            {error ? (
                <div className="wrapper-message">
                    <span className="icon-face-sad" />
                    <div className="title-message">Oh no!</div>
                    <div className="subtitle-message">Something went wrong</div>  
                </div> 
            ):(
                <nav>
                    <h1 className="title-page">
                        <span className="title-wrapper">TaskBox</span>
                    </h1>
                    <TaskList />
                </nav>
            )}            
        </div>
    );
}

export default InboxScreen;