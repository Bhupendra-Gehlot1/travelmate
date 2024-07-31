import Hotels from '@/components/custom/Hotels';
import InfoSection from '@/components/custom/InfoSection';
import PlacesToVisit from '@/components/custom/PlacesToVisit';
import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';

function ViewTrip() {
    const { tripId } = useParams();
    const [trip,setTrip]= useState([]);
    useEffect(()=>{
        tripId && getTripData();
    },[tripId])
    const getTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId)
        const docsnap = await getDoc(docRef)
        if (docsnap.exists()) {
            setTrip(docsnap.data())
            console.log(docsnap.data())
        }else{
            toast("No Trip Found!")
        }
    }
    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            <InfoSection trip={trip}/>
            <Hotels trip={trip}/>
            <PlacesToVisit trip={trip}/>
        </div>
    )
}

export default ViewTrip