import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const getSingleItem = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`)
    const jsonData = await response.json()
    const singleItem = jsonData.singleItem
    // console.log(singleItem)
    return singleItem
}

const ReadShingleItem = async ({params}: { params: Promise<{ id: string }>}) => {
    const { id } = await params
    const singleItem = await getSingleItem(id)
    // console.log(singleItem)
    return (
        <div className='grid-container-si'>
            <div>
                {singleItem.image &&<Image src={singleItem.image} width={750} height={500} alt='item-image' priority/>}
            </div>
            <div>
                <h1>{singleItem.title}</h1>
                <h2>￥{singleItem.price}</h2>
                <hr />
                <p>{singleItem.description}</p>
                <div>
                    <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
                    <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
                </div>
            </div>
        </div>
    )
}

export default ReadShingleItem