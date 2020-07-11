module.exports = {
    // this id for authorized user. check out the route(ie inside index.js route file) where it is used. if user is logged in then next() will run which redirects to dashboard page if not then to home('/') page. so even if the user tries to go to home page('/') then he will be redirected to dashboard page given that he is logged in
    ensureAuth: function (req, res, next) {
        if(req.isAuthenticated()){
            return next()
        } else {
            res.redirect('/')
        }
    }, 
    // this id for non-authorized user. check out the route where it is used. if user is not logged in then next() will run which redirects to login page
    ensureGuest: function(req, res, next) {
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
        } else {
            return next()
        }
    }
}