import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Cantina FIAP</Text>
      <Text style={styles.subtitle}>Olá, {user?.name?.split(' ')[0]} 👋</Text>
      <Text style={styles.body}>O que você vai pedir hoje?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Menu')}
      >
        <Text style={styles.buttonText}>Ver Cardápio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.buttonSecondaryText}>
          🛒 Carrinho {cart.length > 0 ? `(${cart.length})` : ''}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 24,
  },
  logo: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fe0058',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#999',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#fe0058',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#fe0058',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonSecondaryText: {
    color: '#fe0058',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutBtn: {
    padding: 10,
  },
  logoutText: {
    color: '#666',
    fontSize: 14,
  },
});