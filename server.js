import express from "express";
const app = express();
app.use(express.json());

const products = [
    {   id: 1, name: "Lenovo",
         price: 270000, category: "Laptop", stock: 12},
    {   id: 2, name: "Iphone 17",
         price: 1100000, category: "Phone", stock: 9  },
    { id: 3, name: "Samsung",
         price: 780000, category: "Phone", stock: 7 }

    ];

    console.log(products);

    app.get("/api/products/search", (req, res) =>{

        const productName = req.query.name?.toLocaleLowerCase() || "";

        if(!req.query.name){
            return res.status(400).json({
                success: false,
                message: "Search name is required"
            });
        }
        const searchProduct = products.filter(product =>
            product.name?.toLocaleLowerCase().includes(productName));
        if(searchProduct.length ===  0){
            return res.status(404).send("Product not found");
        }

        res.json(searchProduct);
    } )

     app.get("/api/products/find", (req, res) =>{

         if(!req.query.name){
            return res.status(400).json({
                success: false,
                message: "Search name is required"
            });
        }

        const foundPorduct = products.find(product =>
             product.name === req.query.name);
        if(!foundPorduct){
            return res.status(404).send("product not found");
        }
        res.json(foundPorduct);
    });

    app.get("/api/products", (req, res) =>{
        res.status(200).json({
            success: true,
            data: products
        });
    });

    app.get("/api/products/filter", (req, res) =>{

          if(!req.query.category){
            return res.status(400).json({
                success: false,
                message: "Filter category is required"
            });
        }

        const filteredPorducts = products.filter(product =>
             product.category.toLocaleLowerCase() === req.query.category.toLocaleLowerCase());
            if(filteredPorducts.length === 0){
                return    res.status(404).send("Product not found");
            }
        res.json(filteredPorducts);
    }); 

    app.get("/api/products/:id", (req, res) =>{
       const productId = Number(req.params.id);
if(Number.isNaN(productId)){
           return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = products.find(product => product.id === productId);
          
          if(!product){
             return   res.status(404).send("Product not found");
            }
        
            res.json(product);
    });

    app.post("/api/products/", (req, res)  =>{

        const nextId = products.map(product => product.id);
        const newId = Math.max(...nextId) + 1;
        const newProduct = { id: newId,
            name: req.body.name, price: req.body.price,
             category: req.body.category, stock: req.body.stock
        }

             if(!req.body ||
                !req.body.name || !req.body.category 
                || !Number.isFinite(req.body.price)
                || !Number.isFinite(req.body.stock)
            ){
                return res.status(400).json({
                    success: false,
                    message: "All product fields are required and must be valid"
                });
            }
            
        products.push(newProduct);
        res.status(201).json(newProduct);
    } );

    app.put("/api/products/:id", (req, res) =>{
        const productId = req.params.id;
        const updatedProduct  = products.find(product => 
            product.id === Number(productId));

                if(!updatedProduct){
               return res.status(404).send("Product not found");
            };

              if(!req.body ||
                !req.body.name || !req.body.category 
                || !Number.isFinite(req.body.price)
                || !Number.isFinite(req.body.stock)
            ){
                return res.status(400).json({
                    success: false,
                    message: "All product fields are required and must be valid"
                });
            }
        const newProduct = {
            id: Number(productId),
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock
        };
         Object.assign(updatedProduct, newProduct);
        res.json(updatedProduct);
    });

    app.delete("/api/products/:id", (req, res) =>{
        const delId = req.params.id;
        const productId = Number(delId);
        if(!Number.isInteger(productId) || productId <= 0){
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            })
        }
      const delProductIndex = products.findIndex(product => product.id === productId);
        if(!delProductIndex || delProductIndex === -1){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
         const product =  products.splice(delProductIndex, 1);
    
        res.json(product);
    }); 

   
const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
});