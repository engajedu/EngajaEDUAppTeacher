import { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Button, Icon, Text, TextInput, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { pickDocumentAsync } from '../helpers/pickDocument';
import useQuizzes from '../hooks/useQuizzes';
import GradientBackground from '../components/GradientBackground';

export default function NewQuizScreen() {
  const [quizName, setQuizName] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [fileName, setFileName] = useState(null);

  const { createNewQuiz } = useQuizzes();
  const theme = useTheme();
  const navigation = useNavigation()

  const handleUpload = async () => {
    const result = await pickDocumentAsync();

    if (!result) return;

    setQuizData(result.data);
    setFileName(result.fileName);
  }

  const saveQuiz = async () => {
    if (!quizName || !quizDescription || !quizData) {
      Toast.show({
        type: 'error',
        text1: 'Nome, planilha e descrição são obrigatórios'
      })
      return;
    }

    const savedQuestions = quizData.map(question => {
      return {
        enunciado: question[0],
        resposta: question[1],
        tema: question[2]
      };
    });

    createNewQuiz(JSON.stringify({
      questionario: {
        nome: quizName,
        descricao: quizDescription,
        questoes: savedQuestions
      }
    })).then(function (response) {
      Toast.show({
        type: 'success',
        text1: 'Questionário criado com sucesso'
      })

      setQuizName('');
      setQuizData(null);
      setFileName(null);

      navigation.replace('Teacher');
    })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <GradientBackground>
      {
        !quizData ? (
          <View style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: theme.colors.outline, borderStyle: 'dashed' }}>
            <Icon
              source="file-outline"
              size={150}
              color={theme.colors.onSurface}
            />
            <Text variant='titleSmall' style={{ textAlign: 'center' }}>Planilha não lida</Text>
          </View>
        )
          :
          (
            <View style={{ marginBottom: 20, padding: 10, borderWidth: 2, borderColor: theme.colors.primary, borderStyle: 'solid' }}>
              <Icon
                source="file-excel"
                size={150}
                color={theme.colors.primary}
              />
              <Text variant='titleSmall' style={{ textAlign: 'center' }}>{fileName}</Text>
            </View>
          )
      }

      <TextInput
        label="Nome"
        placeholder="Nome do questionário"
        mode="outlined"
        multiline
        value={quizName}
        onChangeText={setQuizName}
        style={{ width: Dimensions.get('window').width * 0.7, marginVertical: 20 }} />

      <TextInput
        label="Descrição"
        placeholder="Descrição do questionário"
        value={quizDescription}
        onChangeText={setQuizDescription}
        mode="outlined"
        multiline
        style={{ width: Dimensions.get('window').width * 0.7, marginVertical: 20 }} />

      <Button mode="contained" style={{ marginVertical: 10 }} onPress={handleUpload}>Ler planilha de questões</Button>

      <Button mode="contained" style={{ marginVertical: 10 }} onPress={saveQuiz}>Salvar Questionário</Button>
    </GradientBackground>
  );
}