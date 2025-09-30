import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DifficultyScreen() {
  const router = useRouter();

  // Função que será chamada ao selecionar uma dificuldade.
  // Ela navega para a tela do jogo passando a dificuldade como parâmetro.
  const handleSelectDifficulty = (level: 'facil' | 'medio' | 'dificil') => {
    // A tela '/game' ainda não existe, mas estamos preparando a navegação.
    router.push({ pathname: '/game', params: { difficulty: level } });
  };

  return (
    <View style={styles.container}>
      {/* Botão para voltar à tela anterior */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back-circle" size={48} color="white" />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>ESCOLHA A DIFICULDADE</Text>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => handleSelectDifficulty('facil')}>
            <Text style={styles.buttonText}>Fácil</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => handleSelectDifficulty('medio')}>
            <Text style={styles.buttonText}>Médio</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => handleSelectDifficulty('dificil')}>
            <Text style={styles.buttonText}>Difícil</Text>
          </Pressable>
        </View>
      </View>

      <Image
        source={require('../assets/images/oli-mascot.png')}
        style={styles.mascotImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38B6FF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 50,
    maxWidth: '60%'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '85%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    backgroundColor: '#FFC75F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  mascotImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});