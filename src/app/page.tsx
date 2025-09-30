'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Code, Database, Globe, Zap } from 'lucide-react';

import Modal from '@/components/Modal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      icon: Code,
      title: 'Modern Architecture',
      description: 'Built with Next.js 15, TypeScript, and Tailwind CSS'
    },
    {
      icon: Database,
      title: 'API Integration',
      description: 'JSONPlaceholder API with full CRUD operations'
    },
    {
      icon: Globe,
      title: 'Multiple Rendering',
      description: 'SSG, SSR, CSR, and ISR demonstration'
    },
    {
      icon: Zap,
      title: 'Real-time Features',
      description: 'WebSocket integration for live communication'
    }
  ];

  const renderingMethods = [
    {
      type: 'SSG',
      title: 'Static Site Generation',
      description: 'This page - Pre-rendered at build time for optimal performance',
      link: '/',
      active: true
    },
    {
      type: 'SSR',
      title: 'Server-Side Rendering',
      description: 'Users page - Rendered on each request with fresh data',
      link: '/users'
    },
    {
      type: 'CSR',
      title: 'Client-Side Rendering',
      description: 'Posts page - Rendered in the browser with dynamic interactions',
      link: '/posts'
    },
    {
      type: 'ISR',
      title: 'Incremental Static Regeneration',
      description: 'Chat page - Static with periodic regeneration',
      link: '/chat'
    },
    {
      type: 'WS (CSR)',
      title: 'WebSocket Demo',
      description: 'Real-time communication and live messaging',
      link: '/websocket'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Next.js 4renders App
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A comprehensive demo of Next.js capabilities, including various rendering methods, API integration, modern UI components, and communication in no time.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center mx-auto cursor-pointer"
          >
            Try Modal
            <ChevronRight className="ml-2" size={20} />
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100"
            >
              <feature.icon className="text-blue-600 mb-4" size={32} />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Next.js Renders + WebSocket demo
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {renderingMethods.map((method, index) => (
              <Link
                key={method.type}
                href={method.link}
                className="flex"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${method.active
                    ? 'border-blue-500 bg-blue-50 hover:bg-blue-100'
                    : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                >
                  <div className={`text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 ${method.active
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-600 text-white'
                    }`}>
                    {method.type}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {method.description}
                  </p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    Go to page
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            🚀 This page using Static Site Generation (SSG)
          </h3>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Content is pre-rendered during the build, ensuring excellent performance and SEO.
            Navigate the app to see the various rendering methods in action!
          </p>
        </motion.div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Form submission demo"
      />
    </div>
  );
}
