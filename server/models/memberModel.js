import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        required: true 
    },  // Set _id as the email field
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: Date,
        require: true
    },
},
{
    timestamps: true
})

const Member = mongoose.model("Member", memberSchema);
export default Member;