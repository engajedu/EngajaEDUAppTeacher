import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function useStyles() {
  const theme = useTheme()

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

    surface: {
      padding: 8,
      marginVertical: 20,
      height: 50,
      width: 200,
      alignItems: 'center',
      justifyContent: 'center',
    },

    podiumContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    
    podiumItem: {
      alignItems: 'center',
      marginVertical: 10
    },

    answerSurface: {
      padding: 20,
      width: '90%',
      alignSelf: 'center',
      marginTop: 10,
      borderRadius: 10

    }
  });
}