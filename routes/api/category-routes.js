const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//get all
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(400).json({ message: 'No Product found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//create
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      product_id: req.body.product_id,
    });
    res.status(200).json(newCategory);
  }catch(err){
   res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
