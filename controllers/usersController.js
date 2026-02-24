const User = require("../models/Users")


const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password').lean();

    if (!users) {
        return res.status(400).json({ message: "No users found" })
    }

    res.json(users)
}

const addUser = async (req, res) => {
    const { username, email, password, location, gender, role, resume } = req.body;

    if (!username || !email || !password || !gender || !role || !resume) {
        return res.status(400).json({ message: "All field are required" })
    }

    const duplicate = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: "User already exist" })
    }

    const user = await User.create({
        username,
        email,
        password,
        location,
        gender,
        role,
        resume
    })

    if (user) {
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: "Invalid data recevied" })
    }


}





module.exports = { getAllUsers, addUser }