import { Alert } from 'react-native';
import { Card, IconButton, useTheme } from 'react-native-paper';
import api from '../services/api';
import Toast from 'react-native-toast-message';

const QuizCard = ({ item, onPress, onRefresh }) => {
    const theme = useTheme();

    const deleteQuiz = () => {
        Alert.alert(
            "Tem certeza?",
            "Excluir questionário?",
            [
                {
                    text: "Cancelar",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        await api.post('/deletarQuestionario', JSON.stringify({
                            codigoQuestionario: item.codigo
                        }))
                        .then(response => {
                            Toast.show({
                                type: 'success',
                                text1: response.data.message
                              })

                            onRefresh();
                        })

                    }
                }
            ]
        );
    }

    return (
        <>
            <Card onPress={onPress} style={{ marginVertical: 15, paddingVertical: 10 }}>
                <Card.Title title={item.nome} subtitle={item.descricao} />

                <Card.Actions>
                    <IconButton
                        mode="outlined"
                        icon="trash-can"
                        iconColor={theme.colors.errorContainer}
                        size={25}
                        onPress={deleteQuiz}
                    />

                </Card.Actions>
            </Card>
        </>
    )
}

export default QuizCard;