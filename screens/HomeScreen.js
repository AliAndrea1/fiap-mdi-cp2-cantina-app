import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
<View style={styles.header}>
    <Text style={styles.title}>Cantina</Text>
  <Image 
    source={require('../assets/images/logo.png')} 
    style={styles.logo}
  />
</View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Menu')}
      >
        <Text style={styles.buttonText}>Ver Cardápio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    color: '#fe0058',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#fe0058',
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
 logo: {
  width: 150,
  height: 100,
  resizeMode: 'contain',
  marginBottom:30
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 40
},
});