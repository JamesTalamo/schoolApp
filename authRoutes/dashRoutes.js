const path =require('path')

const express = require('express')
const router = express.Router()

// const ROLES_LIST = require('../config/roles_list')
// const verifyRoles = require('../middleware/verifyRoles')

//for student routes
router.get('/studentDash',/*verifyRoles(ROLES_LIST.Student),*/ (req,res) => {                                   //PRACTICE ROUTE
    res.sendFile(path.join(__dirname,'..','authRoutes','studentDash.html'))
})

router.get('/studentDash/dash',/*verifyRoles(ROLES_LIST.Student),*/ (req,res) => {                                   //PRACTICE ROUTE
    res.sendFile(path.join(__dirname,'..','authRoutes','studentDashRoutes','studentDash-dash.html'))
})

router.get('/studentDash/user',/*verifyRoles(ROLES_LIST.Student),*/ (req,res) => {                                   //PRACTICE ROUTE
    res.sendFile(path.join(__dirname,'..','authRoutes','studentDashRoutes','studentDash-user.html'))
})



// for teacher routes
router.get('/teacherDash',/*verifyRoles(ROLES_LIST.Teacher),*/ (req,res) => {                                   //PRACTICE ROUTE
    res.sendFile(path.join(__dirname,'..','authRoutes','teacherDash.html'))
})

router.get('/teacherDash/students',/*verifyRoles(ROLES_LIST.Teacher),*/ (req,res) => {
    res.sendFile(path.join(__dirname,'..','authRoutes', 'teacherDashRoutes','teacherDash-students.html'))
})

router.get('/teacherDash/work',/*verifyRoles(ROLES_LIST.Teacher),*/ (req,res) => {                                   //PRACTICE ROUTE
    res.sendFile(path.join(__dirname,'..','authRoutes','teacherDashRoutes','teacherDash-work.html'))
})

router.get('/teacherDash/workC',/*verifyRoles(ROLES_LIST.Teacher),*/ (req,res) => {                                   //PRACTICE ROUTE
    res.sendFile(path.join(__dirname,'..','authRoutes','teacherDashRoutes','teacherDash-workC.html'))
})

router.get('/teacherDash/user',/*verifyRoles(ROLES_LIST.Teacher),*/ (req,res) => {                                   //PRACTICE ROUTE
    res.sendFile(path.join(__dirname,'..','authRoutes','teacherDashRoutes','teacherDash-user.html'))
})
module.exports = router;