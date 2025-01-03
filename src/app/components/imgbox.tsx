"use client"
import { CldImage } from 'next-cloudinary'
import React from 'react'

interface ImgBoxProps {
    src: string;
}
const ImgBox: React.FC<ImgBoxProps> = ({ src }) => {
    return (
        <CldImage src={src} width={750} height={500} alt="item-image" priority />
    )
}

export default ImgBox