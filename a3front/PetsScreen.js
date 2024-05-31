import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AuthContext } from './components/AuthContext';
import { API_KEY } from '@env';
import { SettingsContext } from './components/SettingsContext';

const PetsScreen = ({ navigation }) => {
  const { username } = useContext(AuthContext); // Use username (email) from AuthContext
  const { fontSize, fontColor, backgroundColor } = useContext(SettingsContext);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${API_KEY}/pets?owner=${username}`);
        const data = await response.json();
        setPets(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setLoading(false);
      }
    };

    fetchPets();
  }, [username]);

  const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('UpdatePetScreen', { pet: item })}
      >
          <View style={styles.row}>
          <Text style={[styles.cell, { fontSize, color: fontColor }]}>{item.petname}</Text>
          <Text style={[styles.cell, { fontSize, color: fontColor }]}>{item.category}</Text>
          <Text style={[styles.cell, { fontSize, color: fontColor }]}>{item.age}</Text>
          <Text style={[styles.cell, { fontSize, color: fontColor }]}>{item.weight}</Text>
          </View>
      </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.header, { fontSize, color: fontColor }]}>My Pets</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={styles.row}>
              <Text style={[styles.headerCell, { color: fontColor }]}>Name</Text>
              <Text style={[styles.headerCell, { color: fontColor }]}>Category</Text>
              <Text style={[styles.headerCell, { color: fontColor }]}>Age</Text>
              <Text style={[styles.headerCell, { color: fontColor }]}>Weight</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
});

export default PetsScreen;