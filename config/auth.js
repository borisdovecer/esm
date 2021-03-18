module.exports = {
  ensureAuthenticated: function(req, res, next) {
    const user = req.user
    if (req.isAuthenticated()) {
      if( user.role === "admin"){
        return next();
      }
      res.redirect('/');
    }
    res.redirect('/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/admin');
  }
};
