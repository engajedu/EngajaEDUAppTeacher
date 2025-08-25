import { Card } from 'react-native-paper';

const ClassCard = ({ item, onPress }) => {
    return (
        <Card onPress={onPress} style={{ marginVertical: 15, paddingVertical: 10 }}>
            <Card.Title title={item.nome} subtitle={item.periodo} />
        </Card>
    )
}

export default ClassCard;