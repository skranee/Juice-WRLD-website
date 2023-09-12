import {Router} from 'express'
import userController from "../controllers/user-controller.js";
import {body} from 'express-validator'
import authMiddleware from "../middlewares/auth-middleware.js";
import fileUpload from "express-fileupload";

const router = new Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.put('/update', userController.changePassword)
router.post('/check', userController.checkPassword)
router.post('/send', userController.sendMessage)
router.get('/messages', userController.getAllMessages)
router.post('/answer', userController.answerMessage)
router.get('/answers', userController.getAllAnswers)
router.put('/read', userController.readMessage)
router.get('/news', userController.getNews)
router.post('/makenews', fileUpload(), userController.makeNews)
router.post('/achieve', userController.makeAchievement)
router.get('/gallery', userController.getGallery)

export default router;