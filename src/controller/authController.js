import db from '../config/db.js'
import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

export async function cadastro(req, res) {
    const user = req.body;
    const passwordHash = bcrypt.hashSync(user.senha, 10);
  
    try {
      await db.collection("users").insertOne({ name: user.nome, email: user.email, password: passwordHash, avatar: user.avatar, type: "user" });
      return res.sendStatus(201);

    } catch (err) {
      return res.status(500).send(err.message);
    }
}

export async function login(req, res) {
    const { email, senha } = req.body;
  
    try {
      const user = await db.collection("users").findOne({ email });

        if (user && bcrypt.compareSync(senha, user.password)){
          const token = uuidV4();

          await db.collection("sessions").insertOne({ userId: user._id, token, avatar: user.avatar, name: user.name, type: user.type })
          const session = await db.collection("sessions").findOne({ token }) 

          return res.status(200).send(session)

        } else {
          return res.sendStatus(401)        
        }
  
    } catch (err) {
        return res.status(500).send(err.message)
        
    }
}

export async function logout(req, res) {
    const { token } = req.params;
      
    try {	      
        await db.collection("sessions").deleteOne({ token })

        return res.sendStatus(200)

      } catch (error) {
        return res.status(500).send(error)
      }
}