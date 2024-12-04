const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/items', itemRoutes);
router.use('/events', eventRoutes);
router.use('/locations', locationRoutes);

module.exports = router;