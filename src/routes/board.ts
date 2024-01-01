import { Server } from 'socket.io'
import type { ExtendedAPIEvent } from '~/routes/api/poll'

export const GET = ({ httpServer }: ExtendedAPIEvent) => {
  if (!httpServer.io) {
    const io = new Server(httpServer, { path: '/api/poll' })
    httpServer.io = io
    io.on('connection', (socket) => {
      socket.on('send-board-change', (change) => {
        socket.broadcast.emit('board-change-received', change)
      })
    })
  }
}
