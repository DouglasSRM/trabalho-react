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
    >
      <div className="note-card-content">
        <h3 title = {note.title}>{truncatedTitle}</h3>
        <p title = {note.content}>{truncatedContent}</p>
      </div>
      <div className="note-card-footer">
        <small>{new Date(note.lastEdited).toLocaleTimeString()} - {new Date(note.lastEdited).toLocaleDateString()}</small>
        {(isHovered || isSelected) && (
          <div className="note-actions">
            {!isSelected && !isSelecting && <FiEdit2 className="edit-icon" />}
            {isSelecting &&<FiTrash2 className="delete-icon" />}
          </div>
        )}
      </div> 
    </div>
  )
}