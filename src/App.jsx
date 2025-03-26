import { useState } from 'react'
import { useNotes } from './hooks/useNotes'
import Header from './components/Header'
import NoteCard from './components/NoteCard'
import NoteEditor from './components/NoteEditor'
import './styles/theme.css'
import './styles/App.css'

function App() {
  const { notes, addNote, updateNote, deleteNotes } = useNotes()
  const [editingNote, setEditingNote] = useState(null)
  const [selectedNotes, setSelectedNotes] = useState([])
  const [isSelecting, setIsSelecting] = useState(false)

  const handleCreateNote = () => {
    const newNote = {
      title: 'Nova Nota',
      content: ''
    }
    const createdNote = addNote(newNote)
    setEditingNote(createdNote)
  }

  const handleNoteClick = (note) => {
    if (isSelecting) {
      setSelectedNotes(prev =>
        prev.includes(note.id)
          ? prev.filter(id => id !== note.id)
          : [...prev, note.id]
      )
    } else {
      setEditingNote(note)
    }
  }

  const handleLongPress = (noteId) => {
    setIsSelecting(true)
    setSelectedNotes([noteId])
  }

  const cancelSelection = () => {
    setIsSelecting(false)
    setSelectedNotes([])
  }

  const handleDeleteSelected = () => {
    deleteNotes(selectedNotes)
    cancelSelection()
  }

  const handleSaveNote = (updatedNote) => {
    updateNote(updatedNote)
    setEditingNote(null)
  }

  return (
    <div className="app-container">
      <Header 
        onCreateNote={handleCreateNote}
        isSelecting={isSelecting}
        onCancelSelection={cancelSelection}
        onDeleteSelected={handleDeleteSelected}
        hasSelected={selectedNotes.length > 0}
      />
      
      <main className="notes-container">
        {editingNote ? (
          <NoteEditor 
            note={editingNote} 
            onSave={handleSaveNote}
            onClose={() => setEditingNote(null)} 
          />
        ) : (
          <>
            {notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => handleNoteClick(note)}
                onLongPress={() => handleLongPress(note.id)}
                isSelected={selectedNotes.includes(note.id)}
              />
            ))}
          </>
        )}
      </main>
    </div>
  )
}

export default App