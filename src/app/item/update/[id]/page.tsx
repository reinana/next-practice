"use client"
import useAuth from '@/app/utils/useAuth'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UpdateItem = ({ params }: { params: Promise<{ id: string }> }) => {
    const loginUserEmail = useAuth()
    const [newItem, setNewItem] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        email: ""
    })
    const router = useRouter()

    useEffect(() => {

        const getSingleItem = async () => {
            const { id } = await params
            const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`)
            const jsonData = await response.json()
            const singleItem = jsonData.singleItem
            console.log(singleItem.email)
            setNewItem(singleItem)
        }
        getSingleItem()
    }, [params])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { id } = await params
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${id}`, {
                method: "PUT",
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
            alert("アイテム編集失敗")

        }
    }
    if (loginUserEmail === newItem.email) {

        return (
            <div>
                <h1 className='page-title'>アイテム編集</h1>
                <CldUploadWidget uploadPreset="next-market-22"
                    onSuccess={(results) => {
                        const info = results.info as CloudinaryUploadWidgetInfo;
                        const publicId = info.public_id; // 取得したpublic_id
                        setNewItem((prevItem) => ({
                          ...prevItem, // 既存の状態を維持
                          image: publicId, // imageフィールドを更新
                        }));
                    }}
                >
                    {({ open }) => {
                        return (
                            <button onClick={() => open()}>
                                Upload an Image
                            </button>
                        );
                    }}
                </CldUploadWidget>
                <form onSubmit={handleSubmit}>
                    <input value={newItem.title} onChange={handleChange} type="text" name='title' placeholder='アイテム名' required />
                    <input value={newItem.price} onChange={handleChange} type="text" name='price' placeholder='価格' required />
                    <input value={newItem.image} type="text" name='image' placeholder='画像' readOnly required />
                    <textarea value={newItem.description} onChange={handleChange} name='description' rows={15} placeholder='商品説明' required></textarea>
                    <button>編集</button>
                </form>
            </div>
        )
    } else {
        <h1>権限がありません</h1>
    }
}

export default UpdateItem