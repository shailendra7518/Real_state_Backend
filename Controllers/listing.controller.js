const Listing = require("../Models/listing.model");
const { errorHandler, createCustomError } = require("../utils/errorHandler");


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
            return next(errorHandler("Listing not found", 404));
        }

        if (req.headers.id !== listing.userRef) {
            return next(
              errorHandler("You can only delete your own listing", 401)
            );
        }


        try {
            await Listing.findByIdAndDelete(req.params.id);
            res.status(200).json({status:200,message:"listing has been deleted"})
            
        } catch (error) {
            next(error)
        }
    },
    updateListing: async (req, res, next) => {
        console.log(req.headers.id==req.params.id)
        const listing = await Listing.findById(req.params.id);
         console.log("listing",listing)
        if (!listing) {
            // return next(errorHandler(createCustomError(404,"Listing not found")))
           return next("list not found")
        }

        if (req.headers.id !== listing.userRef) {
         
            // return next(errorHandler(createCustomError(404,"you can update only your listings")));
            return next("you can update only your listing")
        }
        try {
            const updatedlisting = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });

            res.status(200).json({status:200,message:"listing updated successfully",updatedlisting})
        } catch (error) {
            next(error)
        }
    }

}

module.exports=listingCongroller