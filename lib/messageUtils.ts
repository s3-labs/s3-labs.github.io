import { supabase } from './supabaseClient'

export interface Message {
  id: string
  name: string
  email: string
  message: string
  is_read: boolean
  is_archived: boolean
  created_at: string
}

export const getMessages = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export const getUnreadMessages = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('is_archived', false)
    .eq('is_read', false)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const createMessage = async (name: string, email: string, message: string) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ name, email, message }])
    .select()
  return { data, error }
}

export const markAsRead = async (id: string) => {
  const { data, error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('id', id)
    .select()
  return { data, error }
}

export const archiveMessage = async (id: string) => {
  const { data, error } = await supabase
    .from('messages')
    .update({ is_archived: true })
    .eq('id', id)
    .select()
  return { data, error }
}

export const unarchiveMessage = async (id: string) => {
  const { data, error } = await supabase
    .from('messages')
    .update({ is_archived: false })
    .eq('id', id)
    .select()
  return { data, error }
}

export const deleteMessage = async (id: string) => {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id)
  return { error }
}
