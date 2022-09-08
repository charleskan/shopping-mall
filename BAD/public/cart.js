//====   Run the function   =================================================================================================================================================
getAllProductInCart()
window.onload = async () => {
  console.log('hello world')
  getAllProductInCart()
  getFreebie()
}

async function getFreebie() {
  const res = await fetch('/freebie')
  const data = await res.json()
  let freebieInCart = data.freebieDetails.rows
  // console.log(freebieInCart);
  let freebieArea = document.querySelector('#freebieInCartArea')
  freebieArea.innerHTML = ''

  for (let i = 0; i < freebieInCart.length; i++) {
    freebieArea.innerHTML +=
      /*HTML */
      `
  <div class="row mb-4 d-flex justify-content-between align-items-center" data-id=${freebieInCart[i].freebie_id}>
  <div class="col-md-2 col-lg-2 col-xl-2">
    <img src="/userUploadedFiles/${freebieInCart[i].image}" alt="Image" class="img-fluid"
      class="img-fluid rounded-3" alt="">
  </div>
  <div class="col-md-3 col-lg-3 col-xl-3">
    <h6 class="text-black mb-0">${freebieInCart[i].name}</h6>
  </div>
  <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
  

    <span class="form-control-sm">${freebieInCart[i].number_of_freebie}</span>
  
  <i>
  </i>
  <i>
  </i>

  </div>
  <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
    <h6 class="mb-0">$ 0</h6>
  </div>

  <div class="col-md-1 col-lg-1 col-xl-1 text-end">
  </div>

</div>
  `
  }
  getAllProductInCart()
}

async function getTotalPrice() {
  const price = await fetch('/totalPrice')
  const data = await price.json()
  let totalPrice = data.getTotalPrice.rows

  if (totalPrice.length == 0) {
    document.querySelector('#totalprice').innerText = `$ 0`
  } else if (totalPrice[0].total_price != null) {
  document.querySelector('#totalprice').innerHTML = `$ ${totalPrice[0].total_price}`
}
}

// ==========================================================================================================================================================================
async function getAllProductInCart() {

  let res = await fetch(`/cart`)
  let data = await res.json()
  let productInCart = data.productRecord.rows

  let cartArea = document.querySelector('#productInCartArea')
  cartArea.innerHTML = ''
  for (let i = 0; i < productInCart.length; i++) {
    cartArea.innerHTML += /*HTML */
      `            
            <div class="row mb-4 d-flex justify-content-between align-items-center" data-id=${productInCart[i].id}>
              <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="/userUploadedFiles/${productInCart[i].image}" alt="Image" class="img-fluid"
                  class="img-fluid rounded-3" alt="">
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <h6 class="text-black mb-0">${productInCart[i].name}</h6>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button id="productMinusButton" data-id=${productInCart[i].id} class="btn btn-link px-2">
                  <i class="fas fa-minus"></i>
                </button>

                <span class="form-control-sm">${productInCart[i].sum_of_number}</span>

                <button id="productPlusButton" data-id=${productInCart[i].id} class="btn btn-link px-2">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0">$ ${productInCart[i].sum_of_price}</h6>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <i class="text-muted productDelete button"><button data-id=${productInCart[i].id}>X</button></i>
              </div>
          </div>
          `
  }
  addProductToCart()
  deleteProductInCart()
  minusProductInCart()
  getTotalPrice()
}

async function deleteProductInCart() {

  let delButtonElems = document.querySelectorAll('.productDelete button')
  for (let delButtonElem of delButtonElems) {
    // console.log(delButtonElem)
    delButtonElem.addEventListener('click', async () => {

      let productId = delButtonElem.dataset.id
      // console.log(productId)

      const res = await fetch(`/cart/${productId}`, {
        method: 'DELETE',

      })


      // getAllProductInCart()
      getFreebie()
    })
  }
}

async function minusProductInCart() {

  let minusButtonElems = document.querySelectorAll('#productMinusButton')

  for (let minusButtonElem of minusButtonElems) {
    minusButtonElem.addEventListener('click', async () => {

      let productId = minusButtonElem.dataset.id
      // console.log(productId)

      const res = await fetch(`/minusProductInCart/${productId}`,
        {
          method: 'DELETE',

        })
        getFreebie()
    })

  }
}

async function addProductToCart() {
  
    let plusButtonElems = document.querySelectorAll('#productPlusButton')
  
    for (let plusButtonElem of plusButtonElems) {
      plusButtonElem.addEventListener('click', async () => {
  
        let productId = plusButtonElem.dataset.id
        // console.log(productId)
  
        const res = await fetch(`/cart/${productId}`,
          {
            method: 'POST',
  
          })
          getFreebie()
      })
  
    }
  }
