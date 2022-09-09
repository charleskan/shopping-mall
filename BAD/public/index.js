document.querySelector("#login-form").addEventListener('submit', async (event) => {
    event.preventDefault()

    let res = await fetch('/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": document.querySelector("#username").value,
            "password": document.querySelector("#password").value,
            // "isAdmin": isAdmin
        }) // FormData 會自動幫你加 headers 的, 所以不用再加
    })

    let result = await res.json();

    if (result.msg == "username not exist") 
    {
        alert("username not exist")
    }
    else if (result.msg == "password miss match")
    {
        alert("password not match")
    }
    else if (result.msg == "The user is not active")
    {
        alert("The user is not active")
    } else if
    (result.msg == "login success")
    {   
        window.location.href = "/product.html"
    }
})

// document.querySelector("#singUp-form").addEventListener('submit', async (event) => {
//     event.preventDefault()

//     let res = await fetch('/register', {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             "username": document.querySelector("#newUsername").value,
//             "password": document.querySelector("#newPassword").value,
//             "email": document.querySelector("#email").value,
//             "nickname": document.querySelector("#nickname").value,
//             "role_id":2,
//             "status":1
//             // "isAdmin": isAdmin
//         }) // FormData 會自動幫你加 headers 的, 所以不用再加
//     })

//     let result = await res.json();

//     if (result.msg == "missing register info") 
//     {
//         alert("missing register info")
//     }
//     else if (result.msg == "username already exists")
//     {
//         alert("username already exists")
//     }
//     else if (result.msg == "email already exists")
//     {
//         alert("email already exists")
//     } else if
//     (result.msg == "register success")
//     {   
//         alert("register success")
//         window.location.href = "/"
//     }
// })

