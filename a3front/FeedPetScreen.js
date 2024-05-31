import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SettingsContext } from './components/SettingsContext';
import { AuthContext } from './components/AuthContext';
import { format } from 'date-fns';
import { API_KEY } from '@env';

const FeedPetScreen = ({ navigation }) => {
  const { username } = useContext(AuthContext);
  const { fontSize, fontColor, backgroundColor } = useContext(SettingsContext);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${API_KEY}/pets?owner=${username}`);
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, [username]);

  const handleDismiss = async () => {
    if (!selectedPet) {
      Alert.alert('Select a Pet', 'Please select a pet to dismiss feeding time');
      return;
    }

    try {
      const response = await fetch(`${API_KEY}/pets/${selectedPet.id}/needfeeding`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Feeding time dismissed successfully');
        setPets((prevPets) =>
          prevPets.map((pet) =>
            pet.id === selectedPet.id ? { ...pet, needfeeding: null } : pet
          )
        );
      } else {
        Alert.alert('Error', data.error || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }

    navigation.navigate('Main');
  };

  const handleConfirm = async (selectedDate) => {
    const currentDate = new Date(date);
    currentDate.setFullYear(selectedDate.getFullYear());
    currentDate.setMonth(selectedDate.getMonth());
    currentDate.setDate(selectedDate.getDate());
    setDate(currentDate);

    if (!selectedPet) {
      Alert.alert('Select a Pet', 'Please select a pet to feed');
      setDatePickerVisibility(false);
      return;
    }

    try {
      const response = await fetch(`${API_KEY}/pets/${selectedPet.id}/needfeeding`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ needfeeding: currentDate.toISOString() }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Feeding time updated successfully');
        setPets((prevPets) =>
          prevPets.map((pet) =>
            pet.id === selectedPet.id ? { ...pet, needfeeding: currentDate.toISOString() } : pet
          )
        );
      } else {
        Alert.alert('Error', data.error || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }

    setDatePickerVisibility(false);

    navigation.navigate('Main');
  };

  const renderPetItem = ({ item }) => {
    const needFeedingTime = new Date(item.needfeeding);
    const currentTime = new Date();
    const isPastFeedingTime = currentTime > needFeedingTime;

    return (
      <TouchableOpacity
        style={[styles.row, selectedPet && selectedPet.id === item.id && styles.selectedRow]}
        onPress={() => setSelectedPet(item)}
      >
        <Text style={[styles.cell, { fontSize, color: fontColor }]}>{item.petname}</Text>
        <Text style={[styles.cell, { fontSize, color: fontColor }]}>{item.category}</Text>
        <Text style={[styles.cell, { fontSize, color: fontColor }, isPastFeedingTime ? styles.disabledText : null]}>
          {item.needfeeding ? format(new Date(item.needfeeding), 'yyyy-MM-dd hh:mm a') : ''}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.header, { fontSize, color: fontColor }]}>Select a Pet to Feed</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPetItem}
        ListHeaderComponent={() => (
          <View style={styles.row}>
            <Text style={[styles.headerCell, { color: fontColor }]}>Name</Text>
            <Text style={[styles.headerCell, { color: fontColor }]}>Category</Text>
            <Text style={[styles.headerCell, { color: fontColor }]}>Time for feeding</Text>
          </View>
        )}
      />
      {selectedPet && (
        <>
          {selectedPet.needfeeding ? (
            <Button title="Dismiss Feeding Time" onPress={handleDismiss} />
          ) : (
            <Button title="Select Feeding Time" onPress={() => setDatePickerVisibility(true)} />
          )}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  selectedRow: {
    backgroundColor: '#e0e0e0',
  },
  disabledText: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
});

export default FeedPetScreen;