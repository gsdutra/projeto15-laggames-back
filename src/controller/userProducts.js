import db from '../config/db.js'
//import dayjs from 'dayjs'
import { ObjectId } from "mongodb"

export async function getUserProducts(req,res){

	const session = res.locals.sessao
	const userId = session.userId

	//console.log("Rodou getUserProducts")

	//hypotheticalUserId
	//const userId = "63d40c8ad967b40c2b1a8a5b" //Obter com o token

	try{
		const userProducts = await db.collection("sessions").findOne({_id: ObjectId(userId)});

		const productIdsArray = userProducts.userProducts

		let items = []

		let total = 0;

		for (let i = 0; i < productIdsArray.length; i++) {

			const product = await db.collection("games").findOne({_id: ObjectId(productIdsArray[i].productId)})

			//items.push(product)

			items.push({

				productId: productIdsArray[i].productId,

				ammount: productIdsArray[i].ammount,

				productName: product.title,

				unitaryPrice: product.value,

				productImage: product.cape,

				totalPrice: Number(product.value)*Number(productIdsArray[i].ammount)

			})

			total += Number(product.value)*Number(productIdsArray[i].ammount)
		}

		res.status(200).send({items, total})
	}
	catch{
		res.status(200).send("Carrinho vazio")
	}
}

export async function postUserProducts(req,res){
	//const userId = req.body.userId
	//hypotheticalUserId
	//const userId = "63d40c8ad967b40c2b1a8a5b" //Obter com o token

	const session = res.locals.sessao
	const userId = session.userId

	//console.log("Rodou postUserProducts")

	const productId = req.body.product
	const ammount = req.body.ammount

	//console.log(productId)

	try{
		const prom = await db.collection("sessions").findOne({_id: ObjectId(userId)})

		// Não é mais necessário pq já tem Bearer token, mas to deixando aqui caso dê algum bug
		// if (!prom){
		// 	db.collection("sessions").insertOne({_id: ObjectId(userId)})
		// 	console.log("Inseriu")
		// }

		let productsArray = []

		try {
			productsArray = prom.userProducts
		} catch {
			
		}

		console.log(productsArray)
		console.log(productId)

		const productIndexIfAlreadyExists = productsArray.findIndex(e=>e.productId === productId)

		if (productIndexIfAlreadyExists !== -1){
			productsArray[productIndexIfAlreadyExists].ammount++
		}else{
			productsArray.push({productId, ammount})
		}

		await db.collection("sessions").updateOne({_id: ObjectId(userId)}, {$set: {userProducts: productsArray}})

		res.sendStatus(200)
	}
	catch{
		res.sendStatus(500)
	}
}