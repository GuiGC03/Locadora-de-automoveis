const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const pool = require('./db/conn')

console.log(pool)

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.render('home')
  })

// *-{Clientes}-* //

  app.post('/clientes/insertcliente', function (req, res) {
    const nome = req.body.nome
    const endereco = req.body.endereco
    const telefone = req.body.telefone
    const email = req.body.email
  
    const query = `INSERT INTO clientes (nome, endereco, telefone, email) VALUES ('${nome}', '${endereco}', '${telefone}', '${email}')`
    pool.query(query, function (err) {
      if (err) {
        console.log(err)
      }
  
      res.redirect('/clientes')
    })
  })

  app.get('/clientes', function (req, res) {
    const query = `SELECT * FROM clientes`
  
    pool.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
      const clientes = data
      console.log(data)
      res.render('clientes', {clientes})
    })
  })
-
  app.get('/clientes/:id', function (req,res) {
    const id = req.params.id
  
    const query = `SELECT * FROM clientes WHERE id = ${id}`
    pool.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
      const cliente = data[0]
      console.log(data[0])
      res.render('cliente', {cliente})
    })
  })

  app.get('/clientes/edit/:id', function (req, res) {
    const id = req.params.id
  
    const query = `SELECT * FROM clientes WHERE id = ${id}`
  
    pool.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
      const cliente = data[0]  
      console.log(data[0])
  
      res.render('editcliente', {cliente})
    })
  })

  app.post('/clientes/updatecliente', function (req, res) {
    const id = req.body.id
    const nome = req.body.nome
    const endereco = req.body.endereco
    const telefone = req.body.telefone
    const email = req.body.email
    const query = `UPDATE clientes SET nome = '${nome}', endereco = '${endereco}', telefone = '${telefone}', email = '${email}' WHERE id = '${id}'`
    pool.query(query, function (err) {
      if (err) {
        console.log(err)
      }
      res.redirect(`/clientes/edit/${id}`)
    })
  })

  app.post('/clientes/remove/:id', function (req, res) {
    const id = req.params.id
    const query = `DELETE FROM clientes WHERE id = ${id}`
    pool.query(query, function (err) {
      if (err) {
        console.log(err)
      }
      res.redirect(`/clientes`)
    })
  })
  // *-{Clientes}-* //

  // *-{Veiculos}-* //

  app.post('/veiculos/insertveiculo', function (req, res) {
    const marca = req.body.marca
    const modelo = req.body.modelo
    const ano = req.body.ano
    const placa = req.body.placa
    const disponibilidade = req.body.disponibilidade
  
    const query = `INSERT INTO veiculos (marca, modelo, ano, placa, disponibilidade) VALUES ('${marca}', '${modelo}', '${ano}', '${placa}', '${disponibilidade}')`
  
    pool.query(query, function (err) {
      if (err) {
        console.log(err)
      }
  
      res.redirect('/veiculos')
    })
  })

  app.get('/veiculos', function (req, res) {
    const query = `SELECT * FROM veiculos`
  
    pool.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
      const veiculos = data
      console.log(data)
      res.render('veiculos', {veiculos})
    })
  })
-
  app.get('/veiculos/:id', function (req,res) {
    const id = req.params.id
  
    const query = `SELECT * FROM veiculos WHERE id = ${id}`
    pool.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
      const veiculo = data[0]
      console.log(data[0])
      res.render('veiculo', {veiculo})
    })
  })

  app.get('/veiculos/edit/:id', function (req, res) {
    const id = req.params.id
  
    const query = `SELECT * FROM veiculos WHERE id = ${id}`
  
    pool.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
  
      const veiculo = data[0]
  
      console.log(data[0])
  
      res.render('editveiculo', { veiculo })
    })
  })

  app.post('/veiculos/updateveiculo', function (req, res) {
    const id = req.body.id
    const marca = req.body.marca
    const modelo = req.body.modelo
    const ano = req.body.ano
    const placa = req.body.placa
    const disponibilidade = req.body.disponibilidade
    const query = `UPDATE veiculos SET marca = '${marca}', modelo = '${modelo}', ano = '${ano}', placa = '${placa}', disponibilidade = '${disponibilidade}' WHERE id = ${id}`
    pool.query(query, function (err) {
      if (err) {
        console.log(err)
      }
      res.redirect(`/veiculos/edit/${id}`)
    })
  })

  app.post('/veiculos/remove/:id', function (req, res) {
    const id = req.params.id
    const query = `DELETE FROM veiculos WHERE id = ${id}`
    pool.query(query, function (err) {
      if (err) {
        console.log(err)
      }
      res.redirect(`/veiculos`)
    })
  })

// *-{Veiculos}-* //

// *-{Reservas}-* //

app.post('/reservas/insertreserva', function (req, res) {
  
  const idcliente = req.body.idcliente
  const idveiculo = req.body.idveiculo
  const datainicio = req.body.datainicio
  const datafim = req.body.datafim

  const query = `INSERT INTO reservas (idcliente, idveiculo, datainicio, datafim) VALUES ('${idcliente}', '${idveiculo}', '${datainicio}', '${datafim}')`

  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/reservas')
  })
})

app.get('/reservas', function (req, res) {
  const query = `SELECT * FROM reservas`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }
    const reservas = data
    console.log(data)
    res.render('reservas', {reservas})
  })
})
-
app.get('/reservas/:id', function (req,res) {
  const id = req.params.id

  const query = `SELECT * FROM reservas WHERE id = ${id}`
  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }
    const reserva = data[0]
    console.log(data[0])
    res.render('reserva', {reserva})
  })
})

app.get('/reservas/edit/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM reservas WHERE id = ${id}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const reserva = data[0]

    console.log(data[0])

    res.render('editreserva', { reserva })
  })
})

app.post('/reservas/updatereserva', function (req, res) {
  const id = req.body.id
  const idcliente = req.body.idcliente
  const idveiculo = req.body.idveiculo
  const datainicio = req.body.datainicio
  const datafim = req.body.datafim
  const query = `UPDATE reservas SET idcliente = '${idcliente}', idveiculo = '${idveiculo}', datainicio = '${datainicio}', datafim = '${datafim}' WHERE id = ${id}`
  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect(`/reservas/edit/${id}`)
  })
})

app.post('/reservas/remove/:id', function (req, res) {
  const id = req.params.id
  const query = `DELETE FROM reservas WHERE id = ${id}`
  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect(`/reservas`)
  })
})

// *-{Reservas}-* //

  app.listen(3000)