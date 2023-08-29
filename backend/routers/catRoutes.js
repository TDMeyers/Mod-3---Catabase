const express = require('express')

const router = express.Router()

const catControl = require('../controllers/catController')

const { authorize } = require('../middleware/authMiddleware')

// seed 
router.post('/seed', catControl.seed)

// index
router.get('/', catControl.index)

// delete
router.delete('/:id', authorize, catControl.delete)

// update
router.put('/:id', authorize, catControl.update)

// create
router.post('/', authorize, catControl.create)

// show
router.get('/:id', catControl.show)

module.exports = router