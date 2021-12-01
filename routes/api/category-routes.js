const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint
//working
router.get('/', async(req, res) => {
    try {
        const categoryData = await Category.findAll({
            include: [{ model: Product }]
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
})


// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async(req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [{ model: Product }]
        });
        if (!categoryData) {
            res.status(404).json({ message: 'No category with that id!' });
            return;
        }
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async(req, res) => {
    // Category.create(req.body)
    try {
        const categoryData = await Category.create(req.body);
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err);
    }
    //     .then((category) => {
    //         if (req.body.category_name) {
    //             const catName = req.body.category_name.map((category_name) => {
    //                 return {
    //                     category_name
    //                 };
    //             });
    //             return ProductTag.bulkCreate(catName);
    //         }
    //         res.status(200).json(category);
    //     }).then((cats) => res.stauts(200).json(cats))
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(400).json(err)
    //     })
    // create a new category
    // {
    //   'category_name': "Belts"
    // }
});


// update a category by its `id` value
router.put('/:id', (req, res) => {
    Category.update({
            category_name: req.body.category_name,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then((updatedCategory) => {
            res.json(updatedCategory);
        })
        .catch((err) => res.json(err));
});

//delete is working 
router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(categoryData => {
            if (!categoryData) {
                res.status(404).json({ message: 'No category found with this id' });
                return;
            }
            res.json(categoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;