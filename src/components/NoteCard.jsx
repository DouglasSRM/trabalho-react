import { useState, useEffect, useRef } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

export default function NoteCard({ note, onClick, onLongPress, isSelected }) {
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
  
  const previewContent = note.content.length > 100 
    ? `${note.content.substring(0, 100)}...` 
    : note.content
  
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
        <h3>{note.title || 'Sem título'}</h3>
        <p>{previewContent || 'Nenhum conteúdo ainda...'}</p>
      </div>
      <div className="note-card-footer">
        <small>{new Date(note.lastEdited).toLocaleDateString()}</small>
        {(isHovered || isSelected) && (
          <div className="note-actions">
            {!isSelected && <FiEdit2 className="edit-icon" />}
            {isSelected && <FiTrash2 className="delete-icon" />}
          </div>
        )}
      </div>
    </div>
  )
}