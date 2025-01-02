"use client"

import React, { useState } from "react"

const Register = () => {
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async(e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        } catch (error) {
            console.log(error)
            alert("ユーザー登録失敗")
        }
    }
    return (
        <div>
            <h1 className="page-title">ユーザー登録</h1>
            <form onSubmit={handleSubmit}>
                <input value={newUser.name} onChange={handleChange} type="text" placeholder='名前' required />
                <input value={newUser.email} onChange={handleChange} type="email" name="email" placeholder='メールアドレス' required />
                <input value={newUser.password} onChange={handleChange} type="password" name="password" placeholder='パスワード' required />
                <button>登録</button>
            </form>
        </div>
    )
}

export default Register