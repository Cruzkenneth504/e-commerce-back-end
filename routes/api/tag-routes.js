const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//get all
router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include:[{ model: Product}, {model: ProductTag}],
    })
    res.status(200).json(tagData)
  }catch(err){
    res.status(500).json(err)
  }
});
//get single by id
router.get('/:id', async (req, res) => {
  try { 
    const tagData = await Tag.findByPk(req.params.id,{
      include :[{ model: Product}, {model: ProductTag}],
    });
    if (!tagData){
      res.status(404).json({ message: 'No Tag found with that id'});
      return
    }
    res.status(200).json(tagData)
  }catch(err){
    res.status(500).json(err)
  }
});
//create new post
router.post('/', async (req, res) => {
  try { 
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
  } catch(err) {
    res.status(400).json(err)
  }
});
//update tag by id value
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
   if (!updatedTag){
      res.status(400).json({message: 'No new tag found with that id'})
      return
    }
    res.status(200).json(updatedTag);
  }catch(err){
    res.status(500).json(err)
  }
});
//delete tag by id value
router.delete('/:id', async (req, res) => {
  try{
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });
    if(!deleteTag){
      res.status(404).json({ message: 'No tag found with that id'});
      return
    }
    res.status(200).json(deleteTag);
  }catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
