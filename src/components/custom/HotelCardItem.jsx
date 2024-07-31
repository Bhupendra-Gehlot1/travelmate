import React from 'react'
import { Link } from 'react-router-dom'
import placeholder from '../../assets/placeholder.jpeg'
import { GetPlaceDetails } from '@/service/GooglePhotoApi';
import { PHOTO_REF_URL } from '@/service/GooglePhotoApi';
import { useState, useEffect } from 'react';

function HotelCardItem({ hotel }) {
    const [photoURL, setPhotoURL] = useState('');
    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel])
    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        }
        const result = await GetPlaceDetails(data).then(
            (response) => {
                const photoUrl = PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[0].name)
                setPhotoURL(photoUrl)
            })
    }
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ',' + hotel?.hotelAddress} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
            <div className='w-full h-[180px] '>
                <img src={photoURL?photoURL:placeholder} className='w-full h-[180px] rounded-xl object-cover' />
                </div>
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>
                        {hotel?.hotelName}
                    </h2>
                    <h2 className='text-sm text-gray-500'>
                        📍 {hotel?.hotelAddress}
                    </h2>
                    <h2 className='text-md'>
                        💸 {hotel?.price}
                    </h2>
                    <h2 className='text-md'>
                        ⭐ {hotel?.rating}
                    </h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem