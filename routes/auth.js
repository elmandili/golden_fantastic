import express from 'express'
import passport from 'passport';
import LocalStrategy from 'passport-local'
import User from '../models/userModel.js';

const router = express.Router();
// Passport local strategy
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'هذا المستخدم غير موجود' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return done(null, false, { message: 'كلمة المرور غير صحيحة' });

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Login handler
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

export default router
