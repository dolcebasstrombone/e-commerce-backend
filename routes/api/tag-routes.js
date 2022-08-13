const router = require("express").Router();
const { isError } = require("lodash");
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
// minor bug: json objects include snake case and camel case versions of each column.
// the data is still correct, bug is low priority

// find all tags
router.get("/", (req, res) => {
  Tag.findAll({
    include: {
      model: Product,
    },
  })
    .then((allTagData) => res.json(allTagData))
    .catch((err) => res.status(500).json(err));
});

// find a single tag by its `id`
router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
    },
  })
    .then((oneTagData) => {
      if (!oneTagData) {
        res.status(404).json({ message: "ID not found" });
        return;
      }
      res.json(oneTagData);
    })
    .catch((err) => res.status(500).json(err));
});

// create a new tag
router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((createdTagData) => res.json(createdTagData))
    .catch((err) => res.status(500).json(err));
});

// update a tag's name by its `id` value
router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTagData) => {
      if (!updatedTagData) {
        res.status(404).json({ message: "ID not found" });
        return;
      }
      res.json(updatedTagData);
    })
    .catch((err) => res.status(500).json(err));
});

// delete on tag by its `id` value
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTagData) => {
      if (!deletedTagData) {
        res.status(404).json({ message: "ID not found" });
        return;
      }
      res.json(deletedTagData);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
