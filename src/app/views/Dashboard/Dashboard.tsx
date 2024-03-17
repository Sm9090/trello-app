'use client'
import Card from '@/app/components/Cards/Card'
import Navbar from '@/app/components/Header/Navbar'
import Input from '@/app/components/Input/Input'
import Sidebar from '@/app/components/SideBar/Sidebar'
import React, { useState } from 'react'

function Dashboard() {
  const [cards, setCards] = useState<{ name: string, data: string[] }[]>([
    { name: "Do", data: [] },
    { name: "Doing", data: [] },
    { name: "Complete", data: [] },
  ])

  const addItemToCard = (text: string, selectedOption: string) => {
    console.log('input se jo text arha', text)
    console.log('input se jo selectedOption arha', selectedOption)

    const updatedCards = [...cards]; 
    const cardIndex = updatedCards.findIndex(card => card.name === selectedOption);
    console.log('Card Index ===>', cardIndex)
    if (cardIndex !== -1) {
      updatedCards[cardIndex].data.push(text);
      setCards(updatedCards)
    }
  }
  return (
    <div className='h-screen w-screen bg-emerald-200'>
      <Navbar />
      <div className='flex h-4/5'>
        <Sidebar />
        <div className='w-full p-2 flex flex-col items-center'>
          <div className='w-2/5'>
            <Input onAddItem={addItemToCard} />
          </div>
          <div className='flex'>
            {cards.map((card, index) => (
              <Card key={index} name={card.name} data={card.data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard