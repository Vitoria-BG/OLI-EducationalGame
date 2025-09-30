import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react'; // Importando o useState

export default function SettingsScreen() {
  const router = useRouter();

  // Agora usamos o estado local para gerenciar as opções.
  // No futuro, você substituirá isso pelo seu Contexto Global.
  const [timer, setTimer] = useState('Desligado');
  const [cameraMode, setCameraMode] = useState('Frontal');
  const [language, setLanguage] = useState('Português');

  // Funções de placeholder. Aqui você abriria um modal/menu para o usuário escolher a opção.
  const handleChangeTimer = () => {
    // Ex: setTimer('30seg');
    console.log('Abrir seletor de temporizador');
  };

  const handleChangeCamera = () => {
    // Ex: setCameraMode('Traseira');
    console.log('Abrir seletor de câmera');
  };

  const handleChangeLanguage = () => {
    // Ex: setLanguage('Inglês');
    console.log('Abrir seletor de idioma');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONFIGURAÇÕES</Text>

      {/* Cartão principal com as opções */}
      <View style={styles.card}>
        {/* Opção: Temporizador */}
        <Pressable style={styles.optionButton} onPress={handleChangeTimer}>
          <Text style={styles.optionLabel}>TEMPORIZADOR</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.optionValue}>{timer}</Text>
            <Ionicons name="chevron-forward" size={22} color="#B0B0B0" />
          </View>
        </Pressable>

        <View style={styles.divider} />

        {/* Opção: Modo de Câmera */}
        <Pressable style={styles.optionButton} onPress={handleChangeCamera}>
          <Text style={styles.optionLabel}>MODO DE CÂMERA</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.optionValue}>{cameraMode}</Text>
            <Ionicons name="chevron-forward" size={22} color="#B0B0B0" />
          </View>
        </Pressable>
        
        <View style={styles.divider} />

        {/* Opção: Idioma */}
        <Pressable style={styles.optionButton} onPress={handleChangeLanguage}>
          <Text style={styles.optionLabel}>IDIOMA</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.optionValue}>{language}</Text>
            <Ionicons name="chevron-forward" size={22} color="#B0B0B0" />
          </View>
        </Pressable>
      </View>

      {/* Botão para voltar para a Home */}
      <Pressable onPress={() => router.push('/')} style={styles.homeButton}>
        <Ionicons name="home" size={32} color="#005792" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38B6FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    position: 'absolute',
    top: 80,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  optionButton: { // Alterado de optionRow para optionButton
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  valueContainer: { // Novo container para agrupar o valor e o ícone
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    marginRight: 10, // Espaçamento entre o texto e o ícone
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
  homeButton: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: '#FFFFFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});