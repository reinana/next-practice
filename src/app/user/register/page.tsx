import React from 'react'

const Register = () => {
    const handleSubmit = () => {}
    return (
        <div>
            <h1>ユーザー登録</h1>
            <form>
                <input type="text" placeholder='名前' required />
                <input type="email" name="email" placeholder='メールアドレス' required />
                <input type="password" name="password" placeholder='パスワード' required />
                <button>登録</button>
            </form>
        </div>
    )
}

export default Register