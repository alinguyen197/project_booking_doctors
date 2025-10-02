import express from "express";
import upload from "../middleware/fileUpload";
const router = express.Router();

import userController from "../controllers/userController";

// login
router.post("/login", userController.handleLogin);

router.post("/get-all-users", userController.handleGetAllUser);
router.post("/create-new-user", userController.handleCreateNewUser);
router.post("/delete-user", userController.handleDeleteUser);

// Case upload file
// router.post("/get-all-users", upload.single('file') , userController.handleGetAllUser)

module.exports = router;
