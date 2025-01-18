'use client'

import styles from './addtask.module.css'
import { createContext, Dispatch, JSX, ReactNode, SetStateAction, useContext } from 'react';
import { useState } from 'react';
import { DataContext, DataContextType } from './data';

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
    const {data, setData} = useContext(DataContext) as DataContextType;
    const [showPopup, setShowPopup] = useState(false);

    const confirm = () => { 
        if (showPopup) {

            let name_input: HTMLTextAreaElement | null = document.querySelector(`.${styles.name_input}`);
            let description_input: HTMLTextAreaElement | null = document.querySelector(`.${styles.description_input}`);
            let date_input: HTMLInputElement | null = document.querySelector(`.${styles.date_input}`);
            let titleData: string = document.querySelector("#title") instanceof HTMLInputElement && document.querySelector<HTMLInputElement>("#title")!.value || '';

            let name: string = name_input !== null && name_input.value || '';
            let description: string = description_input !== null && description_input.value || '';
            let date: string = date_input !== null && date_input.value || '';

            var newTasks = [...tasks, { name, description, date }];
            setTasks(newTasks);
            setShowPopup(false);
            var newData = {rows: newTasks, title: titleData}
            setData(newData)
            
            var stringData = JSON.stringify(newData);
            localStorage.setItem('data', stringData);

            return;
        }
        setShowPopup(true);
    }


    return (
        <>
            <button className={`${!showPopup && styles.add || styles.confirm}`} onClick={() => confirm()}>
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