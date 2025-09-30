import { Users as UsersIcon, Mail, Phone, Globe, MapPin } from 'lucide-react';

import { User } from '@/types';
import { userApi } from '@/lib/api';

export default async function UsersPage() {
  const response = await userApi.getUsers();
  const users = response.success ? response.data || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <UsersIcon className="text-green-600 mr-3" size={48} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Users Directory
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This page demonstrates Server-Side Rendering (SSR). 
            Data is fetched fresh on every request, ensuring up-to-date information.
          </p>
          <div className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            🔄 SSR - Server-Side Rendered
          </div>
        </div>

        {users.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user: User) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-green-100">@{user.username}</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-3 text-blue-500" />
                    <a 
                      href={`mailto:${user.email}`}
                      className="hover:text-blue-600 transition-colors truncate"
                    >
                      {user.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-3 text-green-500" />
                    <a 
                      href={`tel:${user.phone}`}
                      className="hover:text-green-600 transition-colors"
                    >
                      {user.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe size={16} className="mr-3 text-purple-500" />
                    <a 
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-600 transition-colors truncate"
                    >
                      {user.website}
                    </a>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <MapPin size={16} className="mr-3 text-red-500 mt-0.5" />
                    <div className="text-sm">
                      <p>{user.address.street}, {user.address.suite}</p>
                      <p>{user.address.city}, {user.address.zipcode}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="font-semibold text-gray-800">{user.company.name}</p>
                    <p className="text-sm text-gray-600 italic">&quot;{user.company.catchPhrase}&quot;</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <UsersIcon className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No users found</h3>
            <p className="text-gray-500">Unable to load user data at this time.</p>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            ⚡ Server-Side Rendering (SSR)
          </h3>
          <p className="text-green-100 max-w-2xl mx-auto">
            This page is rendered on the server for each request, ensuring fresh data every time you visit.
            Perfect for content that changes frequently or requires up-to-date information.
          </p>
        </div>
      </div>
    </div>
  );
}