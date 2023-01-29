import db from '../config/db.js'
import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

//----------------------CADASTRO---------------------------
export async function cadastro(req, res) {
    console.log("Rodou POST cadastro")
    const user = req.body;
  
    const passwordHash = bcrypt.hashSync(user.senha, 10);
  
    try {
      await db.collection("users").insertOne({ name: user.nome, email: user.email, password: passwordHash, avatar: user.avatar, type: "user" });
      res.sendStatus(201);
    } catch (err) {
      return res.status(500).send(err.message);
    }
}
//-----------------------LOGIN--------------------------------
export async function login(req, res) {
    console.log("Rodou POST login")
  
    const { email, senha } = req.body;     
  
    try {
      const user = await db.collection("users").findOne({ email });
  
      if (user && bcrypt.compareSync(senha, user.password)){

      console.log("tudo certo com loguin")

        const token = uuidV4();     

        await db.collection("sessions").insertOne({ userId: user._id, token, avatar: user.avatar, name: user.name, type: user.type })

        const session = await db.collection("sessions").findOne({ token })        
  
        return res.status(200).send(session)
      } else {
        console.log("erro erro")
        return res.sendStatus(401)
        
      }
  
    } catch (err) {
      console.log("erro erro")
        return res.status(500).send(err.message)
        
    }
}

//-----------------------LOGOUT-----------------------------------
export async function logout(req, res) {
    console.log("Rodou DELETE Logout")
    const { token } = req.params;
    console.log(token)
      
    try {	
      
        await db.collection("sessions").deleteOne({ token })

        return res.sendStatus(200)

      } catch (error) {
        res.status(500).send(error)
      }
}