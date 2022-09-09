async function getUserAllinfo() {
	const res = await fetch('/userInfo')
	const user = await res.json()

	let username = user.userInfo[0].username
	let nickname = user.userInfo[0].nickname
	let email = user.userInfo[0].email
	let profilepic = user.userInfo[0].icon
	let addresses = user.addressInfo.rows

	// Dear my groupmates, please forgive me, I don't want to change the code too much.
	let role = user.userInfo[0].role_id
	if (role == 1) {
		role = 'Admin'
	} else if (role == 2) {
		role = 'Normal User'
	} else if (role == 3) {
		role = 'VIP'
	}

	if (document.querySelector('.address') != null) {
        document.querySelector(
            '.address'
        ).innerHTML = ''
		for (const address of addresses) {
			document.querySelector(
				'.address'
			).innerHTML += `${address.name}<br>`
		}
	}


	document.querySelector(
		'.username'
	).innerHTML = /*HTML */`<span>Username : </span>${username}
            
            `
	document.querySelector(
		'.nickname'
	).innerHTML = /*HTML */ `<span>Nickname : </span>${nickname} 
            <input type="text" name="nickname">`


	document.querySelector(
		'.email'
	).innerHTML = /*HTML */ `<span>Email : </span>${email}
            `


	document.querySelector('.role').innerHTML = `<span>Role : </span>${role}`


	document.querySelector(
		'.submitbutton'
	).innerHTML = /*HTML */ `<button class="btn btn-primary submit" type="submit">Submit</button>`








	
	const iconSpans = document.querySelectorAll('.iconpic')
	for (const Span of iconSpans) {
		if (profilepic != null) {
			Span.innerHTML = /*HTML */ `<img src="/userUploadedFiles/${profilepic}"><br>
            <input type="file" name="icon">`
		} else {
			Span.innerHTML = /*HTML */ `<img src="/serverDefaultedImages/defaultusericon.webp"><br>
            <input type="file" name="icon">`
		}
	}



	document.querySelector('.submit').addEventListener('click', async function(e) {
        e.preventDefault()
        const formData = new FormData(document.querySelector('.userform'))
        const res = await fetch('/editUser', {
            method: 'PATCH',
            body: formData
        })
        const user = await res.json()
        if (user.result) {
            getUserAllinfo()
            alert('Successfully updated')
        } else {
            alert('Failed to update')
        }
    })
}
getUserAllinfo()
