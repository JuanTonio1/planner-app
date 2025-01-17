import styles from './row.module.css'
import globe from '../../../public/check.png'
import Image from 'next/image'
import { ReactNode, useContext, useState } from 'react'
import { Component } from 'react'
import { TaskContext, TaskContextType } from './addtask'

const Row = ({ name, description, keyProp }: { name: string, description: string, keyProp: string }) => {

    return (
        <div className={styles.row} id='load'>
            <Checkmark keyProp={keyProp} />
            <div className={styles.inner_container}>
                <MainRowFeatures name={name} description={description}></MainRowFeatures>
            </div>
        </div>
    )
}

const Checkmark = ({ keyProp }: { keyProp: string }) => {
    const { tasks, setTasks } = useContext(TaskContext) as TaskContextType;
    const complete = () => {

        const rowList = tasks.map((task, i) => {
            if (('task' + String(i)) == keyProp) {
                console.log('length is:', tasks.length);
                const newTasks = tasks.filter((_, index) => index !== i);
                setTasks(newTasks);
                console.log('length is now:', tasks.length)
                console.log(tasks);
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

const MainRowFeatures = ({ name, description }: { name: string, description: string }) => {
    return (
        <>
            <div className={styles.inner}>
                {name}
            </div>
            <div className={styles.inner}>
                {description}
            </div>
            <div className={styles.inner}>

            </div>
            <div className={styles.inner}>
                Delete
            </div>
        </>
    )
}

export default Row