import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const savedUser = await AsyncStorage.getItem('@cantina:session');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error('Erro ao carregar sessão', e);
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, []);

  async function register(name, email, password) {
    try {
      const existingRaw = await AsyncStorage.getItem('@cantina:users');
      const users = existingRaw ? JSON.parse(existingRaw) : [];

      const alreadyExists = users.find(u => u.email === email);
      if (alreadyExists) {
        return { success: false, message: 'E-mail já cadastrado.' };
      }

      const newUser = { name, email, password };
      users.push(newUser);
      await AsyncStorage.setItem('@cantina:users', JSON.stringify(users));
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Erro ao cadastrar.' };
    }
  }

  async function login(email, password) {
    try {
      const existingRaw = await AsyncStorage.getItem('@cantina:users');
      const users = existingRaw ? JSON.parse(existingRaw) : [];

      const found = users.find(u => u.email === email && u.password === password);
      if (!found) {
        return { success: false, message: 'E-mail ou senha incorretos.' };
      }

      const sessionUser = { name: found.name, email: found.email };
      await AsyncStorage.setItem('@cantina:session', JSON.stringify(sessionUser));
      setUser(sessionUser);
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Erro ao fazer login.' };
    }
  }

  async function logout() {
    await AsyncStorage.removeItem('@cantina:session');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}