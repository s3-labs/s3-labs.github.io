'use client'

import { useEffect, useState } from 'react'
import { getMessages, unarchiveMessage, deleteMessage, type Message } from '@/lib/messageUtils'
import MessageDetail from './MessageDetail'

export default function ArchiveTab() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    loadMessages()
  }, [refreshTrigger])

  const loadMessages = async () => {
    try {
      setIsLoading(true)
      const { data } = await getMessages()
      if (data) {
        // Filter for archived messages and sort by most recent first
        const archivedMessages = data
          .filter((msg: Message) => msg.is_archived)
          .sort((a: Message, b: Message) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        setMessages(archivedMessages)
      }
    } catch (err) {
      setError('Failed to load archived messages')
      console.error('Error loading archived messages:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnarchive = async (messageId: string) => {
    try {
      // Create a message update by fetching current and toggling is_archived
      const message = messages.find((m) => m.id === messageId)
      if (message) {
        const { error } = await unarchiveMessage(messageId)
        if (error) throw error
        setRefreshTrigger((prev) => prev + 1)
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(null)
        }
      }
    } catch (err) {
      console.error('Error unarchiving message:', err)
    }
  }

  const handleDelete = async (messageId: string) => {
    if (!confirm('Are you sure you want to permanently delete this message?')) {
      return
    }

    try {
      const { error } = await deleteMessage(messageId)
      if (error) throw error
      setRefreshTrigger((prev) => prev + 1)
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null)
      }
    } catch (err) {
      console.error('Error deleting message:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-slate-600">Loading archived messages...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        {error}
      </div>
    )
  }

  if (selectedMessage) {
    return (
      <ArchiveMessageDetail
        message={selectedMessage}
        onBack={() => setSelectedMessage(null)}
        onUnarchive={() => handleUnarchive(selectedMessage.id)}
        onDelete={() => handleDelete(selectedMessage.id)}
      />
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 text-lg">No archived messages</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Archive ({messages.length})</h2>

      <div className="grid gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => setSelectedMessage(message)}
            className="p-4 rounded-lg border border-slate-200 bg-white cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg truncate text-slate-900">
                    {message.name}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 mb-1">{message.email}</p>
                <p className="text-slate-700 line-clamp-2 mb-2">{message.message}</p>
                <span className="text-xs text-slate-500">
                  {new Date(message.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="flex-shrink-0 text-slate-400 hover:text-slate-600 font-semibold">
                →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ArchiveMessageDetailProps {
  message: Message
  onBack: () => void
  onUnarchive: () => void
  onDelete: () => void
}

function ArchiveMessageDetail({ message, onBack, onUnarchive, onDelete }: ArchiveMessageDetailProps) {
  const [isUnarchiving, setIsUnarchiving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleUnarchive = async () => {
    setIsUnarchiving(true)
    await onUnarchive()
    setIsUnarchiving(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete()
    setIsDeleting(false)
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-6 text-primary hover:underline font-semibold flex items-center gap-2"
      >
        ← Back to Archive
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
            <span className="inline-block px-3 py-1 bg-gray-100 text-slate-600 rounded-full text-sm font-semibold">
              Archived
            </span>
          </div>
        </div>

        <div className="mb-8">
          <div className="prose prose-sm max-w-none bg-slate-50 p-4 rounded-lg whitespace-pre-wrap break-words">
            {message.message}
          </div>
        </div>

        <div className="flex gap-3 justify-start border-t border-slate-200 pt-6">
          <button
            onClick={handleUnarchive}
            disabled={isUnarchiving}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-semibold transition-colors"
          >
            {isUnarchiving ? 'Unarchiving...' : 'Unarchive'}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 font-semibold transition-colors"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
