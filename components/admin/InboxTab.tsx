'use client'

import { useEffect, useState } from 'react'
import { getMessages, markAsRead, archiveMessage, type Message } from '@/lib/messageUtils'
import MessageDetail from './MessageDetail'

export default function InboxTab() {
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
        // Filter out archived messages and sort by most recent first
        const inboxMessages = data
          .filter((msg: Message) => !msg.is_archived)
          .sort((a: Message, b: Message) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        setMessages(inboxMessages)
      }
    } catch (err) {
      setError('Failed to load messages')
      console.error('Error loading messages:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await markAsRead(messageId)
      setRefreshTrigger((prev) => prev + 1)
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null)
      }
    } catch (err) {
      console.error('Error marking message as read:', err)
    }
  }

  const handleArchive = async (messageId: string) => {
    try {
      await archiveMessage(messageId)
      setRefreshTrigger((prev) => prev + 1)
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null)
      }
    } catch (err) {
      console.error('Error archiving message:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-slate-600">Loading messages...</p>
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
      <MessageDetail
        message={selectedMessage}
        onBack={() => setSelectedMessage(null)}
        onMarkAsRead={() => handleMarkAsRead(selectedMessage.id)}
        onArchive={() => handleArchive(selectedMessage.id)}
      />
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 text-lg">No messages in your inbox</p>
      </div>
    )
  }

  const unreadCount = messages.filter((msg) => !msg.is_read).length

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Inbox {unreadCount > 0 && <span className="ml-2 text-sm bg-red-500 text-white px-3 py-1 rounded-full">{unreadCount} new</span>}
        </h2>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => setSelectedMessage(message)}
            className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md ${
              message.is_read
                ? 'bg-white border-slate-200'
                : 'bg-blue-50 border-primary'
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`font-semibold text-lg truncate ${message.is_read ? 'text-slate-900' : 'text-primary font-bold'}`}>
                    {message.name}
                  </h3>
                  {!message.is_read && (
                    <span className="inline-block w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                  )}
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
              <div className="flex-shrink-0 text-primary hover:text-blue-700 font-semibold">
                →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
