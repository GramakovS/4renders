'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, User, Search, Trash2, Plus } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import type { Post } from '@/types';

import { postApi, userApi } from '@/lib/api';
import Modal from '@/components/Modal';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function PostsPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data: posts = [], isLoading: postsLoading, isError: postsError, error: postsErrorMessage } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await postApi.getPosts();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to fetch posts');
    },
  });

  const { data: users = [], isLoading: usersLoading, isError: usersError, error: usersErrorMessage } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userApi.getUsers();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to fetch users');
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      const response = await postApi.deletePost(postId);
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete post');
      }
      return postId;
    },
    onSuccess: (postId) => {
      queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => {
        if (!oldPosts) return oldPosts;
        return oldPosts.filter((post: Post) => post.id !== postId);
      });
    },
  });

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = selectedUserId === null || post.userId === selectedUserId;
    return matchesSearch && matchesUser;
  });

  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  const handleDeletePost = async (postId: number) => {
    deletePostMutation.mutate(postId);
  };

  const isLoading = postsLoading || usersLoading;
  const isError = postsError || usersError;

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center py-12">
            <FileText className="mx-auto text-red-500 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-red-600 mb-2">Error loading data</h3>
            <p className="text-gray-500">Failed to load posts or users. Please try again later.</p>
            {postsErrorMessage && <p className="text-red-500 mt-2">Posts error: {postsErrorMessage.message}</p>}
            {usersErrorMessage && <p className="text-red-500 mt-2">Users error: {usersErrorMessage.message}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FileText className="text-purple-600 mr-3" size={48} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Posts Management
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This page demonstrates Client-Side Rendering (CSR) with TanStack Query.
            All interactions happen in the browser with dynamic updates.
          </p>
          <div className="mt-4 inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
            🔄 CSR - Client-Side Rendered with TanStack Query
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner size="lg" text="Loading posts and users..." className="py-20" />
        ) : (
          <>
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>

                <select
                  value={selectedUserId || ''}
                  onChange={(e) => setSelectedUserId(e.target.value ? Number(e.target.value) : null)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                >
                  <option value="">All Users</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  <Plus size={20} className="mr-2" />
                  Add Post
                </button>
              </div>

              <div className="flex gap-4 text-sm text-gray-600">
                <span>Total Posts: {posts.length}</span>
                <span>•</span>
                <span>Filtered: {filteredPosts.length}</span>
                <span>•</span>
                <span>Users: {users.length}</span>
              </div>
            </div>

            <AnimatePresence>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <User size={16} className="mr-2" />
                          <span className="text-sm">{getUserName(post.userId)}</span>
                        </div>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded">
                          #{post.id}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg line-clamp-2">
                        {post.title}
                      </h3>
                    </div>

                    <div className="p-4">
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {post.body}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          disabled={deletePostMutation.isPending}
                          className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 size={14} className="mr-1" />
                          {deletePostMutation.isPending && deletePostMutation.variables === post.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </>
        )}

        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            ⚡ Client-Side Rendering (CSR) with TanStack Query
          </h3>
          <p className="text-purple-100 max-w-2xl mx-auto">
            This page is rendered entirely in the browser with TanStack Query for data management,
            providing automatic caching, background updates, and efficient data synchronization.
          </p>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Post"
      />
    </div>
  );
}