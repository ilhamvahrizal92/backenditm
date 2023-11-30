import Users from "../models/UserModel.js";
import Argon2 from "argon2";

export const Login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(400).json({msg: "User Tidak Ditemukan"});
    const match =  await Argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email,role});
}

export const Me = async (req, res) => {
    if(!req.session.userId) {
        return res.status(401).json({msg: "Mohon Login"});
    }
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

export const LogOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Gagal Logout"});
        res.status(200).json({msg: "Berhasil logout"});
    })
}