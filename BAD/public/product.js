window.onload = async () => {
    console.log('public/product.js')
    getProductList()
}
// let params = new URLSearchParams(window.location.search)
// let productId = params.get('id')
// // console.log(productId)
// let searchQuery = ""

// getProductList(searchQuery)

async function getProductList() {
    // console.log(searchQuery)
    let res = await fetch(`/allProductInfo`)
    let data = await res.json()
    let products = data.allProductInfo
    console.log(data.allProductInfo)



    let productArea = document.querySelector('#individualProductArea')
    productArea.innerHTML = ''
    for (let i = 0; i < products.length; i++) {

        productArea.innerHTML += /* HTML */
            `
        <div class="row mb-4 d-flex justify-content-between align-items-center" data-id=${products[i].id}>
            <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <img src="/userUploadedFiles/${products[i].image}" height="200" width="200">
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-12"><a class="getIProductInfo" href="/productInfo.html?id=${products[i].id}">${products[i].name}</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">$: ${products[i].price}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">${products[i].description}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">In Stock:${products[i].stock}
                        </div>
                    </div>

                    <td>
                    <button class="productDelete" data-id=${products[i].id}>X</button>
        
                    </td>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                </div>
                <div class="col-md-10">
                </div>
            </div>
        </div>
        </div>
        `
    }
    deleteProduct()
}





async function deleteProduct() {

    let delButtonElems = document.querySelectorAll('.productDelete')
    for (let delButtonElem of delButtonElems) {
        // console.log(delButtonElem)
        delButtonElem.addEventListener('click', async () => {

            let productId = delButtonElem.dataset.id
            console.log(productId)


            const res = await fetch(`/updateProduct/${productId}`, {
                method: 'PATCH',

            })


            getProductList()
        })
    }

}

// document.querySelector('.search').addEventListener('keydown', async (event) => {
//     searchQuery = document.querySelector('.search').value

//     getProductList(searchQuery);

// })


// async function getProductInfo() {

//     let individualProductLinks = document.querySelectorAll('.getIProductInfo')
//     for (let individualProductLink of individualProductLinks) {
//         individualProductLink.addEventListener('click', async () => {

//             let productId = individualProductLink.dataset.id
//             console.log(productId)
//         })
//     }
// }

// let submitButton = document.querySelector('.submit')

//     submitButton.addEventListener('submit', async (e) => {
//         e.preventDefault
//         const formData = new FormData(document.querySelector('.productform'))
//         const res = await fetch(`/createProduct`, {
//             method: 'POST',
//             body: formData // FormData 會自動幫你加 headers 的, 所以不用再加
//         })



//     let product = await res.json()
//     consolo.log(product)
//     if (product.result == true) {
//         consolo.log(product)
//         getProductList() 
//         alert('Successfully Create')
//     } else {
//         alert('Failed to Create')
//     }
// })



if (document.querySelector('.productform') != null) {
    document.querySelector(".productform").addEventListener('submit', async (event) => {
        event.preventDefault()


        const formData = new FormData(document.querySelector(".productform"));
        let res = await fetch('/createProduct', {
            method: 'POST',
            body: formData // FormData 會自動幫你加 headers 的, 所以不用再加
        })


        let product = await res.json()
        console.log(product)
        if (product.result == true) {
            getProductList()
            alert('Successfully Create')
        } else {
            alert('Failed to Create')
        }
    })
}


document.querySelector('#open-button').addEventListener('click', function () {
	document.querySelector('.addProductForm').style.display = 'block'
})

document.querySelector('.leave-button').addEventListener('click', function () {
	document.querySelector('.addProductForm').style.display = 'none'
})

