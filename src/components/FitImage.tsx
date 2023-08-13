import { Image, ImageURISource } from 'react-native'
import React, { useEffect, useState } from 'react'

interface Props {
    source: ImageURISource;
}

export default function FitImage({ source }: Props) {
    const [imgSize, setImgSize] = useState({ width: 0, height: 0});
    useEffect(() => {
        if (!source.uri) return;
        Image.getSize(source.uri, (width, height) => {
            setImgSize({width, height});
        });
    }, [source])

    return imgSize.width > 0 && imgSize.height > 0 
        ? <Image 
            source={source}
            style={{
                width: '100%',
                aspectRatio: imgSize.width / imgSize.height,
                resizeMode: 'contain'
            }}
        />
        : <></>;
}
