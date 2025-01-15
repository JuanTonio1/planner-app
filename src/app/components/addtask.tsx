'use client'

import styles from './addtask.module.css'
import { createContext, JSX, ReactNode, useContext } from 'react';
import { useState } from 'react';

export type rowData = {
    name: string,
    description: string,
}

export type TaskContextType = {
    tasks: rowData[],
    setTasks: React.Dispatch<React.SetStateAction<rowData[]>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<rowData[]>([]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
}

const AddTask = () => {
    const { tasks, setTasks } = useContext(TaskContext) as TaskContextType;
    const [showPopup, setShowPopup] = useState(false);

    const clickHandle = (name?: string, description?: string) => {
        if (!name) {
            name = '';
        }
        if (!description) {
            description = '';
        }
        var newTasks = [...tasks, { name, description}];
        setTasks(newTasks);
        setShowPopup(true);
        console.log(newTasks);
    }
    console.log(tasks.length)

    return (
        <>
            <button className={styles.add} onClick={() => clickHandle()}></button>
            {showPopup && (
                <>
                    {/* <div className={styles.background}>

                    </div> */}
                <Popup></Popup>
                </>
            )}
        </>
    )
}

const Popup = () => {
    return (
        <div className={styles.popup}>
            hey
        </div>
    )
}

export default AddTask;