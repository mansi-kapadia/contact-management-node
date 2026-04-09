const express = require("express");
const {getContacts , getcontactById , addContact , updateContact , deleteContact } = require("../controllers/contactController");
const ValidateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(ValidateToken);
router.route("/").get(getContacts);

router.route("/:id").get(getcontactById);

router.route("/").post(addContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;