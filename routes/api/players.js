const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Player = require('../../models/Player');

// @route    POST api/players
// @desc     Add a new player with the notes
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('name', 'Player name is required').not().isEmpty(),
            check('notes', 'You need to include a note to save a player').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // const user = await User.findById(req.user.id).select('-password');

            const newPlayer = new Player({
                name: req.body.name,
                notes: req.body.notes,
                type: req.body.type,
                // user: req.user.id
            });

            const player = await newPlayer.save();

            res.json(player);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/posts
// @desc     Get all players
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const players = await Player.find().sort({ name: -1 });
        res.json(players);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/players/:id
// @desc     Get player by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const player = await Post.findById(req.params.id);

        // Check for ObjectId format and post
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        res.json(player);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/players/:id
// @desc     Delete a player
// @access   Private

router.delete('/:id', auth, async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);

        // Check for ObjectId format and post
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check user TODO
        // if (player.user.toString() !== req.user.id) {
        //     return res.status(401).json({ msg: 'User not authorized' });
        // }

        await player.remove();

        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

module.exports = router;