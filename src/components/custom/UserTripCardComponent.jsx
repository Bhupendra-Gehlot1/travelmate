import React from 'react'
import placeholder from '../../assets/placeholder.jpeg'
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '@/service/GooglePhotoApi';
import { PHOTO_REF_URL } from '@/service/GooglePhotoApi';
import { useState, useEffect } from 'react';



function UserTripCardComponent({ trip }) {
    const [photoURL, setPhotoURL] = useState('');
    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])
    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(
            (response) => {
                const photoUrl = PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[0].name)
                setPhotoURL(photoUrl)
            })
    }
    return (
        <Link to={'/view-trip/' + trip.id}>
            <div className='hover:scale-105 transition-all'>
                <div className='w-full h-[180px] '>
                    <img src={photoURL ? photoURL : placeholder} className='w-full h-[180px] rounded-xl object-cover' />
                </div>
                <div>
                    <h2 className='font-bold text-xl'>{trip?.userSelection?.location?.label}</h2>
                    <h2 className='text-gray-500 text-md'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget</h2>
                </div>
            </div>
        </Link>
    )
}

export default UserTripCardComponent