import { useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { ActivityIndicator, Appbar, Button, Card, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";
import { useQuizClass } from "../contexts/QuizClassContext";
import GradientBackground from '../components/GradientBackground';
import getFirstNames from '../utils/getFirstNames';

export default function LobbyQuizScreen() {
    const navigation = useNavigation();
    const { classCode, quizCode } = useQuizClass();
    const theme = useTheme();

    const [quiz, setQuiz] = useState(null);
    const [connectedStudents, setConnectedStudents] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const [classLoaded, setClassLoaded] = useState(false);
    const [quizLoaded, setQuizLoaded] = useState(false);
    const [quizEnterCode, setQuizEnterCode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const reset = async () => {
            //await api.get('/limparEstado').then(response => { });

            await api.post('/conectaQuestionario', JSON.stringify({ valor: false }))
                .then((response) => { console.log(response.data) })
                .catch((error) => { console.error(error) })
        }

        const loadQuiz = async () => {
            await api.post('/carregaQuestionario', JSON.stringify({ codigoQuestionario: quizCode }))
                .then(response => {
                    setQuiz(response.data);
                    setQuizLoaded(true)
                })
                .catch(error => {
                    console.error(error)
                })
        }

        const loadClass = async () => {
            await api.post('/carregaTurma', JSON.stringify({ codigoTurma: classCode }))
                .then(response => {
                    setClassLoaded(true)
                })
                .catch(error => {
                    console.error(error)
                })
        }

        const getQuizCode = async () => {
            await api.get('/gerarCodigo').then(response => setQuizEnterCode(response.data))
        }

        reset();
        loadQuiz();
        loadClass();
        getQuizCode();
    }, [])

    useEffect(() => {
        if (!classLoaded) return;
        if (!quizLoaded) return;

        const getConnectedStudents = async () => {
            await api.get('/alunosConectados')
                .then(response => {
                    setConnectedStudents(response.data);
                })
                .catch(error => {
                    console.error(error)
                })
        }

        const id = setInterval(getConnectedStudents, 3000);
        setIntervalId(id);

        return () => clearInterval(id);
    }, [classLoaded, quizLoaded]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const liberarQuestionario = async () => {
        if (intervalId) {
            clearInterval(intervalId);
        }

        await api.post('/conectaQuestionario', JSON.stringify({ valor: true }))
            .then((response) => {
                navigation.navigate('Show', { quiz: quiz })
            })
            .catch((error) => { console.error(error) });
    }

    const renderItem = ({ item }) => (
        <Card type="outlined" style={{ margin: 10, width: Dimensions.get('window').width / 2 - 50 }}>
            <Card.Content>
                <Text variant="titleSmall" style={{ marginBottom: 5 }}>{item.matricula}</Text>
                <Text variant="titleSmall">{getFirstNames(item.nome)}</Text>
            </Card.Content>
        </Card>
    )

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={async () => {
                    await api.get('/limparEstado').then(response => { });
                    navigation.goBack()
                }
                } />
            </Appbar.Header>

            <GradientBackground>
                {
                    isLoading ? (
                        <ActivityIndicator animating={true} size="large" color={theme.colors.primary} style={{ marginVertical: 20 }} />
                    ) : (
                        <>
                            <Text variant="headlineMedium">Código do questionário</Text>
                            <Text variant="displaySmall" style={{ marginVertical: 20 }}>{quizEnterCode}</Text>
                        </>
                    )
                }

                {
                    connectedStudents.length === 0 ?
                        <Text variant="titleLarge">Aguardando alunos ...</Text>
                        :
                        <>
                            <Text variant="titleMedium" style={{ marginBottom: 10 }}>Alunos conectados</Text>

                            <FlatList
                                data={connectedStudents}
                                keyExtractor={student => student.matricula}
                                renderItem={renderItem}
                                numColumns={2}
                                style={{ flexGrow: 0, maxHeight: Dimensions.get('window').height * 0.75 }}
                            />

                            <Button mode="contained" onPress={liberarQuestionario} style={{ marginTop: 20 }}>
                                Iniciar questionário
                            </Button>
                        </>
                }
            </GradientBackground>
        </>
    )
}