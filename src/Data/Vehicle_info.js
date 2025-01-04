import {db} from "../Config/firebase"
import { getDocs, collection } from 'firebase/firestore';

export const getVehiclesInfo = async ()=>{
    const vehiclesCollection = collection(db,"Vehicle_Info");
    try{
      const data = await getDocs(vehiclesCollection);
      return data.docs.map((doc)=>({...doc.data(), id: doc.id}));
    }catch(err){
      console.error(err);
      return [];
    }
  }