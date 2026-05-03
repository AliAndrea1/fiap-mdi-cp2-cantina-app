import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CartScreen({ route, navigation }) {
  const { item } = route.params;

  const [cart, setCart] = useState([item]);

  const [payment, setPayment] = useState(null);

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Carrinho</Text>

      {cart.length === 0 ? (
        <Text style={{ color: '#fff' }}>Carrinho vazio</Text>
      ) : (
        cart.map((i, index) => (
          <Text key={index} style={{ color: '#fff' }}>
            {i.name} - R${i.price}
          </Text>
        ))
      )}

      <Text style={{ marginTop: 20, color: '#fe0058' }}>
        Total: R${total}
      </Text>
      
      <Text style={styles.subtitle}>Escolher forma de pagamento:</Text>

      <TouchableOpacity
        style={[
          styles.option,
          payment === 'hora' && styles.selectedOption
        ]}
        onPress={() => setPayment('hora')}
      >
        <Text style={styles.optionText}>Pagar na retirada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          payment === 'PIX' && styles.selectedOption
        ]}
        onPress={() => setPayment('PIX')}
      >
        <Text style={styles.optionText}>PIX</Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.button}
  onPress={() => {
    if (!payment) {
      alert('Escolha uma forma de pagamento!');
      return;
    }

    alert(`Pedido realizado via ${payment === 'hora' ? 'pagamento presencial' : 'pagamento online'}`);
    
    navigation.navigate('Home'); // 👈 aqui
    }}
    >
    <Text style={styles.buttonText}>Finalizar Pedido</Text>
    </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={{ marginTop: 20, color: '#fff' }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fe0058',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#fe0058',
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  subtitle: {
  color: '#fff',
  marginTop: 20,
  marginBottom: 10,
  fontWeight: 'bold'
  },
  option: {
    borderWidth: 1,
    borderColor: '#fe0058',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: 250
  },
  selectedOption: {
    backgroundColor: '#fe0058'
  },
  optionText: {
    color: '#fff'
  },
});