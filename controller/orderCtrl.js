const Order = require('../model/OrderModel')
const Auth = require('../model/authModel')
const Product = require('../model/productModel')

// stock and sold update
const updateStock = async (id, quantity, oldSold,oldStock) => {
    await Product.findOneAndUpdate({ _id: id }, {
        sold: Number(quantity + oldSold),
        stock: Number(oldStock-quantity)
        })

};

// random order id generation
const generateRandomOrderId = (len) => {
    let rString= '';
    let charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*#$';
    for (i = 0; i < len; i++)
        rString += charSet.charAt(Math.floor(Math.random() * charSet.length))
    return rString;
}

const orderCtrl = {
    newOrder: async (req,res) => {
        try {
            let userId = req.user.id;
            let orderId = generateRandomOrderId(8);
            let { cart, address,paymentMode,paymentId, paymentStatus,finalTotal } = req.body;

            cart.filter(item => {
                return updateStock(item._id, item.quantity,item.sold,item.stock)
            })

            await Order.create({
                    userId,
                    orderId,
                    cart,
                    finalTotal,
                    address,
                    paymentMode,
                    paymentId,
                    paymentStatus
                });

                await Auth.findOneAndUpdate({ _id: req.user.id}, {
                    cart: []
                })

             return   res.status(200).json({ msg: `Order confirmed, order id is ${orderId}`})

        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },
    getAll: async (req,res) => {
        try {
            let orders = await Order.find()
            return res.status(200).json({
                orders: orders,
                length: orders.length
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },
    updateOrderStatus: async (req,res) => {
        try {
            res.json("update order status")
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },
    delete: async (req,res) => {
        try {
            await Order.findOneAndDelete({ _id: req.params.id })
                res.status(200).json({ msg: "Order deleted successfuly"})
        } catch (err) {
        return res.status(500).json({ msg: err.message})
        }
    }
}

module.exports = orderCtrl





// const Order = require('../model/orderModel')
// const Auth = require('../model/authModel')
// const Product = require('../model/productModel')

// const updateStock = async (id,quantity,oldSold,oldStock) =>{
//     await Product.findOneAndUpdate({_id: id},{
//         sold: Number(quantity + oldSold),
//         stock: Number(oldStock-quantity)
//     })
// };

// const generateRandomOrderId = (len) =>{
//     let rString = '';
//     let charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*#$';
//     for(i=0; i < length; i++ )
//         rString += charSet.charAt(Math.floor(Math.random() * charSet.length))
//     return rString;
// }

// const orderCtrl = {
//     newOrder: async (req,res) =>{
//         try {
//             let userId = req.user.id;
//             let orderId = generateRandomOrderId(8)
//             let {cart, address,paymentMode,paymentId, paymentStatus } = req.body;

//             cart.filter(item =>{
//                 return updateStock(item._id,item.quantity,item.sold,item.stock)
//             })

//             if(paymentMode === "cod"){
//                 await Order.create({
//                     userId,
//                     orderId,
//                     cart,
//                     address,
//                     paymentMode,
//                 });
//                 // await Auth.findOneAndUpdate({_id: userId},{ 
//                 //     orderId,
//                 //     cart,
//                 //     address,
//                 //     paymentMode,
//                 //     paymentId,
//                 //     paymentStatus
//                 //  }); 
//                 res.status(200).json({msg: `order confirmed, order id is ${orderId}`})    
//                 } else {
//                     await Order.create({
//                         userId,
//                         orderId,
//                         cart,
//                         address,
//                         paymentMode,
//                         paymentId,
//                         paymentStatus:'paid'
//                     });
//                     // await Auth.findOneAndUpdate({_id: userId},{ 
//                     //     orderId,
//                     //     cart,
//                     //     address,
//                     //     paymentMode,
//                     //     paymentId,
//                     //     paymentStatus
//                     //  });  
//                     res.status(200).json({msg: `order confirmed, order id is ${orderId}`})   
//                 }
//             } catch (err) {
//             return res.status(500).json({msg: err.message })
//         }
//     },
//     getAll: async(req,res) =>{
//         try {
//             let orders = await Order.find()
//             res.status(200).json({
//                 orders: orders,
//                 orders: orders.length
//             })
//         } catch (err) {
//             return res.status(500).json({msg: err.message})
//         }
//     },
//     updateOrderStatus: async(req,res) =>{
//         try {
//             res.json("update order status")
//         } catch (err) {
//             return res.status(500).json({msg: err.message})
//         }
//     },
//     delete: async(req,res) =>{
//         try {
//             await Order.findOneAndDelete({ _id: req.params.id })
//             res.status(200).json({msg:"order deleted successfully"})
//         } catch (err) {
//             return res.status(500).json({msg: err.message})
//         }
//     },
    
// }

// module.exports = orderCtrl