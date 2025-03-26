import { useState, useEffect } from 'react'
import { FiSave, FiArrowLeft } from 'react-icons/fi'

export default function NoteEditor({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note.title || 'Nova Nota')
  const [content, setContent] = useState(note.content || '')

  useEffect(() => {
    setTitle(note.title || 'Nova Nota')
    setContent(note.content || '')
  }, [note])

  const handleSave = () => {
    onSave({
      ...note,
      title: title.trim() || 'Nova Nota',
      content: content
    })
  }

  return (
    <div className="note-editor">
      <div className="editor-header">
        <button onClick={onClose} className="icon-button">
          <FiArrowLeft size={24} />
        </button>
        <button onClick={handleSave} className="icon-button save-button">
          <FiSave size={24} />
        </button>
      </div>
      
      <input
        type="text"
        className="editor-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da nota"
      />
      
      <textarea
        className="editor-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Comece a escrever..."
        autoFocus
      />
    </div>
  )
}