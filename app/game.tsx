import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native'; // Hook para reativar a câmera

// Mapeamento de cores para o fundo da tela
const colorMap: { [key: string]: string } = {
  Azul: '#38B6FF',
  Verde: '#28A745',
  Rosa: '#E83E8C',
  Vermelho: '#DC3545',
  Amarelo: '#FFC107',
};

export default function GameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isFocused = useIsFocused(); // Verifica se a tela está em foco

  // Hooks da react-native-vision-camera
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const [currentColor, setCurrentColor] = useState('Azul');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const difficulty = params.difficulty;
    console.log('Dificuldade selecionada:', difficulty);
  }, [params.difficulty]);

  // Se não temos permissão, mostramos a tela para solicitar
  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Precisamos da sua permissão para usar a câmera
        </Text>
        <Pressable style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Conceder Permissão</Text>
        </Pressable>
      </View>
    );
  }

  // Se não há um dispositivo de câmera disponível
  if (device == null) {
    return (
        <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>Nenhuma câmera encontrada.</Text>
        </View>
    );
  }

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= score ? 'star' : 'star-outline'}
          size={35}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  return (
    <View style={[styles.container, { backgroundColor: colorMap[currentColor] }]}>
      <Text style={styles.colorTitle}>{currentColor.toUpperCase()}</Text>

      <View style={styles.cameraContainer}>
        <Camera
            style={styles.camera}
            device={device}
            isActive={isFocused} // Câmera ativa apenas quando a tela está visível
        />
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.scoreContainer}>{renderStars()}</View>

        <View style={styles.actionsContainer}>
          <Pressable onPress={() => router.replace('/')} style={styles.actionButton}>
            <Ionicons name="home" size={32} color="#005792" />
          </Pressable>
          <Pressable onPress={() => { setScore(0); }} style={styles.actionButton}>
            <Ionicons name="refresh" size={32} color="#005792" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 40,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#38B6FF'
  },
  permissionText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  permissionButton: {
    backgroundColor: '#FFC75F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  permissionButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  colorTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cameraContainer: {
    width: '85%',
    aspectRatio: 3 / 4,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'black',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  camera: {
    flex: 1,
  },
  bottomBar: {
    width: '100%',
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: '80%',
    marginBottom: 20,
    minHeight: 60,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '70%',
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});
