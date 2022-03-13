import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';


import ChartAirQuality from './app/domainLayer/classes/ChartAirQuality.js';

export default function App() {

  var x = new ChartAirQuality("Aire");
  console.log(x.ChartTitle);

  return (
    <View style={styles.container}>
      <Text>Hola</Text>
      <StatusBar style="auto" />
      <Button title="Hola" style={styles.button}></Button>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#93a243'
  },
});