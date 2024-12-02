import mongoose from "mongoose";


const ReservationSchema = mongoose.Schema({
    car_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    }, 
    checkout_date: {
        type: Date,
        required: true
    },
});


const ReservationModel = mongoose.model("reservations", ReservationSchema);


export default ReservationModel;