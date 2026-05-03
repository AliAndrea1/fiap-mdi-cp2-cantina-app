import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, TextInput
} from 'react-native';
import { useCart } from '../contexts/CartContext';

const ALL_ITEMS = [
  { id: '1', name: 'Coxinha', price: 6, category: 'Salgado' },
  { id: '2', name: 'Pão de Queijo', price: 4, category: 'Salgado' },
  { id: '3', name: 'Hambúrguer', price: 12, category: 'Prato' },
  { id: '4', name: 'Refrigerante', price: 5, category: 'Bebida' },
  { id: '5', name: 'Suco Natural', price: 7, category: 'Bebida' },
  { id: '6', name: 'Salgado Vegano', price: 9, category: 'Salgado' },
  { id: '7', name: 'Café', price: 3, category: 'Bebida' },
  { id: '8', name: 'Chocolate Quente', price: 6, category: 'Bebida' },
];

export default function MenuScreen() {
  const { addToCart, cart } = useCart();
  const [search, setSearch] = useState('');
  const [addedId, setAddedId] = useState(null);

  const filtered = ALL_ITEMS.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd(item) {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  }

  function cartCount(itemId) {
    return cart.filter(c => c.id === itemId).length;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio</Text>

      {/* Campo de busca — DIFERENCIAL */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nome ou categoria..."
        placeholderTextColor="#666"
        value={search}
        onChangeText={setSearch}
      />

      {filtered.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🍽️</Text>
          <Text style={styles.emptyText}>Nenhum item encontrado.</Text>
          <Text style={styles.emptySubtext}>Tente outro termo de busca.</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemPrice}>R$ {item.price},00</Text>
              </View>

              <View style={styles.itemActions}>
                {cartCount(item.id) > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartCount(item.id)}</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={[styles.addBtn, addedId === item.id && styles.addBtnSuccess]}
                  onPress={() => handleAdd(item)}
                >
                  <Text style={styles.addBtnText}>
                    {addedId === item.id ? '✓' : '+'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fe0058',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    marginBottom: 16,
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#fe0058',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  itemCategory: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  itemPrice: {
    color: '#fe0058',
    fontWeight: '600',
    marginTop: 4,
    fontSize: 14,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#fe0058',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  addBtn: {
    backgroundColor: '#fe0058',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnSuccess: {
    backgroundColor: '#4caf50',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    color: '#666',
    fontSize: 13,
    marginTop: 4,
  },
});