import styles from './row.module.css'
import globe from '../../../public/check.png'
import Image from 'next/image'
import { ReactNode, useContext, useState } from 'react'
import { Component } from 'react'
import { TaskContext, TaskContextType } from './addtask'

const Row = ({ name, description, date, keyProp }: { name: string, description: string, date: string, keyProp: string }) => {

    return (
        <div className={styles.row} id='load'>
            <Checkmark keyProp={keyProp} />
            <div className={styles.inner_container}>
                <MainRowFeatures name={name} description={description} date={date} keyProp={keyProp}></MainRowFeatures>
            </div>
        </div>
    )
}

const Checkmark = ({ keyProp }: { keyProp: string }) => {
    const { tasks, setTasks } = useContext(TaskContext) as TaskContextType;
    const complete = () => {

        tasks.map((task, i) => {
            if (('task' + String(i)) == keyProp) {
                const newTasks = tasks.filter((_, index) => index !== i);
                setTasks(newTasks);
                return (
                    <></>
                )
            }
        }
        );
    }

    return (
        <button className={styles.checkmark} onClick={complete}>
            <Image src={globe} alt=''></Image>
        </button>
    )
}

const MainRowFeatures = ({ name, description, date, keyProp }: { name: string, description: string, date: string, keyProp: string }) => {

    const { tasks, setTasks } = useContext(TaskContext) as TaskContextType;

    const deleteRow = () => {
        tasks.map((task, i) => {
            if (('task' + String(i)) == keyProp) {
                const newTasks = tasks.filter((_, index) => index !== i);
                setTasks(newTasks);
                return (
                    <></>
                )
            }
        }
        );
    }

    if (date) {
        console.log(getDateDiff(date));
        console.log(checkDatePassed(date));
    }

    return (
        <>
            <textarea className={styles.inner} defaultValue={name} readOnly={true} disabled={true}>
            </textarea>
            <textarea className={styles.inner} defaultValue={description} readOnly={true} disabled={true}>
            </textarea>
            <textarea className={styles.inner} defaultValue={date} readOnly={true} disabled={true}>
            </textarea>
            <div className={`${styles.priority}`}>
                <button className={styles.red}></button>
                <button className={styles.yellow}></button>
                <button className={styles.blue}></button>
                <button className={styles.white}></button>
            </div>
            <button className={styles.inner} onClick={deleteRow}>
                <Image src='/garbage-can.png' alt='' className={styles.garbage} width={0} height={0}></Image>
            </button>
        </>
    )
}

const getDateDiff = (stringDate: string) => {
    const currentDate = new Date();
    const goalDate = new Date(stringDate);
    const diffTime = Math.abs(goalDate.getTime() - currentDate.getTime());
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    console.log(diffTime + " milliseconds");
    console.log(diffDays+1 + " days");

    return diffDays+1
}

const checkDatePassed = (stringDate: string): boolean => {
    const currentDate = new Date();
    const goalDate = new Date(stringDate);
    const diffTime = goalDate.getTime() - currentDate.getTime() + 8.64e+7;
    console.log('diff is:', diffTime)
    return diffTime < 0;
}

export default Row