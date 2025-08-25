import { useEffect, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { ActivityIndicator, Appbar, Card, Text, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import GradientBackground from '../components/GradientBackground';

import api from '../services/api';

export default function ClassDetailScreen() {
  const [selectedClass, setSelectedClass] = useState(null);
  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();

  const { className, classCode } = route.params;

  useEffect(() => {
    async function getClass(){
      
      await api.post('/getTurmaTeste', JSON.stringify({
        codigoTurma: classCode
      }))
      .then(response => setSelectedClass(response.data))
      .catch(error => console.error(error))
    }

    getClass();
  }, []);

  const renderItem = ({ item }) => (
    <Card style={{ marginVertical: 12, backgroundColor: theme.colors.secondary }}>
      <Card.Content>
        <Text variant="titleSmall" theme={{ colors: theme.colors.onBackground }}>{item.Matricula}</Text>
        <Text variant="titleSmall" theme={{ colors: theme.colors.onBackground }} style={{ marginVertical: 5 }}>{item.Nome}</Text>
      </Card.Content>
    </Card>
  )

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <GradientBackground>
        {
          !selectedClass ?
            <ActivityIndicator animating={true} color={theme.colors.primary} />
            :
            (
              <View>
                <Text variant="titleLarge" style={{ textAlign: 'center', marginVertical: 20 }}>Detalhes da turma</Text>
                <Text variant="titleMedium" style={{ textAlign: 'center' }}>Nome: { className } </Text>
                <Text variant="titleMedium" style={{ textAlign: 'center' }}>Alunos: {selectedClass.length}</Text>

                <FlatList
                  data={selectedClass}
                  keyExtractor={item => item._id}
                  renderItem={renderItem}
                  style={{ width: Dimensions.get('window').width * 0.9, flexGrow: 0, marginVertical: 10 }}
                />
              </View>
            )
        }
      </GradientBackground>
    </>
  )
}