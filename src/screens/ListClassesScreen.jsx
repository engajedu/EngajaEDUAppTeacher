import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { useTheme, ActivityIndicator, FAB, Text, Menu, Modal, Portal, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import GradientBackground from '../components/GradientBackground';
import ClassCard from '../components/ClassCard';
import useClasses from '../hooks/useClasses';
import { useState } from 'react';
import { useQuizClass } from '../contexts/QuizClassContext';

export default function ListClassesScreen() {
  const [visible, setVisible] = useState(false);
  const { classes } = useClasses();
  const navigation = useNavigation();
  const theme = useTheme();

  const { classCode, setClassCode } = useQuizClass();

  const [className, setClassName] = useState('');
  
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showDetails = () => {
    navigation.navigate('Class Detail', { className, classCode });
    hideModal();
  }

  const openCard = (code, name) => {
    showModal();
    setClassCode(code);
    setClassName(name);
  }

  const goToSelectQuiz = () => {
    navigation.navigate('Select Quiz', { name: className });
    setVisible(false);
  }

  return (
    <GradientBackground>
      {
        !classes ? (
          <>
            <Text variant="titleLarge" style={{ marginBottom: 30 }}>Minhas turmas</Text>
            <ActivityIndicator animating={true} />
          </>
        )
          :
          (
            classes.length === 0 ?
              <Text variant="titleLarge">Não há turmas cadastradas</Text>
              :
              <>
                <Text variant="titleLarge" style={{ marginVertical: 20 }}>Minhas turmas</Text>

                <FlatList
                  data={classes}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => <ClassCard item={item} onPress={() => openCard(item.codigo, item.nome)} />}
                  style={{ width: Dimensions.get('window').width * 0.9, flexGrow: 0 }}
                />
              </>
          )
      }
      <FAB
        icon="plus"
        style={styles.modal}
        onPress={() => navigation.navigate('New Class')}
      />

      <Portal>
        <Modal visible={visible} onDismiss={hideModal}
        contentContainerStyle={{backgroundColor: theme.colors.onSurfaceVariant, padding: 10, width: '80%', margin: 'auto'}}>
          <Menu.Item
          title="Ver detalhes"
          titleStyle={{ color: theme.colors.onSecondary }}
          onPress={showDetails}>
          </Menu.Item>

          <Menu.Item
          title="Aplicar questionário nesta turma"
          titleStyle={{ color: theme.colors.onSecondary }}
          onPress={goToSelectQuiz}
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

const styles = StyleSheet.create({
  card: { marginVertical: 15, paddingVertical: 10 },
  fab: { marginVertical: 15, paddingVertical: 10 },
  modal: { position: 'absolute', margin: 15, padding: 5, right: 15, bottom: 15 }
})