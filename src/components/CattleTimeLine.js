// CattleTimeline.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CattleTimeline = ({ data }) => {
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    if (!data || !data.movimentAnimalById) return;

    const sortedMovements = data.movimentAnimalById.sort((a, b) =>
      new Date(a.dataMovimento.split('/').reverse().join('-')) - new Date(b.dataMovimento.split('/').reverse().join('-'))
    );

    const formattedData = sortedMovements.map(event => {
      const animal = data.animalTarget.find(a => a.brincoRFID === event.brincoRFID);
      let description = '';

      switch (event.tipoEvento) {
        case 'Venda':
          description = `Brinco: ${event.brincoRFID}\nOrigem: ${animal?.origem || 'Desconhecida'}`;
          break;
        
          case 'Vacinação':
            const vacinas = data.animalsNeedleByBrinco
              .filter(v => v.brincoRFID === event.brincoRFID && v.dataVacina === event.dataMovimento) // Filtra apenas vacinas da mesma data
              .map(v => v.tipoVacina)
              .join(', ');
            description = `Brinco: ${event.brincoRFID}\nVacinas: ${vacinas || 'Nenhuma'}`;
            break;

        case 'Abate':
          description = `Brinco: ${event.brincoRFID}\nRaça: ${animal?.raca || 'Desconhecida'}\nSexo: ${animal?.sexo || 'Desconhecido'}\nIdade: ${animal?.idade || 'N/A'} ano(s)`;
          break;

        default:
          description = `Brinco: ${event.brincoRFID}\nOrigem: ${animal?.origem || 'Desconhecida'}\nRaça: ${animal?.raca || 'Desconhecida'}\nSexo: ${animal?.sexo || 'Desconhecido'}\nIdade: ${animal?.idade || 'N/A'} ano(s)`;
      }

      return {
        time: event.dataMovimento,
        title: `Evento: ${event.tipoEvento}`,
        description,
        lineColor: getEventColor(event.tipoEvento),
        icon: () => getEventIcon(event.tipoEvento),
      };
    });

    setTimelineData(formattedData);
  }, [data]);

  const getEventColor = (eventType) => {
    switch (eventType) {
      case 'Venda': return '#FF9800';
      case 'Abate': return '#D32F2F';
      case 'Vacinação': return '#4CAF50';
      default: return '#2196F3';
    }
  };

  const getEventIcon = (eventType) => {
    let iconName, iconColor;
    switch (eventType) {
      case 'Venda': iconName = 'cart-outline'; iconColor = '#FF9800'; break;
      case 'Abate': iconName = 'knife'; iconColor = '#D32F2F'; break;
      case 'Vacinação': iconName = 'needle'; iconColor = '#4CAF50'; break;
      default: iconName = 'cow'; iconColor = '#2196F3';
    }
    return <MaterialCommunityIcons name={iconName} size={24} color={iconColor} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📍 Histórico do Gado</Text>
      <Timeline
        data={timelineData}
        circleSize={25}
        circleColor="rgba(0,0,0,0.5)"
        lineColor="rgba(0,0,0,0.2)"
        timeContainerStyle={{ minWidth: 52, marginTop: 10 }}
        timeStyle={styles.time}
        descriptionStyle={styles.description}
        options={{ style: { paddingTop: 5 } }}
        innerCircle={'icon'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#333' },
  time: { textAlign: 'center', backgroundColor: '#ffeb3b', padding: 5, borderRadius: 5, color: '#333', fontSize: 12 },
  description: { color: '#666', fontSize: 14 },
});

export default CattleTimeline;
