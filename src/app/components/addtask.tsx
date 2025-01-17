'use client'

import styles from './addtask.module.css'
import { createContext, Dispatch, JSX, ReactNode, SetStateAction, useContext } from 'react';
import { useState } from 'react';

export type rowData = {
    name: string,
    description: string,
    date: string,
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

    const clickHandle = () => { 
        if (showPopup) {

            let name_input: HTMLTextAreaElement | null = document.querySelector(`.${styles.name_input}`);
            let description_input: HTMLTextAreaElement | null = document.querySelector(`.${styles.description_input}`);
            let date_input: HTMLInputElement | null = document.querySelector(`.${styles.date_input}`);

            let name: string = name_input !== null && name_input.value || '';
            let description: string = description_input !== null && description_input.value || '';
            let date: string = date_input !== null && date_input.value || '';

            console.log('name is:', name);
            console.log('description is:', description);
            console.log('date is:', date)
            var newTasks = [...tasks, { name, description, date }];
            setTasks(newTasks);
            setShowPopup(false);
            return;
        }
        setShowPopup(true);
    }
    console.log(tasks.length)


    return (
        <>
            <button className={`${!showPopup && styles.add || styles.confirm}`} onClick={() => clickHandle()}>
                {showPopup && (
                    <p>Confirm?</p>
                ) || (
                    <p>Add Task</p>
                )}
            </button>
            {showPopup && (
                <>
                    <Cancel showPopup={showPopup} setShowPopup={setShowPopup}></Cancel>
                    <Popup></Popup>
                </>
            )}
        </>
    )
}

const Cancel = ({ showPopup, setShowPopup }: { showPopup: boolean, setShowPopup: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <button className={styles.cancel} onClick={() => {
            setShowPopup(false);
        }}>
            Cancel
        </button>
    )
}

const Popup = () => {
    return (
        <div className={styles.popup}>
                <textarea className={styles.name_input} name='name'></textarea>
                <textarea className={styles.description_input} name='description'></textarea>
                <input type='date' className={styles.date_input}></input>
                <div className={styles.side_description} id={styles.side1}>
                    Name
                </div>
                <div className={styles.side_description} id={styles.side2}>
                    Description
                </div>
                <div className={styles.side_description} id={styles.side3}>
                    Date
                </div>
            <div className={styles.name_display}>

            </div>
        </div>
    )
}

export default AddTask;