import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  function validate() {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'O nome é obrigatório.';
    if (!email.trim()) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Formato de e-mail inválido.';
    }
    if (!password) {
      newErrors.password = 'A senha é obrigatória.';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres.';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleRegister() {
    if (!validate()) return;

    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);

    if (!result.success) {
      setErrors({ general: result.message });
    } else {
      setSuccessMsg('Cadastro realizado com sucesso!');
      setTimeout(() => navigation.navigate('Login'), 1500);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha os dados abaixo</Text>

        {/* Nome */}
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Seu nome"
          placeholderTextColor="#666"
          value={name}
          onChangeText={t => { setName(t); setErrors(e => ({ ...e, name: null })); }}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        {/* E-mail */}
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="usuario@dominio.com"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={t => { setEmail(t); setErrors(e => ({ ...e, email: null })); }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        {/* Senha */}
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Mínimo 6 caracteres"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={t => { setPassword(t); setErrors(e => ({ ...e, password: null })); }}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {/* Confirmação */}
        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          placeholder="Repita a senha"
          placeholderTextColor="#666"
          secureTextEntry
          value={confirmPassword}
          onChangeText={t => { setConfirmPassword(t); setErrors(e => ({ ...e, confirmPassword: null })); }}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        {/* Erros gerais */}
        {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

        {/* Sucesso */}
        {successMsg ? <Text style={styles.successText}>{successMsg}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>Cadastrar</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Já tem conta? Faça login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fe0058',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 28,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 14,
    color: '#fff',
    marginBottom: 6,
    fontSize: 15,
  },
  inputError: {
    borderColor: '#fe0058',
  },
  errorText: {
    color: '#fe0058',
    fontSize: 12,
    marginBottom: 10,
  },
  successText: {
    color: '#4caf50',
    fontSize: 13,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fe0058',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#fe0058',
    textAlign: 'center',
    fontSize: 14,
  },
});