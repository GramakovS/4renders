import { MessageCircle, Clock, Users } from 'lucide-react';

import { Comment } from '@/types';
import { commentApi } from '@/lib/api';
import ClientTimestamp from '@/components/ClientTimestamp';


export const revalidate = 60;

export default async function ChatPage() {
  const response = await commentApi.getCommentsByPostId(1);
  const messages = response.success ? response.data || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="text-orange-600 mr-3" size={48} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Chat Simulation
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This page demonstrates Incremental Static Regeneration (ISR).
            Content is statically generated but refreshes periodically.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
              🔄 ISR - Incremental Static Regeneration
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock size={16} className="mr-1" />
              Generated at: <ClientTimestamp className="ml-1" />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-t-2xl border border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h2 className="font-semibold text-gray-800">Discussion Thread</h2>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users size={16} className="mr-1" />
              {messages.length} participants
            </div>
          </div>

          <div className="bg-white border-l border-r border-gray-200 max-h-96 overflow-y-auto">
            {messages.length > 0 ? (
              <div className="p-6 space-y-4">
                {messages.map((message: Comment, index: number) => {
                  const isOwnMessage = index % 3 === 0;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${isOwnMessage
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        <div className="flex items-center mb-1">
                          <span className={`text-xs font-semibold ${isOwnMessage ? 'text-orange-100' : 'text-gray-600'
                            }`}>
                            {message.name}
                          </span>
                        </div>
                        <p className="text-sm">{message.body}</p>
                        <div className={`text-xs mt-1 ${isOwnMessage ? 'text-orange-100' : 'text-gray-500'
                          }`}>
                          {message.email}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center">
                <MessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No messages yet</h3>
                <p className="text-gray-500">Be the first to start the conversation!</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-b-2xl border border-gray-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Type your message... (Demo only)"
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 text-gray-900 placeholder-gray-500"
                />
              </div>
              <button
                disabled
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              This is a demonstration using static data from JSONPlaceholder API
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            ⚡ Incremental Static Regeneration (ISR)
          </h3>
          <p className="text-orange-100 max-w-2xl mx-auto">
            This page is pre-rendered at build time but can be regenerated in the background
            when new requests come in, ensuring content stays fresh while maintaining performance.
          </p>
        </div>
      </div>
    </div>
  );
}