const{ io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band('Queen'));
bands.addBand( new Band('Bon Jovi'));
bands.addBand( new Band('Héroes del silencio'));
bands.addBand( new Band('Metallica'));

//mensajes de sockets 
io.on('connection', client => {
    console.log('cliente conectado');

    client.emit('active-bands', bands.getBands());
  
    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });
  
    client.on('mensaje', (payload) => {
        console.log('mensaje', payload);
  
        io.emit('mensaje', {admin: 'nuevo msaj'});//a todos los clientes conectados
        //client.emit('mensaje', {admin: 'solo a cliente'});//solo al cliente que escucha
    });

    client.on('vote-band', (payload) => {
        bands.voteBand( payload.id);
        io.emit('active-bands', bands.getBands());
        console.log('voto por banda');
    });

    client.on('add-band', (payload) => {
        bands.addBand (new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('emitir-mensaje',(payload) => {
        //io.emmit('nuevo-mensaje', 'hey!!!');// emite a todos los clientes
        client.broadcast.emit('nuevo-mensaje', payload);//emite el mensaje a odos menos al cnielte que lo envio
    });
  
  });