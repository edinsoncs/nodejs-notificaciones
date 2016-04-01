$(document).ready(function(){

	var socket = io.connect('localhost:3000', {'forceNew': true});

	var userID;

	var room = 'vixnet';
	function insertName(result){
		result = ['edinson', 'sergio'];
		for(var i = 0; i < result.length; i++){
			return result[i];
		}
	}

	socket.on('connect', function(){
		console.log('conectado en socket');

		socket.emit('room', room);

		userID = socket.io.engine.id;
		console.log(userID);
		socket.emit('nuevoUsuario', {id: userID, name: insertName()});
	});

	socket.on('mensajes', function(data){
		function notify(){
		//Activar permisos de notificacion
			Notification.requestPermission(function(status){
				
				//alert(status);

				var url = window.location;

				var notification = new Notification('Chat Vixnet', {
					body: data,
					icon: 'http://www.universobit.com.ar/portal/img/empresas/0/0/1/0/1/1/2/2/6/2/logoMainPic_10112262.jpg',
					dir:'auto'
				});
				//cerrar notificaciones
				setTimeout(function(){
					notification.close();
				}, 5000);


				function chatUrl(esLink) {
					notification.onclick = (function(){
						window.open(esLink);
					})
				}
				chatUrl(url);

			});

		}
		notify();
	});

	socket.on('userMensaje', function(data){
		console.log(data);
	});

	socket.on('nuevaConexion', function(data){
		console.log(data);
	});


});