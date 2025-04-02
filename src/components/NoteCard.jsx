import { useState, useEffect, useRef } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

export default function NoteCard({ note, onClick, onLongPress, isSelected, isSelecting }) {
  const [isHovered, setIsHovered] = useState(false)
  const longPressTimer = useRef(null)
  
  const handleMouseDown = () => {
    longPressTimer.current = setTimeout(() => {
      onLongPress()
    }, 500)
  }
  
  const handleMouseUp = () => {
    clearTimeout(longPressTimer.current)
  }
  
  const handleTouchStart = () => {
    handleMouseDown()
  }
  
  const handleTouchEnd = () => {
    handleMouseUp()
  }
  
  useEffect(() => {
    return () => {
      clearTimeout(longPressTimer.current)
    }
  }, [])
  
  const MAX_TITLE_PREVIEW_LENGTH = 30
  const MAX_CONTENT_PREVIEW_LENGTH = 100

  // Melhor tratamento para notas sem conteúdo
  const truncatedTitle = note.title
    ? note.title.length > MAX_TITLE_PREVIEW_LENGTH
      ? `${note.title.substring(0, MAX_TITLE_PREVIEW_LENGTH)}...`
      : note.title
    : 'Sem título'

  const truncatedContent = note.content
    ? note.content.length > MAX_CONTENT_PREVIEW_LENGTH
      ? `${note.content.substring(0, MAX_CONTENT_PREVIEW_LENGTH)}...`
      : note.content
    : 'Nenhum conteúdo ainda...'
  
  // Formatação de data mais resiliente
  const formatDate = (dateString) => {
    try {
      const date = dateString?.toDate?.() || new Date(dateString)
      return isNaN(date.getTime()) 
        ? 'Data inválida' 
        : `${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${date.toLocaleDateString()}`
    } catch {
      return 'Data inválida'
    }
  }

  return (
    <div 
      className={`note-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        handleMouseUp()
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-selected={isSelected}
      role="button"
      tabIndex={0}
    >
      <div className="note-card-content">
        <h3 title={note.title}>{truncatedTitle}</h3>
        <p title={note.content}>{truncatedContent}</p>
      </div>
      <div className="note-card-footer">
        <small>{formatDate(note.lastEdited)}</small>
        {(isHovered || isSelected) && (
          <div className="note-actions">
            {!isSelected && !isSelecting && (
              <FiEdit2 className="edit-icon" aria-label="Editar nota" />
            )}
            {isSelecting && (
              <FiTrash2 className="delete-icon" aria-label="Excluir nota" />
            )}
          </div>
        )}
      </div> 
    </div>
  )
}