import { Server } from 'socket.io'
import { getLyrics, formatLyricsAndChords } from '../utils.js'
import { UsersModel } from '../models/Users.js';

// for now the band will be a dict - need to make it in the database


const setUpSocket = (server) => {

    const io = new Server(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        }
      });

    io.on("connection", (socket) => {

        console.log("user connected: " + socket.id)

        socket.on('adminStartRehearsal',async (song) => { 
          //check what to send (lyric or all) and who to send to using the user id in the local storage and call mongo and check the instrument
          const lyrics = getLyrics(song)
          const lyricsAndChords = formatLyricsAndChords(song)
          // try{
          //   const users = await UsersModel.find({})
          //   users.forEach(user => {
          //     if (user.instrument.toLocaleLowerCase() == "vocals") {

          //     }
          //   })

          // } catch (err) {
          //   console.error(err)
          // }
          socket.broadcast.emit('startRehearsal') // send to everyone but myself
          console.log('lyricsAndChords: ', lyricsAndChords) 
          // io.emit('sendLyrics', {song, lyrics})
          io.emit('sendLyricsAndChords', {song , lyricsAndChords} )
          console.log('admin Start Rehearsal') 
        })

        

        

        socket.on('adminEndRehearsal', () => {
          console.log('adminEndRehearsal')
          io.emit('endRehearsal')
        })

      //   function disconnectAllUsers() {
      //     console.log(io.sockets.sockets)
      //     for (let [id, socket] of io.sockets.sockets) {
      //         socket.disconnect(true);  // `true` forces disconnection
      //         console.log(`Disconnected socket: ${id}`);
      //     }
      // }
      // disconnectAllUsers()

      socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id );
        
      });
    })

}

export {setUpSocket}