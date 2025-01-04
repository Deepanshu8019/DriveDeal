export const removeImage = async (url) => {
  try {
    const publicId = extractPublicId(url);
    const BaseUrl = import.meta.env.VITE_APP_API_URL;
    
    const res = await fetch(`${BaseUrl}/removeImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_id: publicId,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to remove image: ${res.statusText}`);
    }

    const response = await res.json();
    return response;
  } catch (error) {
    console.error("Error removing image:", error);
    return { success: false, message: error.message };
  }
};


export const extractPublicId = (url) => {
    const parts = url.split('/');
    if (parts.length > 1) {
        const path = parts[parts.length-1].split('.')[0];
        return path;
    }
    return null;  
}
