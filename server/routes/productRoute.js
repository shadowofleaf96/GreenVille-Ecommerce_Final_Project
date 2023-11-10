// Shadow Of Leaf was Here

const express = require("express");
const router = express.Router();
const { upload } = require('../middleware/multerMiddleware');
console.log(upload);

const {
  verifyToken,
  requireAdminOrManager,
} = require("../middleware/authMiddleware");
const {
  createData,
  searchingItems,
  RetrievingItems,
  categorySub,
  RetrieveById,
  UpdateProductById,
  DeleteProductById,
} = require("../controllers/productController");
router.post(
  "/",
  verifyToken,
  requireAdminOrManager,
  upload.single('product_image'),
  createData
);
router.get("/", RetrievingItems);
router.get("/replace", categorySub);
router.get("/search", searchingItems);
router.get("/:id", RetrieveById);
router.put("/:id", verifyToken, requireAdminOrManager, UpdateProductById);
router.delete("/:id", verifyToken, requireAdminOrManager, DeleteProductById);

module.exports = router;
