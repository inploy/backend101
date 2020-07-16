import 'dotenv/config'
import express,{Request, Response} from 'express';
import axios from 'axios';
import bodyParser from "body-parser";

const { PORT = 8000} = process.env

const app = express()
const names: string[] =['ploy']
app.use(bodyParser())

app.get('/', (_req: Request,res: Response):void =>{
   res.send({status: true , data:[]})   //.send ส่ง obj ไปได้
})


app.get('/ip',(_req:Request ,res:Response):void =>{
    axios
    .get('https://icanhazip.com')
    .then(({data}) => { 
        return `Hello ${data}`
    })
    .then(textIp => {
        res.end(textIp)
    })
    .catch(error => {
      console.error(error)
    })
    .finally(()=>{
       console.log('do')
    })
})

app.get('/names', (_req:Request,res:Response)=>{
    res.send({data:names})
})

app.post('/names',(req:Request,res:Response)=>{
    const {name} = req.body
    if(!name) return res.send({error:'name is require'})
    console.log(name)
    names.push(name)
    res.send({status :true , message : 'Create success'}) 
})

app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`)
})