const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
//working 
router.get('/', async(req, res) => {
    try {
        const tagData = await Tag.findAll({
            include: [{ model: Product }]
        });
        res.status(200).json(tagData);

    } catch (err) {
        res.status(500).json(err);
    }
});


// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async(req, res) => {
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [{ model: Product }]
        });
        if (!tagData) {
            res.status(404).json({ message: 'No tag with that id!' });
            return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// create a new tag
//working
router.post('/', async(req, res) => {
    try {
        const tagData = await Tag.create(req.body);
        res.status(200).json(tagData);
    } catch (err) {
        res.status(400).json(err);
    }
});



// update a tag's name by its `id` value
//working
router.put('/:id', (req, res) => {
    Tag.update({
            tag_name: req.body.tag_name,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then((updatedTag) => {
            res.json(updatedTag);
        })
        .catch((err) => res.json(err));
});

// delete on tag by its `id` value
//not tested yet
router.delete('/:id', (req, res) => {
    Tag.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(tagData => {
            if (!tagData) {
                res.status(404).json({ message: 'No category found with this id' });
                return;
            }
            res.json(tagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

module.exports = router;