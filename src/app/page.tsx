'use client'

import styles from "./page.module.css";
import AddTask, { TaskContextType } from "./components/addtask";
import { createContext, useContext } from "react";
import { TaskProvider } from "./components/addtask";
import { TaskContext } from "./components/addtask";
import Row from './components/row'


const Home = () => {
  // const { tasks, setTasks } = useContext(TaskContext) as TaskContextType;
  return (
    <>
      <TaskProvider>
        <AddTask></AddTask>
        <div className={styles.page}>
          <Rows></Rows>
        </div>
      </TaskProvider>
    </>
  )
}

const TaskAmount = () => {
  const { tasks } = useContext(TaskContext) as TaskContextType;

  return (
    <p>tasks amount is: {tasks.length}</p>
  )
}

const Rows = () => {
  const { tasks } = useContext(TaskContext) as TaskContextType;

  const rowList = tasks.map((task, i) => {
      return <Row name={task.name} description={task.description} key={'task' + String(i)} keyProp={'task' + String(i)}></Row>
    }
  );

  return (
    <>
    {rowList}
    </>
  )
}

export default Home;