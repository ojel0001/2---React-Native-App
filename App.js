
import { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View, StyleSheet, FlatList, SafeAreaView,TouchableOpacity, RefreshControl} from "react-native";
import axios from "axios";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/Ionicons";



export default function App() {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  
  useEffect(() => {
    axios
      .get("https://random-data-api.com/api/users/random_user?size=10")
      .then((response) => {
        setUsers(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching users:", error); 
      });
  },[]); 


  const fetchSingleUser = () => {
    axios
      .get("https://random-data-api.com/api/users/random_user?size=1")
      .then((response) => {
        setUsers([response.data[0], ...users]); 
      })
      .catch((error) => {
        console.error("Error fetching single user:", error);
      });
  };



    const onRefresh = () => {
      setRefreshing(true);
      axios
        .get("https://random-data-api.com/api/users/random_user?size=10")
        .then((response) => {
          setUsers(response.data);
          setRefreshing(false); 
        })
        .catch((error) => {
          console.error("Error refreshing users:", error);
          setRefreshing(false);
        });
    };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>First Name: {item.first_name}</Text>
      <Text style={styles.itemText}>Last Name: {item.last_name}</Text>
      <UserAvatar size={50} name={item.first_name} src={item.avatar}></UserAvatar>
    </View>
    
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Welcome To The User List</Text>
        </View>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}/>
          
        <TouchableOpacity style={styles.fab} onPress={fetchSingleUser}>
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    margin: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",

    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    fontWeight: "bold",
    
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#6200ee",
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});