const express = require ('express');
const fs = require ('fs');
const app = express();

app.use(express.json());
app.use('/', express.static('public'));

app.get('/catalog', (req, res) => {
    fs.readFile('server/db/catalog.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0}));
        } else {
            res.send(data);
        }
    });
});

app.get('/basket', (req, res) => {
    fs.readFile('server/db/basket.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0}));
        } else {
            res.send(data);
        }
    });
});

app.post('/basket', (req, res) => {
    fs.readFile('server/db/basket.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0}));
        } else {
            let basket = JSON.parse(data);
            basket.amount += req.body.price;
            basket.countGoods++;
            basket.contents.push(Object.assign({}, req.body, {quantity: 1}));
            fs.writeFile('server/db/basket.json', JSON.stringify(basket, null, 2), (err) => {
                if(!err){
                    res.send(JSON.stringify({result: 1}));
                } else {
                    res.sendStatus(500, JSON.stringify({result: 0}));
                }
            });
            res.send(data);
        }
    });
    // fs.readFile('server/db/basket.json', 'utf-8', (err, data) => {
    //     if(err){
    //         res.sendStatus(404, JSON.stringify({result: 0}));
    //     } else {
    //         res.send(data);
    //     }
    // });
});

app.put('/basket/:id', (req, res) => {
    fs.readFile('server/db/basket.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0}));
        } else {
            let basket = JSON.parse(data);
            let find = basket.contents.find(pr => pr.id_product === +req.params.id);
            req.body.op === 1 ? basket.amount += find.price : basket.amount -= find.price;
            basket.countGoods += req.body.op;
            find.quantity += req.body.op;
            fs.writeFile('server/db/basket.json', JSON.stringify(basket, null, 2), (err) => {
                if(!err){
                    res.send(JSON.stringify({result: 1}));
                } else {
                    res.sendStatus(500, JSON.stringify({result: 0}));
                }
            });
            res.send(data);
        }
    });
});

app.listen(5000, () => {
    console.log('Server listening a port 5000');
});