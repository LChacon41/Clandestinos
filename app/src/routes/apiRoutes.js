const {Router} = require("express");
const mysql  = require("mysql");
const router  = Router();

var con = mysql.createConnection({
    host: "10.0.100.109",
    user: "root",
    password: "Clandestinos.2022",
    database:"db_clande"
  });

  con.connect(function(err) {
    if (err) throw err;
  });

  router.get('/player/', function(req, res){

    var flag = true;
    var sql = "SELECT * FROM medida_jugadores";
    con.query(sql,function (err, result) 
    {
        if(err) throw err; 
        if(result.length>0)
        {
          res.status(200).json(result);
        }
        else
        {
          res.status(500).json({error:"Player does not exist."});
        }
    });
  });

  router.get('/player/:id', function(req, res){
    const id = req.params.id;
    console.log(id)
    if(id)
    {
        var flag = true;
        var sql = "SELECT * FROM medida_jugadores WHERE id_jugador=?";
        var values = [id];
        con.query(sql,values, function (err, result) {
            if (err) throw err; 
            if(result.length>0)
            {
              res.status(200).json(result);
            }
            else
            {
              res.status(500).json({error:"Player does not exist."})
            }
          });
    }
    else
    {
        res.status(500).json({error:"Missing player id."})
    }
    
  });

  router.post('/player/login/', function(req, res){
    const {email,password} = req.body;
    console.log(email+" "+password);
    if(email&&password) 
    {
        var flag = true;
        var sql = "SELECT * FROM dimension_usuarios WHERE correo='"+email+"' AND password='"+password+"'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if(result.length>0)
            {
              res.status(200).json(result);
            }
            else
            {
              res.status(500).json({error:"Wrong email or password."})
            }
          });
    }
    else
    {
        res.status(500).json({error:"Missing email or password."})
    }
    
  });

module.exports = router;