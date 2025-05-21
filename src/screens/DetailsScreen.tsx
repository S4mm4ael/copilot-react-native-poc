import { View, Text, Button } from 'react-native';

const DetailsScreen = ({ navigation }: any) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Details Screen</Text>
    <Button
      title="Go back"
      onPress={() => navigation.goBack()}
    />
  </View>
);

export default DetailsScreen;
