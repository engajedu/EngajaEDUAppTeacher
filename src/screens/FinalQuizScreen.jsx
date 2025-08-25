import { useEffect, useState } from 'react';
import { useTheme, Button, Text, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import api from '../services/api';
import Podium from '../components/Podium';
import GradientBackground from '../components/GradientBackground';

export default function FinalQuizScreen() {
    const navigation = useNavigation();
    const [students, setStudents] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    
    const theme = useTheme();

    useEffect(() => {
        async function getPodium(){
            const id = setInterval(async () => {
                try {
                    const response = await api.get('/retornaPodio');
                    setStudents(response.data);
                } catch (error) {
                    console.error('Error making API call:', error);
                }
            }, 3000);
    
            setIntervalId(id);
        }

        getPodium();
    }, []);

    const handleEnd = async () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        
        await api.get('/limparEstado').then(response => console.log(response));
        navigation.popToTop();
    };


    return (
        <GradientBackground>
            <Text variant='headlineSmall'>Questionário finalizado</Text>
            
            {
                students.length === 0 ? (
                    <ActivityIndicator animating={true} size="large" color={theme.colors.primary} style={{ marginVertical: 20 }}/>
                ) : (
                    <Podium students={students} />
                )

            }
           
            <Button
                mode="contained"
                style={{ padding: 10 }}
                onPress={handleEnd}>
                Encerrar
            </Button>
        </GradientBackground>
    )
}