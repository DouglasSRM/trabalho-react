// src/hooks/useNotes.js
import { useState, useEffect } from 'react';
import { db } from '../services/firebaseConfig';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const auth = getAuth();

  // Carrega as notas do Firebase em tempo real
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'notes'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesData = querySnapshot.docs.map(doc => ({
        id: doc.id, // Usamos o ID gerado pelo Firestore
        ...doc.data()
      }));
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  // Adiciona uma nova nota (similar à versão original)
  const addNote = async (note) => {
    try {
      const docRef = await addDoc(collection(db, 'notes'), {
        ...note,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        lastEdited: serverTimestamp()
      });
      
      // Retornamos um objeto com a mesma estrutura que sua versão local
      return { 
        id: docRef.id, 
        ...note,
        lastEdited: new Date().toISOString() 
      };
    } catch (error) {
      console.error("Error adding note: ", error);
      throw error;
    }
  };

  // Atualiza uma nota existente
  const updateNote = async (updatedNote) => {
    try {
      await updateDoc(doc(db, 'notes', updatedNote.id), {
        title: updatedNote.title,
        content: updatedNote.content,
        lastEdited: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating note: ", error);
      throw error;
    }
  };

  // Deleta múltiplas notas
  const deleteNotes = async (noteIds) => {
    try {
      const deletePromises = noteIds.map(id => 
        deleteDoc(doc(db, 'notes', id))
      );
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting notes: ", error);
      throw error;
    }
  };

  return { notes, addNote, updateNote, deleteNotes };
}