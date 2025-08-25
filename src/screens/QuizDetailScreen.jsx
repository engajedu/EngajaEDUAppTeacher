import { useEffect, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { ActivityIndicator, Appbar, Card, Text, useTheme, Surface, Button, Icon } from 'react-native-paper';
import { useQuizClass } from '../contexts/QuizClassContext';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import GradientBackground from '../components/GradientBackground';
import QuestionCard from '../components/QuestionCard';

export default function QuizDetailScreen() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const theme = useTheme();
  const navigation = useNavigation();

  const { quizCode } = useQuizClass();
  
  useEffect(() => {
    async function getQuiz(){
      await api.post('/carregaQuestionario', JSON.stringify({ codigoQuestionario : quizCode }))
      .then(response => {
        setSelectedQuiz(response.data)
      })
      .catch(error => console.error(error))
    }

    getQuiz();
  }, []);

  const renderItem = ({ item }) => (
    <QuestionCard question={item.enunciado} answer={item.resposta} />
  )

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <GradientBackground>
        {
          !selectedQuiz ? (
            <ActivityIndicator animating={true} color={theme.colors.primary} />
          ) : (
            <View>
              <Text variant="titleLarge" style={{ textAlign: 'center', marginVertical: 20 }}>Detalhes do questionário</Text>
              <Text variant="titleMedium" style={{ textAlign: 'center' }}>Nome: {selectedQuiz.descricao}</Text>
              <Text variant="titleMedium" style={{ textAlign: 'center' }}>Questões: {selectedQuiz.questoes.length}</Text>

              <FlatList
                data={selectedQuiz.questoes}
                keyExtractor={item => item._id}
                renderItem={renderItem}
                style={{ width: Dimensions.get('window').width * 0.8, marginVertical: 10 }}
              />
            </View>
          )
        }
      </GradientBackground>
    </>
  );
}
