import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  FlatList, ActivityIndicator, ScrollView
} from 'react-native';
import { useCart } from '../contexts/CartContext';

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  async function handleFinalize() {
    if (!payment) {
      setPaymentError('Escolha uma forma de pagamento.');
      return;
    }
    setPaymentError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // simula processamento
    setLoading(false);
    setSuccess(true);
    clearCart();
    setTimeout(() => {
      setSuccess(false);
      setPayment(null);
      navigation.navigate('Home');
    }, 2000);
  }

  if (success) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>✅</Text>
        <Text style={styles.successTitle}>Pedido realizado!</Text>
        <Text style={styles.successSubtitle}>
          Pagamento via {payment === 'hora' ? 'retirada' : 'PIX'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={styles.title}>🛒 Carrinho</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.buttonText}>Ver Cardápio</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {cart.map((item) => (
            <View key={item.cartId} style={styles.cartItem}>
              <View>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>R$ {item.price},00</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.cartId)}>
                <Text style={styles.removeBtn}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R$ {total},00</Text>
          </View>

          <Text style={styles.sectionTitle}>Forma de pagamento</Text>

          <TouchableOpacity
            style={[styles.option, payment === 'hora' && styles.optionSelected]}
            onPress={() => { setPayment('hora'); setPaymentError(''); }}
          >
            <Text style={styles.optionText}>💵 Pagar na retirada</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, payment === 'PIX' && styles.optionSelected]}
            onPress={() => { setPayment('PIX'); setPaymentError(''); }}
          >
            <Text style={styles.optionText}>📱 PIX</Text>
          </TouchableOpacity>

          {paymentError ? (
            <Text style={styles.errorText}>{paymentError}</Text>
          ) : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleFinalize}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.buttonText}>Finalizar Pedido</Text>
            }
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fe0058',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  cartItemName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  cartItemPrice: {
    color: '#fe0058',
    fontSize: 13,
    marginTop: 2,
  },
  removeBtn: {
    color: '#666',
    fontSize: 18,
    padding: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  totalLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#fe0058',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
  },
  option: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionSelected: {
    borderColor: '#fe0058',
    backgroundColor: '#1a0010',
  },
  optionText: {
    color: '#fff',
    fontSize: 15,
  },
  errorText: {
    color: '#fe0058',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fe0058',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    marginBottom: 24,
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 8,
  },
  successSubtitle: {
    color: '#999',
    fontSize: 15,
  },
});