import React from 'react'
import { Box } from '@mui/material'
import Image from 'next/image';
declare type ImgElementStyle = NonNullable<JSX.IntrinsicElements['img']['style']>;
// const imgType : React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
type Props = {
    src: string,
    alt: string,
    width: number | string,
    height: number | string,
    objectFit: ImgElementStyle["objectFit"],
    currentImgSelected: string,
    onClick?: (url: string) => void
};

const ImageItem = ({src,alt,width,height,objectFit,currentImgSelected,onClick}:Props) => {
    const cursor = onClick ? 'pointer' : 'default';
    const borderColor = currentImgSelected === src?"#ff4500":"#dedede";

    return (
        <Box 
            sx={{ 
                cursor:cursor, 
                padding: '3px',
                border: `1px solid ${borderColor}`,
                borderRadius: 1
            }}
            onClick={()=>onClick && onClick(src)}
            >
            <Box component="div" sx={{ position:'relative'}} width={width} height={height}>
                <Image src={src} objectFit={objectFit} alt={alt} layout="fill"/>
            </Box> 
        </Box>
    )
}

export default ImageItem;
