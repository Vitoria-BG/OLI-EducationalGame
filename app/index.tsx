import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Para o ícone de configurações

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Botão de Configurações no topo */}
      <Link href="/settings" asChild>
        <Pressable style={styles.settingsButton}>
          <View style={styles.settingsIconBackground}>
            <Ionicons name="settings-sharp" size={28} color="#005792" />
          </View>
        </Pressable>
      </Link>

      <View style={styles.mainContent}>
        <Text style={styles.title}>Olá, eu sou o Oli!</Text>
        
        <View style={styles.mascotContainer}>
          <Image
            source={require('../assets/images/oli-mascot.png')}
            style={styles.mascotImage}
          />
        </View>
      </View>

      <View style={styles.menu}>
        <Link href="/difficulty" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Jogar</Text>
          </Pressable>
        </Link>

        <Link href="/tutorial" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Tutorial</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38B6FF', // Fundo azul claro sólido
    alignItems: 'center',
    justifyContent: 'space-between', // Alinha conteúdo principal no centro e menu em baixo
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  settingsButton: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  settingsIconBackground: {
    backgroundColor: '#FFD700', // Fundo amarelo para o ícone
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000', // Texto preto
    marginBottom: 30,
    textAlign: 'center',
  },
  mascotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Necessário para posicionar a tag de nome
  },
  mascotImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  menu: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '85%',
    paddingVertical: 18,
    borderRadius: 30, // Mais arredondado
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#FFC75F', // Amarelo/Laranja dos botões
    // Sombra para dar profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#000000', // Texto preto
    fontSize: 22,
    fontWeight: 'bold',
  },
});
