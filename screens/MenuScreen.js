import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function MenuScreen({ navigation }) {
  const [items] = useState([
    { id: '1', name: 'Coxinha', price: 6 },
    { id: '2', name: 'Pão de Queijo', price: 4 },
    { id: '3', name: 'Hambúrguer', price: 12 },
    { id: '4', name: 'Refrigerante', price: 5 },
    { id: '5', name: 'Suco Natural', price: 7 },
    { id: '6', name: 'Salgado Vegano', price: 9 },
    { id: '7', name: 'Café', price: 3 },
    { id: '8', name: 'Chocolate', price: 6 }
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={{ color: '#fff' }}>
              {item.name} - R${item.price}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Cart', { item })}
            >
              <Text style={styles.add}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#fe0058',
    paddingBottom: 10
  },
  add: {
    color: '#fe0058',
    fontWeight: 'bold'
  }
});