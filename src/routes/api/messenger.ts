import type { Server as HTTPServer } from 'http'
import { Server } from 'socket.io'
import type { Server as IOServer } from 'socket.io'
import type { APIEvent } from 'solid-start'

export interface PollAnswer<T> {
  correct: boolean
  pollId: string
  userId: string
  value: T
}

export interface ExtendedAPIEvent extends APIEvent {
  httpServer: HTTPServer & { io?: IOServer }
}

export const POST = async ({ httpServer, request }: ExtendedAPIEvent) => {
  if (!httpServer.io) {
    httpServer.io = new Server(httpServer, { path: '/api/messenger' })
  }
  httpServer.io!.emit('message', await request.json())
  return new Response()
}
