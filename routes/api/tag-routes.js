const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      // include Products
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id' });
      return;
    }
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No Category found with this id' });
      return;
    }
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// *** Delete needs more work as it has references *** // 
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'No Category found with this id' });
      return;
    }
    res.json(deletedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
