const Listing = require("../Models/listing.model");


const listingCongroller = {
    
    createListing: async(req,res,next) => {
        try {
            const listing = await Listing.create(req.body);
            return res.status(201).json(listing)
              
        } catch (err) {
            next(err)
          }
     }

}

module.exports=listingCongroller