import {Stack} from "expo-router";

export default function App() {
    return (
        <Stack>
        <Stack.Screen name="index"  />
        <Stack.Screen name="Aplay" />
        <Stack.Screen name="{Tabs}/Tabs" />
        </Stack>
    );
    }