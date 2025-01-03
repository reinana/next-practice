"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/app/utils/useAuth'
import { CldImage } from 'next-cloudinary'

const DeleteItem = ({ params }: { params: Promise<{ id: string }> }) => {
    const [item, setItem] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        email: ""
    })
    const loginUserEmail = useAuth()
    const router = useRouter()

    useEffect(() => {

        const getSingleItem = async () => {
            const { id } = await params
            const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`)
            const jsonData = await response.json()
            const singleItem = jsonData.singleItem
            // console.log(singleItem)
            setItem(singleItem)
        }
        getSingleItem()
    }, [params])

    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { id } = await params
        console.log(id)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(item)
            })
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push("/")
        } catch (error) {
            console.log(error)
            alert("アイテム削除失敗")

        }
    }
    if (loginUserEmail === item.email) {

        return (
            <div>
                <h1 className='page-title'>アイテム削除</h1>
                <form onSubmit={handleSubmit}>
                    <h2>{item.title}</h2>
                    {item.image && <CldImage src={item.image} width={750} height={500} alt='item-image' priority />}
                    <h3>{item.price}</h3>
                    <p>{item.description}</p>
                    <button>削除</button>
                </form>
            </div>
        )
    } else {
        return <div>
            <h1>権限がありません</h1>
        </div>
    }
}

export default DeleteItem