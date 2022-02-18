const router = require("express").Router();
const { editsocial } = require("../Controllers/usersocialController")





router.put("/editsocial/:id", editsocial);


module.exports = router