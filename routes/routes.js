const router = require("express").Router();
const bookcontroller = require("../controllers/bookcontroller");

router.post("/book/create/", bookcontroller.createbook);
router.put("/book/update/:id", bookcontroller.updatebook);
router.delete("/book/delete/:id", bookcontroller.deletebook);
router.get("/book/read/:id", bookcontroller.getbook);
router.get("/book/read/", bookcontroller.getallbooks);

module.exports = router;
