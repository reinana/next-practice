"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/app/utils/useAuth'

const CreateItem = () => {
    const loginUserEmail = useAuth()
    const [newItem, setNewItem] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        email: loginUserEmail
    })
    const router = useRouter()
    // console.log(loginUserEmail)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(newItem)
            })
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push("/")
        } catch (error) {
            console.log(error)

        }
    }
    if (loginUserEmail) {

        return (
            <div>
                <h1 className='page-title'>アイテム作成</h1>
                <form onSubmit={handleSubmit}>
                    <input value={newItem.title} onChange={handleChange} type="text" name='title' placeholder='アイテム名' required />
                    <input value={newItem.price} onChange={handleChange} type="text" name='price' placeholder='価格' required />
                    <input value={newItem.image} onChange={handleChange} type="text" name='image' placeholder='画像' required />
                    <textarea value={newItem.description} onChange={handleChange} name='description' rows={15} placeholder='商品説明' required></textarea>
                    <button>作成</button>
                </form>
            </div>
        )
    }
}

export default CreateItem

//eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZXhwIjoxNzM1ODUzMDUxfQ.1Kjo0AaPq4JHnFryQ8N8sIFUdTj5pPqTcfParEMbHvE