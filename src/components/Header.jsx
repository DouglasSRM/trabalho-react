import { FiPlus, FiTrash2, FiX, FiLogOut } from 'react-icons/fi'
import { auth } from '../services/firebaseConfig'
import { signOut } from 'firebase/auth'

export default function Header({ 
  onCreateNote, 
  isSelecting, 
  onCancelSelection, 
  onDeleteSelected, 
  hasSelected,
  selectedCount 
}) {
  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  return (
    <header className="app-header">
      <div className="header-content">
        {isSelecting ? (
          <>
            <button onClick={onCancelSelection} className="icon-button">
              <FiX size={24} />
            </button>
            <h2>{hasSelected ? `${selectedCount} selecionada(s)` : 'Selecionar notas'}</h2>
            {hasSelected && (
              <button 
                onClick={onDeleteSelected} 
                className="icon-button delete-button"
                aria-label="Excluir notas selecionadas"
              >
                <FiTrash2 size={24} />
              </button>
            )}
          </>
        ) : (
          <>
            <div className="header-left">
              <h1>Notas</h1>
            </div>
            <div className="header-right">
              <button 
                onClick={handleLogout} 
                className="icon-button logout-button"
                aria-label="Sair da conta"
              >
                <FiLogOut size={20} />
              </button>
              <button 
                onClick={onCreateNote} 
                className="icon-button"
                aria-label="Adicionar nova nota"
              >
                <FiPlus size={24} />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}