
import Stripe from 'stripe';

//const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    console.log("bu nerder", req.body.cartItems)
    try {
      const params = {
        submit_type:'pay',
       // mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection:'auto',
        shipping_options:[
            {shipping_rate:'shr_1MwWE3Lb1AiEdsHigTkn8P4t'},
            {shipping_rate:'shr_1MwWF5Lb1AiEdsHi00PN6ljH'},
        ],
        line_items: req.body.cartItems.map((item:any)=>{
            const img = item.image[0].asset._ref;
            const newImg = img.replace('image-','https//cdn.sanity.io/images/xb2rc1si/production/').replace('-webp','.webp');
            console.log('image',newImg)
            return{
                price_data:{
                    currency:'try',
                    product_data:{
                        name:item.name,
                        images:[newImg],
                    },
                    unit_amount: item.price*100,
                },
                adjustable_quantity:{
                    enabled:true,
                    minimum:1,
                },
                quantity: item.quantity,
            }
        }),
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      console.log('res', res.json); 
      res.status(200).json(session);
    } catch (err: any) {
        console.log('Stripe API Error:', err); 
       res.status(err.statusCode || 500).json({ error: err.message });
     
       res.status(500).json({statusCode:500,message: err.message})
      }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
