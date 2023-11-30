import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUser = async (req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.mesage});
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.mesage});
    }

}

// export const testadd = async (req, res) => {
//     const adduser = await User.create({
//         name: "Ilham",
//         email: "ilham@gmail.com",
//         password: "ilham123",
//         role: "admin"
//     });
//     res.status(201).json({msg: "User berhasil dibuat"});   
// }

export const createUser = async (req, res) => {
    const {name, email, password, confPassword, role} = req.body;
    console.log("payload", req.body);
    if (password !== confPassword) return res.status(400).json({msg: "Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
       await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
       })
        res.status(201).json({msg: "User berhasil dibuat"});        
    } catch (error) {
        res.status(400).json({msg: error.mesage});
    }

}

export const updateUser = (req, res) => {

}

export const deleteUser = (req, res) => {

}

export const greeting = async (req, res) => {
    const currentHour = new Date().getHours();
  
    let greeting;
    if (currentHour >= 0 && currentHour < 12) {
      greeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good night';
    }
    res.status(200).json({greeting});        
    
  };

