const jwt = require("jsonwebtoken")

export default AuthMiddleware = (req,res,next) => {
      try {
            
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, "__recret__")
        req.usuario = decoded
        next()
    } catch (error) {
        res.status(401)
        res.json({code:4, msg:"No tiene autorizacion para acceder al contenido", token:req.headers.authorization.split(" ")[1]})
        
         
    }
    
    }