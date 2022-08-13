const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
router.get("/", (req, res) => {
  Category.findAll({
    include: {
      model: Product,
    },
  })
    .then((allCategoryData) => res.json(allCategoryData))
    .catch((err) => res.status(500).json(err));
});

// find one category by its `id` value
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
    },
  })
    .then((oneCategoryData) => {
      if (!oneCategoryData) {
        res.status(404).json({ message: "ID not found" });
        return;
      }
      res.json(oneCategoryData);
    })
    .catch((err) => res.status(500).json(err));
});

// cretate a new category
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((createdCategoryData) => res.json(createdCategoryData))
    .catch((err) => res.status(500).json(err));
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCategoryData) => {
      if (!updatedCategoryData) {
        res.status(404).json({ message: "ID not found" });
        return;
      }
      res.json(updatedCategoryData);
    })
    .catch((err) => res.status(500).json(err));
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategoryData) => {
      if (!deletedCategoryData) {
        res.status(404).json({ message: "ID not found" });
        return;
      }
      res.json(deletedCategoryData);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
