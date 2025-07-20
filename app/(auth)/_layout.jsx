import {Redirect, Slot} from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";

export default function AuthRoutesLayout() {
    const { isSignedIn } = useAuth()

    if (isSignedIn) {
        return <Redirect href={'/'} />
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ 
                flex: 1, 
                display: "flex", 
                justifyContent: 'center', 
                alignItems: 'center',
                width: '100%'
            }}
        >
            <ScrollView 
                keyboardShouldPersistTaps={"handled"}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    padding: 20
                }}
            >
                <Slot/>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}