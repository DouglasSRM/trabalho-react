import { useState, useEffect, useRef } from 'react'
import { FiSave, FiArrowLeft, FiTrash2 } from 'react-icons/fi'

export default function NoteEditor({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note?.title || 'Nova Nota')
  const [content, setContent] = useState(note?.content || '')
  const [isSaving, setIsSaving] = useState(false)
  const textareaRef = useRef(null)

  // Foco automático no conteúdo ao abrir o editor
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  // Atualiza os estados quando a nota muda
  useEffect(() => {
    setTitle(note?.title || 'Nova Nota')
    setContent(note?.content || '')
  }, [note])

  const handleSave = async () => {
    if (isSaving) return
    
    setIsSaving(true)
    try {
      await onSave({
        ...note,
        title: title.trim() || 'Nova Nota',
        content: content
      })
    } catch (error) {
      console.error("Erro ao salvar nota:", error)
      // Você pode adicionar um toast/alert aqui
    } finally {
      setIsSaving(false)
    }
  }

  // Salva automaticamente após 2 segundos de inatividade
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title !== note?.title || content !== note?.content) {
        handleSave()
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [title, content])

  return (
    <div className="note-editor">
      <div className="editor-header">
        <button 
          onClick={onClose} 
          className="icon-button"
          aria-label="Voltar"
          disabled={isSaving}
        >
          <FiArrowLeft size={24} />
        </button>
        
        <div className="editor-actions">
          <button 
            onClick={handleSave} 
            className="icon-button save-button"
            aria-label={isSaving ? "Salvando..." : "Salvar nota"}
            disabled={isSaving}
          >
            {isSaving ? (
              <span className="saving-spinner"></span>
            ) : (
              <FiSave size={24} />
            )}
          </button>
        </div>
      </div>
      
      <input
        type="text"
        className="editor-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da nota"
        disabled={isSaving}
      />
      
      <textarea
        ref={textareaRef}
        className="editor-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Comece a escrever..."
        disabled={isSaving}
      />
    </div>
  )
}