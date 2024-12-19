import mongoose from "mongoose";


const CompanySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});


const CompanyModel = mongoose.model("companies", CompanySchema);


export default CompanyModel;