import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/service/FirebaseConfig';
import UserTripCardComponent from '@/components/custom/UserTripCardComponent';


function MyTrip() {
    useEffect(() => {
        GetUserTrips();
    }, [])
    const navigation = useNavigation();
    const [userTips, setUserTips] = useState([])
    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigation('/')
            return;
        }        
        const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
        setUserTips([])
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setUserTips(prev => [...prev, doc.data()])
        });

    }
    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-4xl">
                My Trips 🎢
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                {userTips.map((trip, index) => (
                    <UserTripCardComponent trip={trip} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default MyTrip