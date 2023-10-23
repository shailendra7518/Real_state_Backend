const Listing = require("../Models/listing.model");
const { errorHandler } = require("../utils/errorHandler");


const listingCongroller = {
    
    createListing: async(req,res,next) => {
        try {
            const listing = await Listing.create(req.body);
            return res.status(201).json({status:201,message:"List created successfully",listing })
              
        } catch (err) {
            next(err)
          }
    },
    deleteListing: async(req,res,next) => {
        const listing = await Listing.findById(req.params.id)
        if (!listing) {
            return next(errorHandler(404, 'Listing not found'));
        }

        if (req.headers.id !== listing.userRef) {
            return next(errorHandler(401,"You can only delete your own listing"))
        }


        try {
            await Listing.findByIdAndDelete(req.params.id);
            res.status(200).json({status:200,message:"listing has been deleted"})
            
        } catch (error) {
            next(error)
        }
    }

}

module.exports=listingCongroller