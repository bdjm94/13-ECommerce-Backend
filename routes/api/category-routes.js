const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
try {
  const categoryData = await Category.findAll(
    {
      include: [{
      model: Product,
    }],
  });
    res.status(200).json(categoryData);
  } catch(err) {
      res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
try {
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{
      model: Product
    }],
  });
  if (!categoryData) {
    res.status(404).json({ message: 'Error! No Category found with that ID!' });
    return;
  }
  res.status(200).json(categoryData);
} catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
try {
  const productNew = await Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  });
  res.status(200).json(productNew);
} catch(err) {
    res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
try {
  const categoryUpdate = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
      if (!categoryUpdate) {
        res.status(404).json({ message: 'Error! No Category found with that ID!' });
        return;
      }
    res.status(200).json(categoryUpdate);
  } catch(err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
try {
  const categoryDelete = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
  if (!categoryDelete) {
    res.status(404).json({ message: 'Error! No Category found with that ID!' });
    return;
  }
res.status(200).json(categoryDelete);
} catch(err) {
  res.status(500).json(err);
}
});

module.exports = router;
