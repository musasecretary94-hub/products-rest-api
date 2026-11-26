
const res = await fetch("http://localhost:3000/api/products/", {
    method: "POST",
    headers: {
    "content-type": "application/json"
       },
          body: JSON.stringify({
            name: "Infinix HOT 12 Play",
            price: 2,
            category: "Phone",
            stock: 11
    })
});


const data = await res.json();
console.log(data);

const response = await fetch("http://localhost:3000/api/products/2", {
    method: "PUT",
    headers: {
        "content-type": "application/json"
    },
     body: JSON.stringify({
        name: "Iphone 17 Pro",
        price: 1300000,
        category: "Phone",
        stock: 8
     })
})


const dat = await response.json();
console.log(dat);

const respo = await fetch("http://localhost:3000/api/products/2", {
    method: "DELETE"
});

const datas = await respo.json();
console.log(datas);

