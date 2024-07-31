import React, { useEffect, useState } from 'react'
import placeholder from '../../assets/placeholder.jpeg'
import { Button } from '../ui/button'
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '@/service/GooglePhotoApi';
import { PHOTO_REF_URL } from '@/service/GooglePhotoApi';


function InfoSection({ trip }) {
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
        <div>
            <img src={photoURL ? photoURL : placeholder} className='h-[360px] w-full object-cover rounded-xl' />
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-3xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-3'>
                        <h2 className='py-1 px-3 text-gray-500 rounded-full bg-gray-200 w-full text-md flex items-center'>
                            🗓️ {trip?.userSelection?.noOfDays} Day
                        </h2>
                        <h2 className='py-1 px-3 text-gray-500 rounded-full bg-gray-200 w-full text-md flex items-center'>
                            💰 {trip?.userSelection?.budget} Budget
                        </h2>
                        <h2 className='py-1 px-3 text-gray-500 rounded-full bg-gray-200 w-full text-md flex items-center'>
                            👯‍♂️ No. of Traveler: {trip?.userSelection?.traveler} People
                        </h2>
                    </div>
                </div>
                <Button><IoIosSend />
                </Button>
            </div>
        </div>

    )
}

export default InfoSection