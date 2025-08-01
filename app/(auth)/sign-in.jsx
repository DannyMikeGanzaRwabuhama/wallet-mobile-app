import {useSignIn} from '@clerk/clerk-expo'
import {Link, useRouter} from 'expo-router'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {COLORS} from "../../constants/colors.js";
import {styles} from "../../assets/styles/auth.styles.js";
import {Image} from "expo-image";
import {Ionicons} from "@expo/vector-icons";

export default function Page() {
    const {signIn, setActive, isLoaded} = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')

    // Handle the submission of the sign-in form
    const onSignInPress = async () => {
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({session: signInAttempt.createdSessionId})
                router.replace('/')
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            setError(err.message);
        }
    }

    return (
            <View style={styles.container}>
                <Image source={require('../../assets/images/revenue-i4.png')} style={styles.illustration} contentFit={"contain"}/>
                <Text style={styles.title}>Welcome Back</Text>
                {error && (
                    <View style={styles.errorBox}>
                        <Ionicons name={"alert-circle"} size={20} color={COLORS.expense}/>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={() => setError('')}>
                            <Ionicons name={"close"} size={20} color={COLORS.textLight}/>
                        </TouchableOpacity>
                    </View>
                )}
                <TextInput
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter email"
                    style={[styles.verificationInput, error && styles.errorInput]}
                    onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                />
                <TextInput
                    value={password}
                    placeholder="Enter password"
                    secureTextEntry={true}
                    style={[styles.verificationInput, error && styles.errorInput]}
                    onChangeText={(password) => setPassword(password)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={onSignInPress}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Don't yet have an account?</Text>
                    <Link href="/sign-up">
                        <Text style={styles.linkText}>Sign up</Text>
                    </Link>
                </View>
            </View>
    )
}