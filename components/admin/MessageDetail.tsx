'use client'

import { useState } from 'react'
import { Message } from '@/lib/messageUtils'

interface MessageDetailProps {
  message: Message
  onBack: () => void
  onMarkAsRead: () => void
  onArchive: () => void
}

export default function MessageDetail({ message, onBack, onMarkAsRead, onArchive }: MessageDetailProps) {
  const [isMarking, setIsMarking] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)

  const handleMarkAsRead = async () => {
    setIsMarking(true)
    await onMarkAsRead()
    setIsMarking(false)
  }

  const handleArchive = async () => {
    setIsArchiving(true)
    await onArchive()
    setIsArchiving(false)
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-6 text-primary hover:underline font-semibold flex items-center gap-2"
      >
        ← Back to Inbox
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b border-slate-200 pb-6 mb-6">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{message.name}</h1>
              <p className="text-lg text-slate-600">{message.email}</p>
              <p className="text-sm text-slate-500 mt-2">
                {new Date(message.created_at).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            {!message.is_read && (
              <span className="inline-block px-3 py-1 bg-blue-100 text-primary rounded-full text-sm font-semibold">
                Unread
              </span>
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="prose prose-sm max-w-none bg-slate-50 p-4 rounded-lg whitespace-pre-wrap break-words">
            {message.message}
          </div>
        </div>

        <div className="flex gap-3 justify-start border-t border-slate-200 pt-6">
          {!message.is_read && (
            <button
              onClick={handleMarkAsRead}
              disabled={isMarking}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-semibold transition-colors"
            >
              {isMarking ? 'Marking...' : 'Mark as Read'}
            </button>
          )}
          <button
            onClick={handleArchive}
            disabled={isArchiving}
            className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 disabled:opacity-50 font-semibold transition-colors"
          >
            {isArchiving ? 'Archiving...' : 'Archive'}
          </button>
        </div>
      </div>
    </div>
  )
}
