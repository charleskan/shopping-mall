window.onload = async () => {
	console.log('hello world')
	getProductList()
	// getproductColor()
	// getproductSize()
}
let params = new URLSearchParams(window.location.search)

let productId = params.get('id')
// let searchQuery = ""

// async function deleteProduct() {

//     let delButtonElems = document.querySelectorAll('.productDelete button')
//     for (let delButtonElem of delButtonElems) {
//         // console.log(delButtonElem)
//         delButtonElem.addEventListener('click', async () => {

//             let productId = delButtonElem.dataset.id
//             console.log(productId)

//             let res = await fetch(`/updateProduct/${productId}`, {
//                 method: 'patch',
//                 body: JSON.stringify({
//                     "productID": `${productId}`,
//                     "newName": "",
//                     "newPrice": "",
//                     "newImage": "",
//                     "newDescription": "",
//                     "newStatus_id": "2",
//                     "newStock": ""
//                 }) // FormData 會自動幫你加 headers 的, 所以不用再加
//             })

//             getProductList("")
//         })
//     }
// }

// document.querySelector('.search').addEventListener('keydown', async (event) => {
//     searchQuery = document.querySelector('.search').value

//     getProductList(searchQuery);

// })

async function getProductList() {
	let res = await fetch(`/productinfo/${productId}`)
	let data = await res.json()

	let products = data.productInfo

	let productArea = document.querySelector('#individualProductArea')
	productArea.innerHTML = ''
	for (let i = 0; i < products.length; i++) {
		productArea.innerHTML +=
			/* HTML */
			`
        <div class="container-fluid">
        <div class="row mb-4 d-flex justify-content-between align-items-center" data-id=${products[i].id}>
        <div class="row">
            <div class="col-md-6">
                <img alt="ProductImage" src="/userUploadedFiles/${products[i].image}" height="200" width="200">
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-12 ">${products[i].name}</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">Price:$${products[i].price}
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">${products[i].description}
                    </div>
                <div class="row">
                    <div class="col-md-12">IN Stock:${products[i].stock}
                    </div>
                </div>
                <button id="addProductToCart" data-id=${products[i].id} class="btn btn-dark btn-block btn-lg">
                Add Product To Cart
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-10">
            </div>
        </div>
    </div>`
	}
	addProductToCart()
}

// async function getproductColor(){
// let productID = new URLSearchParams(window.location.search).get('id')
// let res = await fetch(`/productinfo/${productID}`)
// let data = await res.json()
// let productColors = data.productColor
// let productColor = document.querySelector('#productColor')
// for (let i = 0; i < data.productColor.length; i++) {
//     productColor.innerHTML += /* HTML */
//     `<option select input>${productColors[i].name}</option>`
// }
// }

// async function getproductSize(){

//     let res = await fetch(`/productinfo/${productID}`)
//     let data = await res.json()
//     let productSizes = data.productSize
//     let productSize= document.querySelector('#productSize')
//     for (let i = 0; i < data.productSize.length; i++) {
//         productSize.innerHTML += /* HTML */
//         `<option select input>${productSizes[i].name}</option>`
//     }
//     }

// async function
//         document.querySelector('#addProductToCart').addEventListener('click', async (event) => {
//             event.preventDefault()

//             let productId = productElem.dataset.id

//             let res = await fetch(`/cart/${productId}`, {
//                 method: 'POST',
//                  // FormData 會自動幫你加 headers 的, 所以不用再加
//             })
//             console.log(productId)

//             let product = await res.json()
//             console.log(product)
//             if (product.result == true) {
//                 alert('Successfully Add Cart')
//             } else {
//                 alert('Failed to Add Cart')
//             }
//         })

async function addProductToCart() {
	let productElems = document.querySelectorAll('#addProductToCart')

	for (let productElem of productElems) {
		productElem.addEventListener('click', async () => {
			console.log(productId)
			// let productId = productElem.dataset.id
			const res = await fetch(`/cart/${productId}`, {
				method: 'POST'
			})

			let product = await res.json()
			console.log(product)
			if (product.result == true) {
				alert('Successfully Add Cart')
			} else {
				alert('Failed to Add Cart')
			}
		})
	}
}
