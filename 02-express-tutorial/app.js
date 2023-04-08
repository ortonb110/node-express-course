const express = require("express");
const app = express();

const {products} = require('./data')

app.get('/', (req, res)=> {
    res.send("<h1>Welcome to the homepage</h1><a href='/api/products'>Products</a>")
})

app.get("/api/products", (req, res) => {
    const newProduct = products.map(items=> {
        const {id, name, image} = items;
        return {id, name, image};
    })
  res.json(newProduct);
});
app.get("/api/products/:productID", (req, res) => {
  const {productID} = req.params;
  const singleProduct = products.find((product)=> product.id === Number(productID))
  if(!singleProduct) {
    return res.status(404).send("<h1>Product does not exist</h1>")
  }
  res.json(singleProduct);
});

app.get('/api/v1/query', (req, res)=> {
  let sortedProducts = [...products];
  const {search, limit} = req.query;
  if(search){
    sortedProducts = sortedProducts.filter((products)=> {
        return products.name.startsWith(search);
    })
  }
  if(limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  res.status(200).json(sortedProducts);
})

app.listen(5000, () => {
  console.log("Server started on port 5000...");
});
