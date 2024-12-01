import mongoose from "mongoose";


const ReservationSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    reserved_cars: {
        type: Array,
        required: true
    }
});


const ReservationModel = mongoose.model("reservations", ReservationSchema);


export default ReservationModel;