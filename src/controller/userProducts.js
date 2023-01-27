import db from '../config/db.js'
//import dayjs from 'dayjs'
import { ObjectId } from "mongodb"

export async function getUserProducts(req,res){
	const userId = req.body.userId

	try{
		const userProducts = await db.collection("sessions").findOne({_id: ObjectId(userId)}).userProducts;
		res.sendStatus(200)
	}
	catch{
		res.sendStatus(500)
	}
}

export async function postUserProducts(req,res){
	const userId = req.body.userId

	try{
		//implementar o código
		res.sendStatus(200)
	}
	catch{
		res.sendStatus(500)
	}
}