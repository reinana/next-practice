import Link from "next/link"
import ImgBox from "./components/imgbox"
import connectDB from "./utils/database"
import { ItemModel } from "./utils/schemaModels"
export const dynamic = "force-dynamic"

interface Item {
    _id: string
    title: string
    price: string
    image: string
    description: string
}

const getAllItems = async() => {
    //APIサーバーにアクセスして全データを取得する書き方
    // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`)
    // const jsonData = await response.json()
    // console.log(jsonData)
    // const allItems = jsonData.allItems

    // RSCならデータ取得は直接アクセスできる
    await connectDB()
    const allItems = await ItemModel.find()
    return allItems
}
const ReadAllItems = async() => {

    const allItems: Item[] = await getAllItems()
    console.log(allItems)
    return (
        <div className="grid-container-in">
            {allItems.map(item => 
                <Link href={`/item/readsingle/${item._id}`} key={item._id}>
                    {item.image && <ImgBox src={item.image}/>}
                    <h2>{item.price}</h2>
                    <h3>{item.title}</h3>
                    <p>{item.description.substring(0,80)}</p>
                </Link>
            )}
        </div>
    )
}
export default ReadAllItems