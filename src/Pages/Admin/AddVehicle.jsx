import { useRef, useState } from "react";
import "./addVehicle.css";
import {db} from "../../Config/firebase"
import {getVehiclesInfo} from "../../Data/Vehicle_info";
import { collection, addDoc } from 'firebase/firestore';
import { removeImage } from "../../Data/Util";
import Button from '../../Components/core/Button'
import toast from "react-hot-toast";

export default function AddVehicle() {
  const [imageUrls, setImageUrls] = useState([]);
  const formRef = useRef(null);

    const handleImageUpload = async (file) => {
    if (!file) return null;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "DriveDeal");
    data.append("cloud_name", "djkzdkb27");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djkzdkb27/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const uploadImageURL = await res.json();
    return uploadImageURL.url;
    };

    const handleImagesUpload = async (file) => {
        const url = await handleImageUpload(file);
        setImageUrls((prev) => [...prev, url]);
        // console.log("image url: ",url)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);

        const thumbnailFile = formData.get("thumbnail");
        const uploadedThumbnailURL = await handleImageUpload(thumbnailFile);

        const data = Object.fromEntries(formData.entries());
        data.thumbnail = uploadedThumbnailURL;
        data.images = imageUrls;

        // console.log("Thumbnail URL: ", uploadedThumbnailURL);
        // console.log("Image URLs: ", imageUrls);
        // console.log("Form Data:", data);

        // Add your logic to send `data` to the backend
        
        try{
            const vehiclesCollection = collection(db,"Vehicle_Info");
            await addDoc(vehiclesCollection, 
                {
                    vehicleName: data?.Vehicle_Name,
                    model: data?.Model,
                    price: data?.Price,
                    runningHours: data?.Operating_Hours,
                    thumbnail: data?.thumbnail,
                    images: data?.images,
                    Location: data?.Location,
                    hp: data?.hp
            });
            toast.success("Vehicle Added Successfully")
            setTimeout(() => {
              window.location.reload();
            }, 2000);
            await getVehiclesInfo();
            // console.log("Fetched Vehicles:", await getVehiclesInfo());
        }catch(err){
          toast.error("Something Went Wrong")
          console.error("Error: ",err)
        }
    };

    const handleRemoveImage = async (url) => {
      const response = await removeImage(url);
        if (response.success) {
          setImageUrls((prev) => prev.filter((imageUrl) => imageUrl !== url));
        } else {
          console.error("Failed to delete the image from Cloudinary:", response);
        }
    };
      

  return (
    <div >
      <h2 className="text-white font-extrabold text-center text-[3em] top-20 mt-[70px] mb-[60px] sm:text-[2.5em] md:text-[3em] max-sm:text-[2em] max-sm:mb-[60px]  underline underline-offset-8 ">Add New Vehicle</h2>

    <div className=" border-t-8 rounded-sm border-indigo-600 bg-white m-auto mt-[5rem] mb-[5rem] p-12 shadow-2xl w-[30rem] max-sm:w-[90%] max-sm:p-4 max-sm:m-auto max-sm:relative max-sm:top-[1rem]">

      <form ref={formRef} className="my-form m-auto md:w-[26rem] sm:w-[26rem] max-sm:w-[90%]" onSubmit={handleSubmit}>
              <input
                  autoFocus={true}
                  required
                  name="Vehicle_Name" placeholder="Vehicle Name"
                />
              <input
                  type="number"
                  name="Price"
                  placeholder="Price"
                  min="10000"
                  step="1000"
                  required
                  />
              <input name="Model" placeholder="Model" required />
              <input type="number" name="hp" placeholder="HP" min="1" step="1" required />
              <input
                  type="number"
                  name="Operating_Hours"
                  placeholder="Operating Hours"
                  min="1"
                  step="1"
                  required
                  />
              <input name="Location" placeholder="Location" required/>
              <label >Choose Thumbnail  
                <input type="file" id="thumbnail" name="thumbnail" accept="image/*" required/>
              </label>    
              <label >Choose Imgage    
              <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  required
                  onChange={(e) => {
                      const files = Array.from(e.target.files); 
                      files.forEach(handleImagesUpload);
                  }}
                />
              </label>    
          <Button value="Submit"/>
      </form>
    </div>

      <div className="images flex gap-4 max-sm:mt-[8rem] flex-wrap w-[85%] max-sm:m-auto ">
        {
        imageUrls.map((url)=>(
            <div key={url} className="flex flex-col mt-2">
                <label htmlFor={url} >
                  <img name={url} className="image w-[100px] h-[80px] object-cover object-[5%_30%]" src={url} alt="" />
                </label>
                <button onClick={()=>handleRemoveImage(url)} 
                  className="mt-1 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg"
                  >Remove</button>
            </div>
                )
            )
        }
      </div>
    </div>
  );
}
