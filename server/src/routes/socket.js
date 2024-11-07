import { Server } from 'socket.io'
import { getLyrics, formatLyricsAndChords } from '../databaseOperations.js'
import { getUserInstrumentFromDB } from './users.js'


const setUpSocket = (server) => {

    const io = new Server(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        }
      });

    const vocalistSocket = new Set()
    const nonVocalistSocket = new Set()

    const categorizeUserByInstrument = async (socket) => {

      const userId = socket.handshake.query.userId;

      const instrument = await getUserInstrumentFromDB( userId )

      console.log(instrument)

      if ( instrument === 'vocals') {
        vocalistSocket.add(socket.id);
      } else {
        nonVocalistSocket.add(socket.id);
      }

    }

    io.on("connection", (socket) => {

        console.log("user connected: " + socket.id)
        
        categorizeUserByInstrument(socket)

        socket.on('adminStartRehearsal', (song) => { 
          // update everyone the rehearsal started and send the lyrics and chords according to the vocal/ non vocal sets
          console.log('admin Start Rehearsal') 
          const lyrics = getLyrics(song)
          const lyricsAndChords = formatLyricsAndChords(song)
          io.emit('startRehearsal') 
          vocalistSocket.forEach(socketId => io.to(socketId).emit('sendLyrics', {song, lyrics})); 
          nonVocalistSocket.forEach(socketId => io.to(socketId).emit('sendLyricsAndChords', {song, lyricsAndChords})); 

          
        })

        socket.on('adminEndRehearsal', () => {
          io.emit('endRehearsal')
        })

      socket.on('disconnect', () => {
        // delete the diconnected user from the vocal/ non vocal list
        vocalistSocket.delete(socket.id);
        nonVocalistSocket.delete(socket.id);
        
      });
    })
}

export {setUpSocket}