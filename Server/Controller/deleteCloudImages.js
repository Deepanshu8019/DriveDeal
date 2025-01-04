const cloudinary = require('cloudinary').v2;

exports.deleteImages = async (req, res) => {
    const { public_id } = req.body;
    // console.log("Public id",public_id)
    if (!public_id) {
        return res.status(400).json({ success: false, message: 'public_id is required' });
    }

    try {
        const folderPath = 'DriveDeal/Asset/';
        const fullPublicId = folderPath + public_id;
        const result = await cloudinary.uploader.destroy(fullPublicId);
    
        if (result.result === 'not found') {
            return res.status(404).json({
                success: false,
                message: 'Image not found in Cloudinary',
            });
        }
    
        console.log('Deleted Image:', result);
    
        return res.status(200).json({
            success: true,
            message: 'Image deleted successfully',
            result,
        });
    } catch (error) {
        console.error('Error deleting image:', error);
        return res.status(500).json({ success: false, message: 'Error deleting image' });
    }
};
