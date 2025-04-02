// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuração do Firebase - Melhor prática: usar variáveis de ambiente
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCxSYseQoswql7NbxyPzJ4BHYmCMkBYeB8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "notas-e42c4.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "notas-e42c4",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "notas-e42c4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "118784135907",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:118784135907:web:b863a82693bca1a6dd6bd6",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PLDHB7SNYZ"
};

// Inicialização do Firebase com verificação de erro
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Erro na inicialização do Firebase:", error);
  throw new Error("Falha na inicialização do Firebase");
}

// Inicialização dos serviços
const db = getFirestore(app);
const auth = getAuth(app);

// Configurações adicionais recomendadas para auth
auth.useDeviceLanguage();

// Exportação dos serviços
export { db, auth };

// Opcional: Exporte funções úteis para inicialização
export const initFirebase = () => {
  return { db, auth };
};