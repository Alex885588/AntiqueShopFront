import io, { Socket } from 'socket.io-client';
import { useEffect } from 'react';

let socket: Socket | null = null;
export function useSocket() {

    useEffect(() => {
        if (socket) {
            return;
        }
        try {
            const token = localStorage.getItem('token');
            socket = io(process.env.REACT_APP_BACKEND_WS_URL!, {
                query: { token }
            });
        } catch (error) {
            console.log(error);
            return;
        }
        socket.on('connect', () => {
            console.log('Connected to server');
        });

    }, []);

    return { socket };
}