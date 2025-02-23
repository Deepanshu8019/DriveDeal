import React, { useState, useEffect } from 'react'
import {getVehiclesInfo} from '../../Data/Vehicle_info'
import VehicleCard from './VehicleCard ';
import toast from 'react-hot-toast';

function AllVehicles() {

    const [vehicleData, setVehicleData] = useState([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const fetchData = async () => {
        const tostid = toast.loading("Loading...")
        try{
            const data = await getVehiclesInfo();
            setVehicleData(data);

            fetch(import.meta.env.VITE_APP_BASE_URL)
            .then((res) => res.text())
            .then(() => {})
            .catch((err) => console.error("Error keeping server alive:", err));
            // console.log(data);
        }catch(err){
            console.log("Error while fetching data: ", err);
        }finally{
            toast.dismiss(tostid);
        }
    };

    

    useEffect(() => {

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
    
        return () => {
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
        };
      }, []);
      
    
    useEffect(() => {
        if(!isOnline){
            toast.error("You're offline")
        }else{
            fetchData();
        }
    }, [isOnline]);


  return (
    <div className='min-h-screen w-full'>
        <div className="text-white font-extrabold text-center text-[4em] top-20 mt-[70px] mb-[70px] sm:text-[3em] md:text-[4em] max-sm:text-[2.5em] max-sm:mb-[70px] underline underline-offset-8">
            Exclusive Deals
        </div>

        <div className='flex justify-center flex-wrap gap-[8rem] max-sm:gap-[2rem]'>
            {
                vehicleData.map((vehicle, id) => (
                <VehicleCard  key={id} vehicle={vehicle} setVehicleData={setVehicleData} />
                ))
            }
        </div>
    </div>
  )
}

export default AllVehicles
