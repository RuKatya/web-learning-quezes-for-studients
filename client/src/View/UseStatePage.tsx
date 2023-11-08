import { useState } from 'react'

interface Tasks {
    title: string,
    done: boolean
}

const UseStatePage = () => {
    const [tasks, setTasks] = useState<Array<Tasks>>([])

    const hendleAddInput = () => {
        setTasks((task) => {
            return [...task, { title: "", done: false}]
        })
    };

    

    const hendleChanges = (ev: React.SyntheticEvent) => {
        console.log(ev)

        const target = ev.target as typeof ev.target & {
            value: string, id: string, name: string
        }

        const indexInput: number = Number(target.id)
        const nameInput: string = target.name
        
        setTasks(tasks => {
            const newArr: any[] = tasks.slice();
            newArr[indexInput][nameInput] = target.value // newArr[0]["title"]
            return newArr
        })
    }

    console.log(tasks)

    return (
        <div>
            {tasks.length === 0 ?
                <h2>No tasks here</h2> :
                tasks.map((task, index) => (
                    <form key={index}>
                        <input type='text' name="title" id={index.toString()} placeholder='Enter your task' onChange={hendleChanges}/>
                    </form>
                    // <div key={index}>
                    //     <div>Task : {task.title}</div>
                    //     <div>Done: {task.done}</div>
                    // </div>
                ))}
                <button onClick={hendleAddInput}>Add New</button>
                </div>
    )
}

export default UseStatePage