const mongoose = require('mongoose');

const geocoder = require('../utils/geocoder');

const StoreSchema = new mongoose.Schema({
    storeId: {
        type: String,
        unique: false,
        trim: false,
        required: [true, 'Please add a animal name']

        // do not include this on the production version
        /*maxlength: [10, 'Store ID must be less than 10 chars']*/
    },
    address: {
        type: String,
        
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String,
            enun: ['Point'],
        }, 
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Geocode and create location
StoreSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }

    // do not save address
    // this.address = undefined;
    next();
});

module.exports = mongoose.model('Store', StoreSchema);


// MAKE SURE TO ADD THE CHANGES
// BEFORE PUSHING IT TO PRODUCTION