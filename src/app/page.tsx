'use client'

import styles from "./page.module.css";
import AddTask, { TaskContextType } from "./components/addtask";
import { createContext, JSX, useContext, useEffect } from "react";
import { TaskProvider } from "./components/addtask";
import { TaskContext } from "./components/addtask";
import Row from './components/row'
import { DataContext, DataContextType, DataProvider, dataType } from "./components/data";
import { title } from "process";
import './style/globals.css'
import { getTitle } from "./utils/get-title";


const Home = () => {
  // const { tasks, setTasks } = useContext(TaskContext) as TaskContextType;
  return (
    <>
      <DataProvider>
        <TaskProvider>
          <AddTask></AddTask>
          <div className={styles.page}>
            <Header></Header>
            <Rows></Rows>
          </div>
        </TaskProvider>
      </DataProvider>
    </>
  )
}

const Header = () => {

  const { data, setData } = useContext(DataContext) as DataContextType;

  const saveOnChange = () => {
    var stringData = JSON.stringify({rows: data.rows, title: getTitle()} as dataType) as string
    localStorage.setItem('data', stringData);
  }

  useEffect(() => {
    const title: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#title")
    if (title) {
      title.value = data.title
    }
  }, [data])

  return (
    <div className={styles.header}>
      <input type="text" placeholder="Enter Title" id="title" onChange={saveOnChange}></input>
    </div>
  )
}

const TaskAmount = () => {
  const { tasks } = useContext(TaskContext) as TaskContextType;

  return (
    <p>tasks amount is: {tasks.length}</p>
  )
}

const Rows = () => {
  const { tasks, setTasks } = useContext(TaskContext) as TaskContextType;
  const { data, setData } = useContext(DataContext) as DataContextType;

  const rowList = tasks.map((task, i) => {
    return <Row name={task.name} description={task.description} date={task.date} key={'task' + String(i)} keyProp={'task' + String(i)}></Row>
  }
  );

  useEffect(() => {
    // Check if localStorage is available (important for SSR)
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('data'); // Replace 'myDataKey' with your key
      if (savedData) {
        var parsedData = JSON.parse(savedData) as dataType
        setData(parsedData); // Parse JSON data and set it to state
        setTasks(parsedData.rows)
      }
    }
  }, []);


  return (
    <>
      {rowList}
    </>
  )
}

export default Home;