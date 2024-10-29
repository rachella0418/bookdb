import Member from "../models/memberModel.js";

export const insertMember = async(req, res) => {
    try {
        const existingMember = await Member.findOne(req.body.newMember);
        if (existingMember != null) {
            res.status(400).json("Cannot add an existing member!")
        } 
        const newMember = new Member(req.body.newMember);
        const savedMember = await newMember.save();
        res.status(201).json(savedMember);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}