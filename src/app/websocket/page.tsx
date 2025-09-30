'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, Send, Trash2, User, Bot } from 'lucide-react';

import { useWebSocket } from '@/hooks/useWebSocket';
import { useAppStore } from '@/store/appStore';

export default function WebSocketPage() {
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { connect, disconnect, sendMessage, isConnected, isSimulated } = useWebSocket();
  const { messages, clearMessages } = useAppStore();

  useEffect(() => {
    const messagesContainer = messagesEndRef.current?.parentElement;
    if (messagesContainer) {
      messagesContainer.scrollTop = 0;
    }
  }, [messages]);

  const demoMessages = [
    'Hello, World!',
    'How are you today?',
    'This is a WebSocket demo',
    'Real-time communication is awesome!',
    'Next.js + WebSocket = ❤️'
  ];

  const handleSendMessage = () => {
    if (message.trim() && isConnected) {
      sendMessage(message.trim());
      setMessage('');
    }
  };

  const handleSendDemo = (demoMsg: string) => {
    if (isConnected) {
      sendMessage(demoMsg);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Wifi className="text-cyan-600 mr-3" size={48} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              WebSocket Demo
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time communication demonstration using WebSocket technology.
            Connect, send messages, and see live updates.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${isConnected
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
              }`}>
              {isConnected ? (
                <>
                  <Wifi className="inline mr-1" size={16} />
                  Connected ({isSimulated ? 'Simulation Mode' : 'WebSocket Server'})
                </>
              ) : (
                <>
                  <WifiOff className="inline mr-1" size={16} />
                  Disconnected
                </>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Messages: {messages.length}
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Connection Controls</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={connect}
                disabled={isConnected}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <Wifi className="mr-2" size={20} />
                Connect
              </button>
              <button
                onClick={disconnect}
                disabled={!isConnected}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <WifiOff className="mr-2" size={20} />
                Disconnect
              </button>
              <button
                onClick={clearMessages}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <Trash2 className="mr-2" size={20} />
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Message</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={!isConnected}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 text-gray-900 placeholder-gray-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!isConnected || !message.trim()}
                  className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  <Send size={20} className="mr-2" />
                  Send
                </button>
              </div>
              <div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm text-cyan-600 hover:text-cyan-700 mb-2"
                >
                  {isExpanded ? 'Hide' : 'Show'} Demo Messages
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex flex-wrap gap-2"
                    >
                      {demoMessages.map((demoMsg, index) => (
                        <button
                          key={index}
                          onClick={() => handleSendDemo(demoMsg)}
                          disabled={!isConnected}
                          className="px-3 py-1 text-sm bg-cyan-100 text-cyan-700 rounded-full hover:bg-cyan-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {demoMsg}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-white">
              <h2 className="text-xl font-semibold">Message History</h2>
              <p className="text-cyan-100 text-sm">Real-time WebSocket messages</p>
            </div>

            <div className="h-96 overflow-y-auto p-4 flex flex-col-reverse">
              <div className="space-y-3 flex flex-col-reverse">
                <AnimatePresence>
                  {messages.length > 0 ? (
                    [...messages].reverse().map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className={`flex items-start gap-3 p-3 rounded-lg ${msg.type === 'user'
                          ? 'bg-cyan-50 border-l-4 border-cyan-500'
                          : 'bg-gray-50 border-l-4 border-gray-500'
                          }`}
                      >
                        <div className={`p-2 rounded-full ${msg.type === 'user' ? 'bg-cyan-500' : 'bg-gray-500'
                          }`}>
                          {msg.type === 'user' ? (
                            <User size={16} className="text-white" />
                          ) : (
                            <Bot size={16} className="text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm font-semibold ${msg.type === 'user' ? 'text-cyan-700' : 'text-gray-700'
                              }`}>
                              {msg.type === 'user' ? 'You' : 'System'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-gray-800 text-sm break-words">{msg.message}</p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Wifi className="mx-auto text-gray-400 mb-4" size={48} />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No messages yet</h3>
                      <p className="text-gray-500">Connect and send your first message!</p>
                    </div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            ⚡ Real-time WebSocket Communication
          </h3>
          <p className="text-cyan-100 max-w-2xl mx-auto">
            Experience real-time, bidirectional communication between client and server.
            WebSockets enable instant messaging, live updates, and interactive features.
          </p>
        </div>
      </div>
    </div>
  );
}