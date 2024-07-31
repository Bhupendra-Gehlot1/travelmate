import React from 'react'
import placeholder from '../../assets/placeholder.jpeg'
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '@/service/GooglePhotoApi';
import { PHOTO_REF_URL } from '@/service/GooglePhotoApi';
import { useState, useEffect } from 'react';

function PlaceCardItem({ place }) {
    const [photoURL, setPhotoURL] = useState('');
    useEffect(() => {
        place && GetPlacePhoto();
    }, [place])
    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place?.placeName
        }
        const result = await GetPlaceDetails(data).then(
            (response) => {
                const photoUrl = PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[0].name)
                setPhotoURL(photoUrl)
            })
    }
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer'>
                <div className='w-[200px] h-[140px] '>
                <img src={photoURL?photoURL:placeholder} className='w-[160px] h-[140px] rounded-xl object-cover' />
                </div>
                <div>
                    <h2 className='font-bold text-xl'>{place.placeName}</h2>
                    <p className='text-md text-gray-500'> {place.details}</p>
                    <h2 className='mt-2 '>🌟 {place.rating}</h2>
                    <h2 className='mt-2 '>🎟️ {place.ticketPricing}</h2>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem