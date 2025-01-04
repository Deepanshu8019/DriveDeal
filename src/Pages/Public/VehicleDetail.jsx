import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehiclesInfo } from "../../Data/Vehicle_info";

function VehicleDetail() {
  const [targetVehicle, setTargetVehicle] = useState({});
  const [imageArray, setImageArray] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(1); 
  const [index, setIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const vehicles = await getVehiclesInfo();
      const vehicle = vehicles?.find((v) => v.id === id);
      setTargetVehicle(vehicle || {});
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (targetVehicle?.images) {
      let arr = [targetVehicle.thumbnail, ...(targetVehicle.images || [])].filter(Boolean);
      setImageArray(arr); 
    } else {
      setImageArray([]);
    }
    // console.log(targetVehicle)
  }, [targetVehicle]);

  const redirectToWhatsApp = () => {
    const phoneNumber = import.meta.env.VITE_PHONENUMBER;
    const currentUrl = window.location.href;
    const message = `Check this out: ${currentUrl}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  };

  const handleClick = (index) => {
    setSelected(index);
    setIndex(index);
  };

  return (
    <div className="">
      <h1 className="text-white text-center font-extrabold text-[2.5em] mt-[50px] mb-[60px] sm:text-[2rem] md:text-[2.5em] max-sm:text-[1.5rem] max-sm:mb-[60px] underline underline-offset-8" >Vehicle Details</h1>

      <div className="flex bg-slate-300 w-full m-auto p-10 gap-12 flex-wrap max-sm:flex-col max-sm:p-2" >
        <div className="flex gap-12 items-center max-sm:flex-col max-sm:gap-6">

          <div
            className="relative flex flex-wrap flex-col gap-4 cursor-pointer max-sm:order-2 max-sm:flex-row max-sm:w-[75%]"
            >
            {imageArray.map((img, i) => (
              <div
                key={i}
                onClick={() => handleClick(i)}
                className={`cursor-pointer border-[3px] rounded-md ${
                  selected === i ? "border-blue-700" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt="img"
                  className="h-[2.5rem] w-[4rem] rounded-md bg-cover bg-center bg-no-repeat"
                />
              </div>
            ))}
          </div>

          <div className="relative w-[35rem] cursor-pointer max-sm:order-1 
             md:w-[35rem] sm:w-[30rem] max-sm:w-[90%] md:h-[25rem] sm:h-[18rem] max-sm:h[15rem]
             max-sm:m-auto">
            {imageArray.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Image"
                onClick={() => { setIsActive((prev) => !prev);}}
                className={ `
                   ${selected===i ? "block" : "hidden"} 
                 ${isActive ? "fixed inset-0 z-50 w-[70rem] h-[40rem] m-auto  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-[25%] bg-gray-900 bg-opacity-50 md:w-[70rem] sm:w-[40rem] max-sm:w-[30rem] md:h-[40rem] sm:h-[30rem] max-sm:h-[20rem] max-sm:!translate-y-[-90%] " : "w-[35rem] h-[25rem] md:w-[35rem] sm:w-[30rem] max-sm:w-[100%] md:h-[25rem] sm:h-[18rem] max-sm:h-[15rem]"}`}
              />
             ))}
          </div>
        </div>
        
        <div className="relative w-[20%] ml-auto mr-auto top-0 flex flex-col
         md:w-[20%rem] sm:w-[40%rem] max-sm:w-[100%] max-sm:items-center">
          <h1 className="relative text-3xl font-extrabold text-red-600">{targetVehicle.vehicleName}</h1>
          
          <div className="relative flex flex-col max-sm:w-[60%]">
            <span className="text-green-600 left-0 mt-8 mb-8 relative font-extrabold text-2xl ">Rs: <span>{targetVehicle.price}</span></span>

            <div className="flex flex-col font-bold text-xl text-gray-600">
              <span className="text-black font-extrabold text-2xl mb-2">Vehicle Detail:</span>
              <span >Location: <span>{targetVehicle.Location}</span></span>
              <span>Usage: <span>{targetVehicle.runningHours}</span></span>
              <span>Model: <span>{targetVehicle.model}</span></span>
              <span>HP: <span>{targetVehicle.hp}</span></span>
            </div>

          </div>
          <div className="cursor-pointer">
            <a onClick={redirectToWhatsApp} className="text-red-500 text-xl font-bold underline cursor-pointer">Contact Seller</a>
          </div>
        </div>

      </div>  
    </div>
  );
}

export default VehicleDetail;




