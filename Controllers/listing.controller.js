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
        // console.log(req.headers.id==req.params.id)
        const listing = await Listing.findById(req.params.id);
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
    },
    getListingById: async (req,res,next)=>{
        try {
            const listing = await Listing.findById(req.params.id)
            if (!listing) {
                return next("Listing not found")
            }
            res.status(200).json({ status: 200, message: 'success', listing });
            
        } catch (error) {
            next(error);
        }
    },
    getListings: async (req, res, next) => {
        
        try {

            const limit = parseInt(req.query.limit) || 9;
            const startIndex = parseInt(req.query.startIndex) || 0;
            let offer = req.query.offer;

            if (offer == undefined || offer == "false") {
                offer = { $in: [false, true] };

            }
            
            let furnished = req.query.furnished;

            if (furnished == undefined || furnished == "false") {
                 furnished = { $in: [false, true] };
     }
             let parking = req.query.parking;
            if (parking == undefined || parking == 'false') {
                parking = { $in: [false, true] };

            }
            let type = req.query.type;

            if (type === undefined || type === 'all') {
                type = { $in: ['sale', 'rent'] };
            }

            const searchTerm = req.query.searchTerm || "";
            
            const sort = req.query.sort || 'createdAt';

            const order = req.query.order || 'desc';

            const listings = await Listing.find({
              name: {
                $regex: searchTerm,
                $options: "i",
              },
              offer,
              furnished,
              parking,
              type,
            })
              .sort({ [sort]: order })
              .limit(limit)
              .skip(startIndex);

            return res.status(200).json({status:200,message:'success',listings})

        } catch (error) {
            next(error)
        }
    }

}

module.exports=listingCongroller