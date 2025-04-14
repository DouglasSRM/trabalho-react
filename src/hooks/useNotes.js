import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function useNotes() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes')
    return savedNotes ? JSON.parse(savedNotes) : []
  })

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
    console.log(JSON.stringify(notes))
  }, [notes])

  const addNote = (note) => {
    const newNote = {
      ...note,
      id: uuidv4(),
      lastEdited: new Date().toISOString()
    }
    setNotes(prev => [newNote, ...prev])
    return newNote
  }

  const updateNote = (updatedNote) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === updatedNote.id ? {
          ...updatedNote,
          lastEdited: new Date().toISOString()
        } : note
      )
    )
  }

  const deleteNotes = (noteIds) => {
    setNotes(prev => {
      const updatedNotes = prev.filter(note => !noteIds.includes(note.id))
      return updatedNotes
    })
  }

  return { notes, addNote, updateNote, deleteNotes }
} 