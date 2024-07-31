import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-2xl mt-5'>
                PlacesToVisit
            </h2>
            <div>
                {trip?.tripData?.itinerary?.map((item, index) => (
                    <div key={index} className='mt-5'>
                        <h2 className='font-medium text-xl'>Day {item.day}</h2>
                        <div className='grid md:grid-cols-2 gap-5'>
                            {
                                item?.plan?.map((place, index) => (
                                    <div key={index} className='my-3'>
                                        <h2 className='font-medium text-md text-orange-600'>{place.time}</h2>
                                        <PlaceCardItem place={place} />

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit