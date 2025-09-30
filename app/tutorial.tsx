import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TutorialScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Botão para voltar à tela anterior */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back-circle" size={48} color="white" />
      </Pressable>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Primeiro Bloco: Como Jogar */}
        <Text style={styles.mainTitle}>COMO JOGAR</Text>
        <View style={styles.card}>
          <Text style={[styles.cardSubtitle, styles.objectiveColor]}>Objetivo</Text>
          <Text style={styles.cardBodyText}>
            Mostrar à câmera um objeto da mesma cor que aparece na tela.
          </Text>
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.cardBodyText}>
              Uma nova cor só é pedida após acertar a atual.
            </Text>
          </View>
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.cardBodyText}>
              O jogo termina quando conseguir 5 estrelas.
            </Text>
          </View>
        </View>

        {/* Segundo Bloco: Modos de Jogo */}
        <Text style={styles.mainTitle}>MODOS DE JOGO</Text>
        <View style={styles.card}>
          <View style={styles.difficultySection}>
            <Text style={[styles.cardSubtitle, styles.difficultyColor]}>FÁCIL</Text>
            <Text style={styles.cardBodyText}>
              Cores primárias e secundárias, sem tonalidades.
            </Text>
          </View>
          <View style={styles.difficultySection}>
            <Text style={[styles.cardSubtitle, styles.difficultyColor]}>MÉDIO</Text>
            <Text style={styles.cardBodyText}>
              Cores primárias e secundárias, com tonalidades.
            </Text>
          </View>
          <View style={styles.difficultySection}>
            <Text style={[styles.cardSubtitle, styles.difficultyColor]}>DIFÍCIL</Text>
            <Text style={styles.cardBodyText}>
              Cores primárias, secundárias e terciárias.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38B6FF',
    paddingTop: 60, // Espaço para o botão de voltar
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    marginBottom: 20,
    // Sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardSubtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  objectiveColor: {
    color: '#FF9A00', // Laranja/Tomate
  },
  difficultyColor: {
    color: '#005792', // Azul escuro
  },
  cardBodyText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    flexShrink: 1, // Permite que o texto quebre a linha dentro do flex
  },
  bulletPointContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  bulletPoint: {
    fontSize: 18,
    marginRight: 10,
    color: '#333333',
  },
  difficultySection: {
    marginBottom: 20,
  },
});