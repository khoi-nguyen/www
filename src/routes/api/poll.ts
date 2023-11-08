import type { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';
import type { Server as IOServer } from 'socket.io';
import type { APIEvent } from 'solid-start';

export interface PollAnswer<T> {
  correct: boolean;
  pollId: string;
  userId: string;
  value: T;
}

interface ExtendedAPIEvent extends APIEvent {
  httpServer: HTTPServer & { io?: IOServer };
}

export const GET = ({ httpServer }: ExtendedAPIEvent) => {
  if (!httpServer.io) {
    const io = new Server(httpServer, { path: '/api/poll' });
    httpServer.io = io;
    io.on('connection', (socket) => {
      socket.on('send-poll-answer', (answer: PollAnswer<any>) => {
        socket.broadcast.emit('poll-answer-received', answer);
      });
    });
    return new Response();
  }
};
