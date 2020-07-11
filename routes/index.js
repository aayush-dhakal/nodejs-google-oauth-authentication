const express = require('express')
const router = express.Router()
const {
    ensureAuth,
    ensureGuest
} = require('../middleware/auth')


// @desc   Login/Landing page
// @route  GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// @desc   Dashboard
// @route  GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        // given that the user is logged in, with ensureGuest middleware if he tries to got to home page('/') then he will be redirected to dashboard page. this is because of the next() being specified in middleware when user is found authenticated below dashboard redirect code will execute
        res.render('dashboard', {
            name: req.user.firstName
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')  // it looks in views folder by default so error/500 will look inside error folder with 500.hbs file
    }

})


module.exports = router