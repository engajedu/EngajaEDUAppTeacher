import { useState } from "react";
import { Card, Text, Button, Icon, Surface, useTheme } from 'react-native-paper';
import useStyles from '../hooks/useStyles';

export default function QuestionCard({ question, answer }){
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const theme = useTheme();
    const styles = useStyles();

    return (
      <Card style={{ marginVertical: 12, backgroundColor: theme.colors.secondary }}>
        <Card.Content>
          <Text variant="titleSmall" theme={{ colors: theme.colors.onBackground }}>{question}</Text>

          {
                isAnswerVisible ?
                    <Button mode="text" onPress={() => setIsAnswerVisible(!isAnswerVisible)} style={{ marginTop: 20 }} >
                        <Icon source="eye-off" size={30} theme={{ colors: theme.colors.onBackground }} />
                    </Button>

                    :

                    <Button mode="text" onPress={() => setIsAnswerVisible(!isAnswerVisible)} style={{ marginTop: 30 }} >
                        <Icon source="eye" size={30} theme={{ colors: theme.colors.onBackground }} />
                    </Button>

            }

            {
                isAnswerVisible ?
                    (
                        answer === 'V' ?
                            <Text variant="titleSmall" theme={{ colors: theme.colors.onBackground }} style={{ marginVertical: 10, textAlign: 'center' }}>Verdadeiro</Text>
                            :
                            <Text variant="titleSmall" theme={{ colors: theme.colors.onBackground }} style={{ marginVertical: 10, textAlign: 'center' }}>Falso</Text>
                    ) : (
                        <Surface style={styles.answerSurface} elevation={2}></Surface>
                    )
            }

           </Card.Content>
      </Card>
    )

}