import { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { ActivityIndicator, Appbar, Button, Card, Text, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import GradientBackground from "../components/GradientBackground";
import useClasses from "../hooks/useClasses";
import { useQuizClass } from "../contexts/QuizClassContext";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function SelectClassScreen() {
    const [selectedCard, setSelectedCard] = useState(null);

    const { classes } = useClasses();
    const theme = useTheme();
    const { setClassCode } = useQuizClass();
    const navigation = useNavigation();

    const route = useRoute()
    const { name } = route.params;

    const selectClass = (id, code) => {
        setSelectedCard(id);
        setClassCode(code);
    }

    const goToLobby = () => {
        if (!selectedCard) {
            Toast.show({
                type: 'error',
                text1: 'Selecione uma turma'
            })
            return;
        }

        navigation.navigate('Lobby');
    }

    const renderItem = ({ item }) => (
        <Card
            onPress={() => selectClass(item._id, item.codigo || item.Codigo)}
            style={{
                marginVertical: 15,
                paddingVertical: 10,
                backgroundColor: selectedCard === item._id ? theme.colors.primary : theme.colors.background
            }}>

            <Card.Title
                title={item.Disciplina || item.nome}
                subtitle={item.periodo || item.Periodo}
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
                    !classes ?
                        <ActivityIndicator animating={true} color={theme.colors.primary} />
                        :
                        (
                            classes.length === 0 ?
                                <Text variant="titleLarge">Não há turmas cadastradas</Text>
                                :
                                <>
                                    <Text variant="titleLarge" style={{ marginVertical: 20 }}>{name}</Text>
                                    <Text variant="titleLarge" style={{ marginVertical: 20 }}>Selecione a turma</Text>

                                    <FlatList
                                        data={classes}
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