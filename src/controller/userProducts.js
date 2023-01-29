import db from '../config/db.js'
import { ObjectId } from "mongodb"

export async function getUserProducts(req,res){
	const session = res.locals.sessao
	const userId = session.userId

	try{
		const userProducts = await db.collection("sessions").findOne({_id: ObjectId(userId)});
		const productIdsArray = userProducts.userProducts
		let items = []
		let total = 0;

		for (let i = 0; i < productIdsArray.length; i++) {
			const product = await db.collection("games").findOne({_id: ObjectId(productIdsArray[i].productId)})			

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

		return res.status(200).send({items, total})
	}
	catch{
		return res.status(200).send("Carrinho vazio")
	}
}

export async function postUserProducts(req,res){
	const session = res.locals.sessao
	const userId = session.userId
	const productId = req.body.product
	const ammount = req.body.ammount	

	try{
		const prom = await db.collection("sessions").findOne({_id: ObjectId(userId)})
		let productsArray = []

		try{
			productsArray = prom.userProducts
		} catch {
		}

		const productIndexIfAlreadyExists = productsArray.findIndex(e=>e.productId === productId)
		if (productIndexIfAlreadyExists !== -1){
			productsArray[productIndexIfAlreadyExists].ammount++
		}else{
			productsArray.push({productId, ammount})
		}

		const test = await db.collection("sessions").updateOne({_id: ObjectId(userId)}, {$set: {userProducts: productsArray}}, {upsert: true})
		return res.sendStatus(200)
	}
	catch{
		return res.sendStatus(500)
	}
}

export async function deleteUserProducts(req, res){
	try{
		const session = res.locals.sessao
		const userId = session.userId	
		const productId = req.params.productId
		const prom = await db.collection("sessions").findOne({_id: ObjectId(userId)})
		let productsArray = prom.userProducts
		const productIndex = productsArray.findIndex(e=>e.productId === productId)

		if (productIndex !== -1){
			productsArray.splice(productIndex,1)
		}

		await db.collection("sessions").updateOne({_id: ObjectId(userId)}, {$set: {userProducts: productsArray}})
		return res.sendStatus(200)

	}catch{
		return res.sendStatus(500)
	}
}

export async function putUserProducts(req, res){
	const session = res.locals.sessao
	const userId = session.userId
	const productId = req.params.productId
	const ammount = req.body.ammount

	try{
		const prom = await db.collection("sessions").findOne({_id: ObjectId(userId)})
		let productsArray = []

		try {
			productsArray = prom.userProducts
		} catch {
		}

		if (ammount < 1){
			const productIndex = productsArray.findIndex(e=>e.productId === productId)
			productsArray.splice(productIndex,1)

			await db.collection("sessions").updateOne({_id: ObjectId(userId)}, {$set: {userProducts: productsArray}})
	
			return res.sendStatus(200)
		}

		const productIndexIfAlreadyExists = productsArray.findIndex(e=>e.productId === productId)

		if (productIndexIfAlreadyExists !== -1){
			productsArray[productIndexIfAlreadyExists].ammount = ammount
		}else{
			productsArray.push({productId, ammount})
		}

		const test = await db.collection("sessions").updateOne({_id: ObjectId(userId)}, {$set: {userProducts: productsArray}}, {upsert: true})		

		return res.sendStatus(200)
	}
	catch{
		return res.sendStatus(500)
	}
}