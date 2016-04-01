var express = require('express');
var app = express();
var url = require('url');

var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


function showMensajes(mensajes){
	var mensajes = [{
			'author': 'Edinson',
			'mensaje': 'Hola es un mensaje'
			},
			{
				'author': 'Tao',
				'mensaje': 'Hola soy tao'
			},
			{
				'author': 'Tin',
				'mensaje': 'Hola soy tin'
	}];
	return mensajes;
}

var usuarios = [];


function inSockets(mensaje){

//Creamos nuestro primer evento por defect est connection
//le pasamos un parametro socket la cual llamaremos para nuestros nuevos eventos
io.on('connection', function(socket){
		
		//Imprimimos y decimos que estamos dentro
		console.log('dentro ');

		//evento emit enviamos para nuestro frontend con 
		// un evento propio creado en este caso es mensajes
		socket.emit('mensajes', mensaje);

		socket.on('nuevoUsuario', function(data){
			usuarios.push({id: data.id, name: data.name});
			io.sockets.emit('nuevaConexion', {usuarios: mensaje});
			console.log(usuarios);
		});
		
		 socket.on('room', function(room) {
	        socket.join(room);
	        room = 'vixnet';
	        io.sockets.in(room).emit('userMensaje', mensaje);
	    });
});

	
}

app.get('/api/:usuario', function(req, res, next){
		function name(result){
			result = url.parse(req.url, true).query;
			console.log(result);
			return result
		}
		function isMensaje(result){
			result = req.params.usuario;
			return result;
		}

		inSockets(isMensaje());
		next();
});

function isName(name){
	return name;
}


server.listen(3000, function(e, r){
	console.log('Servidor andando: ' + isName('Nodejs'));

});