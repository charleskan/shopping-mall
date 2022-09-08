window.onload = async () => {
    console.log('private/js/product.js')
    // getProductList(searchQuery)
    // getFreebieList(searchQuery)
}
let params = new URLSearchParams(window.location.search)
let productId = params.get('id')
// console.log(productId)
let searchQuery = ""

 


// async function getProductList(searchQuery) {
//     // console.log(searchQuery)
//     let res = await fetch(`/searchProductIdByName?keyword=${searchQuery}`)
//     let data = await res.json()
//     let products = data.productId.rows
//     console.log(products)

//     let pdOption = "<option value='0'>select</option>"

//     let productArea = document.querySelector('#productArea')
//     productArea.innerHTML = ''
//     for (let i = 0; i < products.length; i++) {

//         productArea.innerHTML += /* HTML */
//             `

//         <option value="" disabled selected></option>
//         <option class="productName" value="${products[i].name}">${products[i].name}</option>



//         `
//     }

// }

// async function getFreebieList(searchQuery) {
//     // console.log(searchQuery)
//     let res = await fetch(`/searchProductIdByName?keyword=${searchQuery}`)
//     let data = await res.json()
//     let freebie = data.productId.rows
//     console.log(freebie)

//     let freebieArea = document.querySelector('#freebieArea')
//     freebieArea.innerHTML = ''
//     for (let i = 0; i < freebie.length; i++) {

//         freebieArea.innerHTML += /* HTML */
//             `
        
//         <option value="" disabled selected></option>
//         <option class="freebieName" value="${freebie[i].name}">${freebie[i].name}</option>
        

//         `
//     }

// }





// submit form of create promotion
if (document.querySelector('#promotion-form') != null) {
    document.querySelector('#promotion-form').addEventListener('submit', async (event) => {
        event.preventDefault()

        let res = await fetch('/promotion', {


            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "promotion": document.querySelector("#promotion").value,
                "productname": document.querySelector(".searchProduct").value,
                "productnumber": document.querySelector("#productnumber").value,
                "freebiename": document.querySelector(".searchFreebie").value,
                "freebienumber": document.querySelector("#freebienumber").value
            })
        })
        let result = await res.json();
        // console.log(result)
    
        if (result.result == true) {
            alert("create promotion success")
            window.location.href = "/html/promotion.html"
        }
    })




}

// if (document.querySelector('.searchProduct') != null) {
//     document.querySelector('.searchProduct').addEventListener('keydown', async (event) => {
//         searchQuery = document.querySelector('.searchProduct').value
//         console.log(searchQuery)

//         getProductList(searchQuery);

//     })
// }

// if (document.querySelector('.searchFreebie') != null) {
//     document.querySelector('.searchFreebie').addEventListener('keydown', async (event) => {
//         searchQuery = document.querySelector('.searchFreebie').value
//         console.log(searchQuery)

//         getFreebieList(searchQuery);

//     })
// }