import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/store/appStore';

let messageIdCounter = 0;
const generateUniqueId = () => {
  return `msg_${Date.now()}_${++messageIdCounter}`;
};

export const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { addMessage, setConnected, isConnected } = useAppStore();
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      if (socket) {
        socket.close();
      }
      const timeoutId = reconnectTimeoutRef.current;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [socket]);

  const startSimulatedMode = () => {
    setIsSimulated(true);
    setConnected(true);
    addMessage({
      id: generateUniqueId(),
      type: 'system',
      message: '🔄 Simulation mode activated (demo version)',
      timestamp: new Date(),
    });
    
    setTimeout(() => {
      addMessage({
        id: generateUniqueId(),
        type: 'system',
        message: '💡 Your messages will be simulated locally in this mode',
        timestamp: new Date(),
      });
    }, 100);
  };

  const connect = () => {
    if (!isMounted || typeof window === 'undefined') {
      console.log('WebSocket can only be used on client side');
      return;
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      return;
    }

    startSimulatedMode();
  };

  const disconnect = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    } else if (isSimulated) {
      setConnected(false);
      setIsSimulated(false);
      addMessage({
        id: generateUniqueId(),
        type: 'system',
        message: '❌ Simulated connection closed',
        timestamp: new Date(),
      });
    }
  };

  const sendMessage = (message: string) => {
    if (!isMounted || typeof window === 'undefined') {
      return;
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      addMessage({
        id: generateUniqueId(),
        type: 'user',
        message,
        timestamp: new Date(),
      });
    } else if (isConnected && isSimulated) {
      addMessage({
        id: generateUniqueId(),
        type: 'user',
        message,
        timestamp: new Date(),
      });
      
      setTimeout(() => {
        const responses = [
          `🤖 Auto-reply: Received "${message}"`,
          `🎯 Simulation: Message "${message}" processed`,
          `🔄 Echo (demo): ${message}`,
          `✨ Bot: Interesting message "${message}"!`,
          `📨 Automatic response to: ${message}`
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        addMessage({
          id: generateUniqueId(),
          type: 'system',
          message: randomResponse,
          timestamp: new Date(),
        });
      }, 500 + Math.random() * 1500);
    } else {
      addMessage({
        id: generateUniqueId(),
        type: 'system',
        message: '❌ Error: WebSocket not connected. Click "Connect" first',
        timestamp: new Date(),
      });
    }
  };

  return {
    connect,
    disconnect,
    sendMessage,
    isConnected,
    isSimulated,
    isMounted,
  };
};