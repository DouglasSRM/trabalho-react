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

  const handleCreateNote = async () => {
    const newNote = {
      title: 'Nova Nota',
      content: ''
    }
    try {
      const createdNote = await addNote(newNote)
      setEditingNote(createdNote)
    } catch (error) {
      console.error("Erro ao criar nota:", error)
      // Você pode adicionar um feedback visual para o usuário aqui
    }
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
  }

  const cancelSelection = () => {
    setIsSelecting(false)
    setSelectedNotes([])
  }

  const handleDeleteSelected = async () => {
    try {
      await deleteNotes(selectedNotes)
      cancelSelection()
    } catch (error) {
      console.error("Erro ao deletar notas:", error)
      // Você pode adicionar um feedback visual para o usuário aqui
    }
  }

  const handleSaveNote = async (updatedNote) => {
    try {
      await updateNote(updatedNote)
      setEditingNote(null)
    } catch (error) {
      console.error("Erro ao salvar nota:", error)
      // Você pode adicionar um feedback visual para o usuário aqui
    }
  }

  // Não precisamos mais ordenar manualmente se a query do Firebase já retorna ordenado
  // Mas mantemos caso queira uma ordenação diferente no cliente
  const sortedNotes = [...notes].sort((a, b) => {
    return new Date(b.lastEdited) - new Date(a.lastEdited)
  })

  return (
    <div className="app-container">
      <Header 
        onCreateNote={handleCreateNote}
        isSelecting={isSelecting}
        onCancelSelection={cancelSelection}
        onDeleteSelected={handleDeleteSelected}
        hasSelected={selectedNotes.length > 0}
        selectedCount={selectedNotes.length}
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
            {sortedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => handleNoteClick(note)}
                onLongPress={() => handleLongPress(note.id)}
                isSelected={selectedNotes.includes(note.id)}
                isSelecting={isSelecting}
              />
            ))}
          </>
        )}
      </main>
    </div>
  )
}

export default App