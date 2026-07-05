const express = require('express');
const router = express.Router();
const data = require('./data/data.json');



/* GET category page. */
router.get('/', function(req, res, next) {
  res.render('cat', { 
    "title": 'All caregories',
    "data" : data
  });
});

router.get("/:catname", function(req, res, next){
  console.log(req.params);
  const catname = req.params
  const category = catname.catname
  console.log(category)
  if (!category) return res.send("Категория не найдена")
  // фильтрованные товары

  const filteredProducts = data.filter(product => {
    return product.category === category
  });
  console.log(filteredProducts)
  if (filteredProducts.length === 0) return res.status(404).send("Товаров в категории нет")

  console.log(catname)
  res.render('single_cat', {
    data : filteredProducts,
    title: data.title,
    category: category
    })
})

module.exports = router;
