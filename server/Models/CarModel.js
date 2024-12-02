import mongoose from "mongoose";


const CarSchema = mongoose.Schema({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price_per_day: {
        type: Number,
        required: true,
    },
    rental_status: {
        type: Boolean,
        required: true,
        default: false,
    } 
});


const CarModel = mongoose.model("cars", CarSchema);


export default CarModel;