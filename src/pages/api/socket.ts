import { Server } from 'socket.io';
import type { NextApiRequest } from 'next';
import type { NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(res.socket as any).server.io) {
    const io = new Server((res.socket as any).server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
    (res.socket as any).server.io = io;

    io.on('connection', (socket) => {
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
    });
  }
  res.end();
} 