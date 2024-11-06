import { Server } from 'socket.io'


// for now the band will be a dict - need to make it in the database


const setUpSocket = (server) => {

    // const io = new Server(server)
    const io = new Server(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        }
      });

    io.on("connection", (socket) => {
      // check JWT !!!!!!
        //add to a specific room,  for know broadcast to everybody
        // socket.join("room1")
        console.log("user connected: " + socket.id)

        socket.on('adminStartRehearsal', (song) => { 
          //check what to send (lyric or all) and who to send to
          console.log('admin Start Rehearsal with song:', song)
          socket.broadcast.emit('startRehearsal') // send to everyone but myself
          console.log('admin Start Rehearsal')
          io.emit('sendLyricsAndChords', song)
        })

        socket.emit('sendLyrics', () => {console.log('sendLyrics')})

        socket.emit('sendLyricsAndChords', () => {console.log('sendLyricsAndChords')})

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

        socket.on('close', () => {
             
            console.log('user disconnected' + socket.id)
        })
    })

}

export {setUpSocket}