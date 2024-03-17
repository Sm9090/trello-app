'use client'
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import DeleteImg from "../../assets/Delete.png"
import EditImg from "../../assets/Edit.png"
import LongMenu from '../OptionsMenu/OptionsMenu'


interface CardProps {
    name: string;
    data: string[]
}


function Card({name ,data }:CardProps) {

    const [input, setInput] = useState(false)
    const [list, setList] = useState(data)
    const [text, setText] = useState<string>("")
    const [editMode, setEditMode] = useState(false)
    const [editIndex, setEditIndex] = useState<number | null>(null)

    useEffect(() => {
        console.log('Received data:', data)
        setList(data) // Update the list state when data prop changes
    }, [data])

    const handleOpenInput = () => {
        setInput(true)
    }

    const addTodo = () => {
        setInput(false)
        const copyList = [...list]
        copyList.push(text)
        setList(copyList)
    }

    const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        console.log(value)
        setText(value)
    }
    const deleteItem = (index: number) => {
        const copyList = [...list]
        copyList.splice(index, 1)
        setList(copyList)
    }
    const editItem = (index: number, item: string) => {
        setEditIndex(index)
        setEditMode(true)
        setInput(true)
        setText(item)
    }
    const updateItem = () => {
        if (editIndex !== null) { 
            const updatedList = [...list];
            updatedList[editIndex] = text;
            setList(updatedList);
            setEditMode(false)
            setInput(false)
        }
    }

    
    return (
        <div>
            <div className='flex flex-col w-60 bg-white m-4 rounded-md p-3'>
                <div className='flex  justify-between w-full px-0.5'>
                    <div >
                        {name}
                    </div>
                    <div><LongMenu /></div>
                </div>
                <div>
                    <ul>
                        {list.map((item, index) => {
                            return <div className='border-solid border rounded-md w-full h-10 my-2 flex  p-2'>
                                <li className='text-left basis-4/5'>
                                    {item}
                                </li>
                                <button className="w-4 mx-1" onClick={() => deleteItem(index)}>
                                    <Image src={DeleteImg} alt="" />
                                </button>
                                <button className="w-4 mx-1" onClick={() => editItem(index, item)}>
                                    <Image src={EditImg} alt="" />
                                </button>
                            </div>
                        })}
                    </ul>
                </div>
                {input ?
                    <div className='w-full px-0.5'>
                        <input type="text" className='border-2 rounded-lg p-2 w-full' onChange={changeText} value={text} />
                        {editMode ?
                            <button onClick={updateItem}>Update</button>
                            :
                            <button onClick={addTodo}>Add Event</button>
                        }
                    </div>
                    :
                    <div className='flex  justify-between w-full px-0.5'>
                        <button onClick={handleOpenInput}>Add Card</button>
                        <button>img</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Card