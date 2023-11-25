import React, { useReducer } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

// Action types
const ADD_TASK = 'ADD_TASK';
const TOGGLE_TASK = 'TOGGLE_TASK';

// Reducer function
const taskReducer = (state, action) => {
    switch (action.type) {
        case ADD_TASK:
            return [...state, { id: Date.now(), text: action.payload, isVisible: true }];
        case TOGGLE_TASK:
            return state.map((task) =>
                task.id === action.payload ? { ...task, isVisible: !task.isVisible } : task
            );
        default:
            return state;
    }
};

const TaskList = () => {
    const [tasks, dispatch] = useReducer(taskReducer, []);
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
      }, [tasks]);

    const addTask = (text) => {
        dispatch({ type: ADD_TASK, payload: text });
    };

    const toggleTask = (id) => {
        dispatch({ type: TOGGLE_TASK, payload: id });
    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        inputRef.current.focus();
      };
    return (
        <div>
            <h2>Daily Tasks</h2>
            <input
                ref={inputRef}
                type="text"
                placeholder="Add a new task"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addTask(e.target.value);
                        e.target.value = '';
                    }
                }}
            />
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.isVisible ? (
                            <>
                                {task.text}{' '}
                                <button onClick={() => toggleTask(task.id)}>Toggle</button>
                            </>
                        ) : (
                            <>
                                The Content is Hidden{' '}
                                <button onClick={() => toggleTask(task.id)}>Toggle</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={scrollToTop}>Scroll to Top</button>
         
        </div>
    );
};

export default TaskList;
