const db = require("../postgresql.js");

function getAllItems (req, res, next) {
    db.query('SELECT * FROM "Item" ')
    .then(productData => {
    res.send(productData);
})
};

function filterByMen(req, res, next) {
    db.query(`SELECT * FROM "Product" WHERE "genre" = 'men' `)
    .then(productDataMen => {
        res.send(productDataMen);
    })
};

function filterByWomen(req, res, next) {
    db.query(`SELECT * FROM "Product" WHERE "genre" = 'women' `)
    .then(productDataWomen => {
        res.send(productDataWomen);
    })
};

function findCustomerCart(req, res, next) {
    const customerId = req.user.id;
    console.log('item id: ', req.body.id);
    //console.log(req)
    db.any('SELECT id FROM cart where customerid = $1', [customerId])
        .then(function(data) {
            //const cartId = data[0].id;
            res.locals.cartId = data[0].id; 
            next()
        })
        .catch(function(error) {
            console.log("ERROR FINDING CART ASSOCIATED WITH CUSTOMER")
        });   
}

function checkIfItemAlreadyAddedToCart(req, res, next) {
    const cartId = res.locals.cartId;
    db.any('SELECT quantity FROM cartitem WHERE cartid = $1', [cartId])
        .then(function(data) {
            res.locals.quantity = data[0].quantity;
            next();
        })
        .catch(function(error) {
            res.locals.quantity = 0;
            next();
        });    
}

function incrementCartItemQuantity(req, res, next) {
    const itemId = req.body.id;
    const quantity = res.locals.quantity;
    const cartId = res.locals.cartId;
    if (quantity === 0) {
        db.one('INSERT INTO cartitem(cartid, quantity, itemid) VALUES($1, $2, $3) RETURNING id', [cartId, 1, itemId])
            .then(data => {
                next(); // print new user id;
            })
            .catch(error => {
                console.log('ERROR CREATING NEW CARTITEM RECORD:', error);
                res.send(error); // print error;
            });
    }
    else {
        db.none('UPDATE cartitem SET quantity = $1 WHERE cartid = $2', [quantity + 1, cartId])
            .then( () => {
                next();
            })
            .catch(error => {
                console.log('ERROR INCREMENTING QUANTITY FROM STOCK:', error);
                res.send(error); // print error;
            });
    }
}

function decrementStockItemQuantity(req, res, next) {
    const itemId = req.body.id;
    const count = req.body.count;

    db.none('UPDATE "Item" SET quantity = $1 WHERE id = $2', [count - 1, itemId])
        .then( () => {
            // req.json("SUCCESSSSS");
            console.log('Success');
        })
        .catch(error => {
            console.log('ERROR DECREMENTING ITEM QUANTITY FROM STOCK:', error);
            res.send(error); // print error;
        });

}

function addItemToCart(req, res, next) {
    const customerId = req.body.user.id;
    const itemId = req.body.id;
    //console.log("customerId: ", typeof customerId)
    db.any('SELECT id FROM cart where customerid = $1', [customerId])
        .then(function(data) {
            const cartId = data[0].id;
            //console.log("FOUND CART ID:", cartId);
            db.one('INSERT INTO cartitem(cartid, quantity, itemid) VALUES($1, $2, $3) RETURNING id', [cartId, 1, itemId])
                .then(data => {
                    console.log(data);
                    res.json(data); // print new user id;
                })
                .catch(error => {
                    console.log('ERROR:', error); // print error;
                });
            // success;
        })
        .catch(function(error) {
            console.log("BOLLOCKS")
        });

}


module.exports = {
    getAllItems,
    filterByMen,
    filterByWomen,
    addItemToCart,
    findCustomerCart,
    checkIfItemAlreadyAddedToCart,
    incrementCartItemQuantity,
    decrementStockItemQuantity
};