import express from "express";
import {
    getUser,
    getUserById,
    updateUser,
    createUser,
    deleteUser,
    greeting
} from "../controller/Users.js"
import { getUsersLdap, getMeLdap } from "../Controller/UserController.js"
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();


router.get('/users', verifyUser,adminOnly, getUser);
router.get('/users/:id', verifyUser, getUserById);
router.post('/users', verifyUser, adminOnly, createUser);
router.patch('/user/:id', verifyUser,adminOnly, updateUser);
router.delete('/user/:id', verifyUser, deleteUser);

router.get('/greeting', greeting);
router.post('/user/ldap', getUsersLdap);
router.get('/user/getmeldap', getMeLdap);

export default router;