// components/profile/AccountSettings.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { ProfileForm, InfoForm, PasswordForm, User } from './AccountForms'
import { supabase } from '@/lib/supabaseClient'
import { Avatar } from '../Avatar';
import { SocialLinks } from '../SocialLinks';
import { RoleBadge } from '../RoleBadge';
import { useRefreshUser } from '@/hooks/useRefreshUser'
import { LogoutButton } from '../ui/LogoutButton';

type Props = {
    user: {
      id: string;
      email?: string;
      user_metadata: Record<string, any>;
      phone?: string;
      avatar_url?: string;
    };
};
  

export default function AccountSettings({ user }: Props) {
  const [currentUser, setCurrentUser] = useState(user)
  const [editing, setEditing] = useState<'profile'|'info'|'password'|null>(null)
  const [feedback, setFeedback] = useState<string>('')
  const { refreshUser, loading } = useRefreshUser()
  
  return (
    <div className="max-w-xl mx-auto mt-15 space-y-6">
      {/* 1. Профиль */}
      <div className="p-6 bg-gray-800 rounded-2xl flex justify-between items-center">
        <div className="flex items-center space-x-4">
            {/* Используем компонент Avatar */}
            <Avatar src={currentUser.user_metadata.avatar_url || '/default-avatar.png'} alt="Аватар пользователя" />
            
            <div>
            <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-white">
                    {user?.user_metadata.full_name 
                        ?? (user?.email?.split('@')[0] ?? 'Без имени')}
                </h2>

                <RoleBadge role={currentUser.user_metadata.role || 'user'} />
            </div>
            <p className="text-sm text-gray-400">{currentUser.email}</p>
            </div>
        </div>
        <button
            onClick={() => setEditing('profile')}
            className="px-3 py-1 bg-indigo-600 text-sm rounded hover:bg-indigo-700"
        >
            Изменить
        </button>
      </div>

      {/* 2. Данные аккаунта */}
      <div className="p-6 bg-gray-800 rounded-2xl space-y-3">
        <div className="flex justify-between">
          <p className="text-sm text-gray-300">Email</p>
          <p className="text-sm text-white">{currentUser.email}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-300">Телефон</p>
          <p className="text-sm text-white">{currentUser.phone || 'нет данных'}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-300">Соц. сети</p>
          <div className="flex space-x-2">
            {currentUser.user_metadata.socials?.instagram && (
              <SocialLinks socials={currentUser.user_metadata.socials} />
            )}
          </div>
        </div>
        <button
          onClick={() => setEditing('info')}
          className="mt-4 px-3 py-1 bg-indigo-600 text-sm rounded hover:bg-indigo-700"
        >
          Изменить данные
        </button>
      </div>

      {/* 3. Пароль */}
      <div className="p-6 bg-gray-800 rounded-2xl flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-300">Пароль</p>
          <p className="text-sm text-white">••••••••</p>
        </div>
        <button
          onClick={() => setEditing('password')}
          className="px-3 py-1 bg-indigo-600 text-sm rounded hover:bg-indigo-700"
        >
          Изменить
        </button>
      </div>

      <LogoutButton />

      {/* Фидбек */}
      {feedback && (
        <p className="text-center text-sm text-indigo-300">{feedback}</p>
      )}

      {/* --- МОДАЛЫ --- */}
      <AnimatePresence>
        {editing === 'profile' && (
          <Modal onClose={() => setEditing(null)}>
            <ProfileForm
              user={currentUser}
              supabase={supabase}
              onClose={() => {
                refreshUser().then(freshUser => {
                  if (freshUser) setCurrentUser(freshUser)
                  setFeedback('Профиль обновлён')
                  setEditing(null)
                })
              }}              
            />
          </Modal>
        )}
        {editing === 'info' && (
          <Modal onClose={() => setEditing(null)}>
            <InfoForm
              user={currentUser}
              supabase={supabase}
              onClose={() => {
                refreshUser().then(freshUser => {
                  if (freshUser) setCurrentUser(freshUser)
                  setFeedback('Данные аккаунта обновлены')
                  setEditing(null)
                })
              }}
              
            />
          </Modal>
        )}
        {editing === 'password' && (
          <Modal onClose={() => setEditing(null)}>
            <PasswordForm
              supabase={supabase}
              onClose={() => {
                refreshUser().then(freshUser => {
                  if (freshUser) setCurrentUser(freshUser)
                  setFeedback('Пароль изменен')
                  setEditing(null)
                })
              }}
              
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// Универсальный Modal
function Modal({ children, onClose }: { children: React.ReactNode; onClose():void }) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="bg-gray-900 p-6 rounded-2xl max-w-md w-full"
        >
          {children}
          <button
            onClick={onClose}
            className="mt-4 block text-center text-sm text-gray-400 hover:text-gray-200"
          >
            Отмена
          </button>
        </motion.div>
      </motion.div>
    )
}