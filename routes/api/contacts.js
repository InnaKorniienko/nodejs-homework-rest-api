const express = require('express');
const {auth, validation, ctrlWrapper} = require("../../middlewares");
const {contactSchemaJoi, favoriteSchemaJoi} = require("../../models/contact");
const {contacts: ctrl} = require("../../controllers");
const router = express.Router();


router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getContactById));

router.post('/', auth, validation(contactSchemaJoi), ctrlWrapper(ctrl.add));

router.delete('/:id', ctrlWrapper(ctrl.removeById));

router.put('/:id', validation(contactSchemaJoi), ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite', validation(favoriteSchemaJoi), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
