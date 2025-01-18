import styles from './data.module.css'
import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { ReactNode } from 'react';
import { rowData } from './addtask';
import { title } from 'process';

export type dataType = {
    rows: rowData[],
    title: string
}

export type DataContextType = {
    data: dataType,
    setData: React.Dispatch<React.SetStateAction<dataType>>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<dataType>({ rows: [], title: '' });

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
}

// const Data = () => {
//     return (
//         <div className={styles.container}>
//             <Import></Import>
//             <Export></Export>
//         </div>
//     )
// }

// const Import = () => {
//     const click = () => {

//     }
//     return (
//         <button onClick={click} className="">Import</button>
//     )
// }

// const Export = () => {
//     const click = () => {

//     }
//     return (
//         <button onClick={click} className="">Export</button>
//     )
// }

// export default Data;