import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor, // 1. Import the frame processor hook
} from 'react-native-vision-camera';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { runOnJS } from 'react-native-reanimated'; // 2. Import runOnJS
import { detectColor } from 'react-native-vision-camera-colordetector'; // 3. Import your custom plugin

// Mapeamento de cores para o fundo da tela
const colorMap: { [key: string]: string } = {
  Azul: '#38B6FF',
  Verde: '#28A745',
  Rosa: '#E83E8C',
  Vermelho: '#DC3545',
  Amarelo: '#FFC107',
};

const gameColors = Object.keys(colorMap); // List of colors for the game

// Helper function to map RGB values to a color name
// Note: These thresholds may need tweaking based on lighting conditions!
const mapRgbToColorName = (r: number, g: number, b: number): string => {
  if (r > 150 && g < 100 && b < 100) return 'Vermelho';
  if (g > 140 && r < 100 && b < 100) return 'Verde';
  if (b > 150 && r < 100 && g < 100) return 'Azul';
  if (r > 180 && g > 150 && b < 100) return 'Amarelo';
  if (r > 180 && g < 120 && b > 140) return 'Rosa';
  return 'unknown';
};

export default function GameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isFocused = useIsFocused();

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const [currentColor, setCurrentColor] = useState('Azul');
  const [score, setScore] = useState(0);

  // 4. Function to handle the game logic when a color is correctly identified
  const handleCorrectColor = () => {
    // If the user is about to get the last star, they win
    if (score >= 4) {
      setScore(5);
      // You could navigate to a "You Win" screen here
      // router.replace('/win-screen');
      return;
    }

    // Update score
    const newScore = score + 1;
    setScore(newScore);

    // Get a new color that is different from the current one
    const availableColors = gameColors.filter(c => c !== currentColor);
    const nextColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    setCurrentColor(nextColor);
  };

  // 5. Create the Frame Processor function
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'; // This directive is essential
    const detected = detectColor(frame);

    if (detected) {
      const colorName = mapRgbToColorName(detected.r, detected.g, detected.b);
      if (colorName.toLowerCase() === currentColor.toLowerCase()) {
        // We can't update React state directly from a worklet.
        // We must use runOnJS to call our state update function.
        runOnJS(handleCorrectColor)();
      }
    }
  }, [currentColor, score]); // Dependencies for the hook


  useEffect(() => {
    const difficulty = params.difficulty;
    console.log('Dificuldade selecionada:', difficulty);
  }, [params.difficulty]);

 // If we don't have permission, show the screen to request it
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

  // If there is no camera device available
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

  // Game Win UI
  if (score === 5) {
    return (
      <View style={[styles.container, { backgroundColor: '#4CAF50' }]}>
        <Text style={styles.colorTitle}>VOCÊ VENCEU!</Text>
        <View style={styles.scoreContainer}>{renderStars()}</View>
        <Pressable
          onPress={() => {
            setScore(0);
            setCurrentColor('Azul');
          }}
          style={styles.permissionButton}
        >
          <Text style={styles.permissionButtonText}>Jogar Novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colorMap[currentColor] }]}>
      <Text style={styles.colorTitle}>{currentColor.toUpperCase()}</Text>

      <View style={styles.cameraContainer}>
        {/* We add the frameProcessor prop to the Camera component */}
        <Camera
          style={styles.camera}
          device={device}
          isActive={isFocused}
          frameProcessor={frameProcessor} // 6. Assign the frame processor
        />
        {/* Add a simple aiming reticle for the user */}
        <View style={styles.reticle} />
      </View>

      <View style={styles.bottomBar}>
    <View style={styles.scoreContainer}>{renderStars()}</View>

    <View style={styles.actionsContainer}>
      <Pressable onPress={() => router.replace('/')} style={styles.actionButton}>
        <Ionicons name="home" size={32} color="#005792" />
      </Pressable>
      <Pressable onPress={() => { setScore(0); setCurrentColor('Azul'); }} style={styles.actionButton}>
        <Ionicons name="refresh" size={32} color="#005792" />
      </Pressable>
    </View>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  reticle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
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
