import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'

export default function Header({ 
  onCreateNote, 
  isSelecting, 
  onCancelSelection, 
  onDeleteSelected, 
  hasSelected 
}) {
  return (
    <header className="app-header">
      <div className="header-content">
        {isSelecting ? (
          <>
            <button onClick={onCancelSelection} className="icon-button">
              <FiX size={24} />
            </button>
            <h2>{hasSelected ? `${hasSelected} selecionada(s)` : 'Selecionar notas'}</h2>
            {hasSelected && (
              <button onClick={onDeleteSelected} className="icon-button delete-button">
                <FiTrash2 size={24} />
              </button>
            )}
          </>
        ) : (
          <>
            <h1>Notas</h1>
            <button onClick={onCreateNote} className="icon-button">
              <FiPlus size={24} />
            </button>
          </>
        )}
      </div>
    </header>
  )
}