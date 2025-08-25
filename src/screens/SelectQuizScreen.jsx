import { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { ActivityIndicator, Appbar, Button, Card, Text, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import GradientBackground from "../components/GradientBackground";
import useQuizzes from "../hooks/useQuizzes";
import { useQuizClass } from "../contexts/QuizClassContext";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function SelectQuizScreen() {
    const [selectedCard, setSelectedCard] = useState(null);

    const { quizzes } = useQuizzes();
    const theme = useTheme();
    const { setQuizCode } = useQuizClass();
    const navigation = useNavigation();

    const route = useRoute()
    const { name } = route.params;

    const selectQuiz = (id, code) => {
        setSelectedCard(id);
        setQuizCode(code);
    }

    const goToLobby = () => {
        if (!selectedCard) {
            Toast.show({
                type: 'error',
                text1: 'Selecione um questionário'
            })
            return;
        }

        navigation.navigate('Lobby');
    }

    const renderItem = ({ item }) => (
        <Card
            onPress={() => selectQuiz(item._id, item.codigo)}
            style={{
                marginVertical: 15,
                paddingVertical: 10,
                backgroundColor: selectedCard === item._id ? theme.colors.primary : theme.colors.background
            }}>

            <Card.Title
                title={item.nome}
                subtitle={item.descricao}
                titleStyle={{
                    color: selectedCard === item._id ? theme.colors.background : theme.colors.onBackground,
                }}
                subtitleStyle={{
                    color: selectedCard === item._id ? theme.colors.background : theme.colors.onBackground,
                }}
            />
        </Card>
    )

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
            </Appbar.Header>

            <GradientBackground>
                {
                    !quizzes ?
                        <ActivityIndicator animating={true} color={theme.colors.primary} />
                        :
                        (
                            quizzes.length === 0 ?
                                <Text variant="titleLarge">Não há questionários cadastrados</Text>
                                :
                                <>
                                    <Text variant="titleLarge" style={{ marginVertical: 20 }}>{name}</Text>
                                    <Text variant="titleLarge" style={{ marginVertical: 20 }}>Selecione o questionário</Text>

                                    <FlatList
                                        data={quizzes}
                                        keyExtractor={item => item._id}
                                        renderItem={renderItem}
                                        style={{ width: Dimensions.get('window').width * 0.9, flexGrow: 0 }}
                                    />

                                    <Button mode="contained" style={{ marginTop: 10, padding: 10, width: Dimensions.get('window').width * 0.6 }} onPress={goToLobby}>Avançar</Button>
                                </>
                        )
                }
            </GradientBackground>
        </>
    )
}