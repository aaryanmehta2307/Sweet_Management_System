const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const controller = require("../controllers/sweet.controller");

const router = express.Router();

router.post("/", authMiddleware, controller.addSweet);
router.get("/", authMiddleware, controller.getSweets);
router.get("/search", authMiddleware, controller.searchSweets);

router.put("/:id", authMiddleware, adminMiddleware, controller.updateSweet);
router.delete("/:id", authMiddleware, adminMiddleware, controller.deleteSweet);

router.post("/:id/purchase", authMiddleware, controller.purchaseSweet);
router.post("/:id/restock", authMiddleware, adminMiddleware, controller.restockSweet);

module.exports = router;
