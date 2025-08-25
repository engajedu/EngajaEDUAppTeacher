import { Dimensions, FlatList } from 'react-native';
import { useTheme, ActivityIndicator, FAB, Text, Portal, Modal, Divider, Menu, Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import GradientBackground from '../components/GradientBackground';
import QuizCard from '../components/QuizCard';
import useQuizzes from '../hooks/useQuizzes';
import { useCallback, useState } from 'react';
import { useQuizClass } from '../contexts/QuizClassContext';

export default function ListQuizzesScreen() {
  const { quizzes, refetch } = useQuizzes();
  const navigation = useNavigation();
  const theme = useTheme();
  const { setQuizCode } = useQuizClass();

  const [visible, setVisible] = useState(false);
  const [quizName, setQuizName] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  const openCard = (code, name) => {
    showModal();
    setQuizCode(code);
    setQuizName(name);
  }

  const showDetails = () => {
    navigation.navigate('Quiz Detail');
    setVisible(false);
  }

  const goToSelectClass = () => {
    navigation.navigate('Select Class', { name: quizName });
    setVisible(false);
  }

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <GradientBackground>
      {
        (!quizzes || refreshing) ? (
          <>
            <Text variant="titleLarge" style={{ marginBottom: 30 }}>Meus questionários</Text>
            <ActivityIndicator animating={true}/>
          </>
        )
          :
          (
            quizzes.length === 0 ?
              <Text variant="titleLarge">Não há questionários cadastrados</Text>
              :
              <>
                <Text variant="titleLarge" style={{ marginBottom: 30 }}>Meus questionários</Text>

                <FlatList
                  data={quizzes}
                  keyExtractor={item => item.codigo}
                  renderItem={({ item }) => 
                  <QuizCard
                  item={item}
                  onPress={() => openCard(item.codigo, item.nome)}
                  onRefresh={handleRefresh}/>}
                  style={{ width: Dimensions.get('window').width * 0.9, flexGrow: 0, maxHeight: '65%' }}
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              </>
          )
      }

      <FAB
        icon="plus"
        style={{ position: 'absolute', margin: 15, padding: 5, right: 15, bottom: 15 }}
        onPress={() => navigation.navigate('New Quiz')}
      />

      <Portal>
        <Modal visible={visible} onDismiss={hideModal}
          contentContainerStyle={{ backgroundColor: theme.colors.onSurfaceVariant, padding: 10, width: '80%', margin: 'auto' }}>
          <Menu.Item
          title="Ver detalhes"
          titleStyle={{ color: theme.colors.onSecondary }}
          onPress={showDetails}   
          ></Menu.Item>

          <Menu.Item
          title="Aplicar questionário"
          titleStyle={{ color: theme.colors.onSecondary }}
          onPress={goToSelectClass}
          ></Menu.Item>

          <Divider bold/>

          <Menu.Item
          title="Cancelar"
          titleStyle={{ color: theme.colors.onSecondary }} 
          onPress={hideModal}></Menu.Item>
        </Modal>
      </Portal>
    </GradientBackground>
  )
}