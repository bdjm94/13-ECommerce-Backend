const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
try {
  const tagData = await Tag.findAll(
    {
      include: [
      {
        model: Product,
        through: ProductTag
      }
    ]
  });
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
try {
  const tagData = await Tag.findByPk(req.params.id, {
      include: [
      {
        model: Product,
        through: ProductTag
      }
    ]
  });
  if (!tagData) {
    res.status(404).json({ message: 'Error! No Product found with that ID!' });
    return;
  }
  res.status(200).json(tagData);
}
catch(err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
try {
  const tagNew = await Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name
  });
  res.status(200).json(tagNew);
} catch (err) {
  res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
try {
  const tagUpdate = await Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    });
    if (!tagUpdate) {
      res.status(404).json({ message: 'Error! No Product found with that ID!' });
      return;
    }
    res.status(200).json(tagUpdate);
  }
  catch(err) {
    res.status(500).json(err);
  }
  });

router.delete('/:id', async (req, res) => {
try {
  const tagDelete = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });
  if (!tagDelete) {
    res.status(404).json({ message: 'Error! No Product found with that ID!' });
    return;
  }
  res.status(200).json(tagDelete);
}
catch(err) {
  res.status(500).json(err);
}
});

module.exports = router;
