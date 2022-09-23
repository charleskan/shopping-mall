
import Stripe from "stripe";

export const stripe = new Stripe('sk_test_NEAd6OfH2DleQmaJjk6dNmmq', {
	apiVersion: '2022-08-01'
})


app.patch('/memo', (req, res) => {


    try {
        //May be use transaction
        const user_id = req.session!.user_id //change jwt later


        //@@PATCH change patch later
        let result = await client.query('INSERT INTO memos (content, image, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) returning id',
            [content, photo])

        const invoiceId = result.rows[0].id

        
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1LE8JBJV8AI11l7MzBk8G88W',
                    quantity: 1
                }
            ],
            metadata: {
                id: invoiceId
            },
            mode: 'payment',
            success_url: `http://192.168.80.58:8000/success.html`,
            cancel_url: `http://192.168.80.58:8000/`
        })
        
        if (session.url != null) {
            res.redirect(session.url, 303)
        } else {
            res.redirect('/')
        }
        res.json({memoId, content, photo})
        res.end()


    } catch (err) {
        logger.error(err)
    }
    
})