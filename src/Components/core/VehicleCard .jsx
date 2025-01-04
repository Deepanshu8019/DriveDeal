import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../Config/firebase';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from 'react-hot-toast';
import { removeImage } from '../../Data/Util';
import { getVehiclesInfo } from '../../Data/Vehicle_info';

function VehicleCard ({vehicle, setVehicleData}) {
  
    const route = "manageVehicle";
    const location = useLocation();
    const path = location.pathname;
    const lastPart = path.split('/').pop();
    const token = useSelector((state) => state.auth.token);

    const matchRoute = () => lastPart === route;

    const handleDelete = async () => {
        try {
          if (vehicle.id) {
            const vehicleDocRef = doc(db, "Vehicle_Info", vehicle.id);
            await deleteDoc(vehicleDocRef);
            // console.log("Vehicle deleted successfully");
            let arr = [vehicle.thumbnail, ...(vehicle.images || [])].filter(Boolean);
            await handleRemoveImage(arr);
            toast.success("Vechicle Removed");
            setVehicleData(await getVehiclesInfo())
          } else {
            toast.error("Vehicle not Found");
          }
        } catch (error) {
          console.error("Error in deleting vehicle:", error);
          toast.error("Something went wrong");
        }
      };

      const handleRemoveImage = async (imageArray) => {
        try {
            const results = await Promise.all(
                imageArray.map(async (url) => {
                    const response = await removeImage(url);
                    return response;
                })
            );
    
            // const allSuccess = results.every((response) => response.success);
    
            // if (allSuccess) {
            //     console.log("All images deleted successfully.");
            // } else {
            //     console.error("Some images failed to delete:", results);
            // }

        } catch (error) {
            console.error("Error while deleting images:", error);
        }
    };
    

    const confirmDelete = () => {
        confirmAlert({
          title: "Confirm Delete",
          message: "Are you sure you want to Delete?",
          buttons: [
            {
              label: "Yes",
              onClick: () => handleDelete()
            },
            {
              label: "No"
            }
          ]
        });
    };

    return (
        // <div className=''>
        <div className={`bg-[#E7E7E7] w-[36rem] h-[34rem] flex flex-col p-[4.5rem] rounded-xl  max-sm:m-[.8em]  md:h-[34rem] md:p-[2.5rem] sm:p-[2.5rem] max-sm:p-[1.5rem] sm:h-[33rem] max-sm:h-[30rem] ${!matchRoute()&& "hover:scale-105 ease-out duration-300"}`}>
            <div className='relative'>

            <div 
                className={`${token && matchRoute() ? 'inline' : 'hidden'} 
                            absolute -top-[1.5rem] -right-[2rem] text-3xl text-red-600  font-extrabold cursor-pointer 
                            max-sm:-top-[1.5rem] max-sm:-right-[1.5rem] sm:-top-[1.5rem] hover:scale-125 ease-out duration-300
                            `}
            >
                <MdDelete onClick={confirmDelete}/> 
             </div>

            <img src={vehicle.thumbnail} alt='Thumbnail'
                className="w-full h-[290px] bg-cover bg-center bg-no-repeat shadow-[0px_4px_10px_2px_rgba(0,0,0,0.30)]
                md:h-[290px] max-sm:h-[250px] m-auto "
            />

            <div className='text-black text-[25px] relative mt-8 font-extrabold
                sm:mt-4 max-sm:mt-2'>
                <span>{vehicle.vehicleName}</span>
            </div>
            <div className='text-green-600 text-[20px] font-extrabold'>
                <span>Rs {vehicle.price}</span>
            </div>
            <div className='text-[16px] font-bold text-black'>
                <span>Usage: {vehicle.runningHours} Hrs</span>
            </div>
            <Link to={`/detail/${vehicle.id}`}
                className="bg-[#FF0C0C] rounded-md w-[170px] m-auto text-white top-8 relative flex items-center justify-center h-[3rem] hover:scale-90 ease-out duration-300 sm:top-4 max-sm:top-2 " >
                View More
            </Link>
        </div>
    </div>
    // </div>
  )
}

export default VehicleCard 
