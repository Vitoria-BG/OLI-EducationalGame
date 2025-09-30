import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        {/* A opção screenOptions aplica um estilo padrão para TODAS as telas
          dentro deste navegador. Aqui, estamos removendo o cabeçalho de todas as telas.
        */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="difficulty" options={{ headerShown: false }} />
        <Stack.Screen name="tutorial" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="game" options={{ headerShown: false }} /> 
      </Stack>
    </>
  );
}
