import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/contexts/themeContext';
import Toast from 'react-native-toast-message';
import { useKeepAwake } from 'expo-keep-awake';

import TeacherScreen from './src/screens/TeacherScreen';
import NewClassScreen from './src/screens/NewClassScreen';
import NewQuizScreen from './src/screens/NewQuizScreen';
import ClassDetailScreen from './src/screens/ClassDetailScreen';
import QuizDetailScreen from './src/screens/QuizDetailScreen';
import LobbyQuizScreen from './src/screens/LobbyQuizScreen';
import ShowQuizScreen from './src/screens/ShowQuizScreen';
import FinalQuizScreen from './src/screens/FinalQuizScreen';
import { QuizClassProvider } from './src/contexts/QuizClassContext';
import SelectClassScreen from './src/screens/SelectClassScreen';
import SelectQuizScreen from './src/screens/SelectQuizScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useKeepAwake();
  
  return (
    <QuizClassProvider>
      <ThemeProvider>
        <StatusBar translucent />

        <NavigationContainer>
          <Stack.Navigator initialRouteName='Teacher' screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name='Teacher' component={TeacherScreen} />
            <Stack.Screen name='New Class' component={NewClassScreen} />
            <Stack.Screen name='New Quiz' component={NewQuizScreen} />
            <Stack.Screen name='Class Detail' component={ClassDetailScreen} />
            <Stack.Screen name='Quiz Detail' component={QuizDetailScreen} />
            <Stack.Screen name='Lobby' component={LobbyQuizScreen} />
            <Stack.Screen name='Show' component={ShowQuizScreen} />
            <Stack.Screen name='Final' component={FinalQuizScreen} />
            <Stack.Screen name='Select Class' component={SelectClassScreen} />
            <Stack.Screen name='Select Quiz' component={SelectQuizScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </ThemeProvider>
    </QuizClassProvider>
  );
}