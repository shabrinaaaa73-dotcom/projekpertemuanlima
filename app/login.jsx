import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView,
  StatusBar, StyleSheet, Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, View, Animated
} from "react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      return Alert.alert("Wait, sweetie! 🦋", "Email dan password-nya diisi dulu yuk.");
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (email === "admin@mail.com" && password === "123456") {
        router.replace({ pathname: "/home", params: { userName: "Admin" } });
      } else {
        Alert.alert("Duh! 😬", "Email atau password salah, bestie!");
      }
    }, 800);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F0" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Decorative blobs */}
          <View style={styles.blobTop} />
          <View style={styles.blobBottom} />

          <View style={styles.header}>
            <View style={styles.logoWrap}>
              <Text style={styles.logoEmoji}>🦋</Text>
            </View>
            <Text style={styles.brandTitle}>Seven Butterflies</Text>
            <Text style={styles.brandSub}>Photo Studio</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Masuk ke Studio</Text>
            <Text style={styles.cardSub}>Halo bestie! Login dulu yuk 💕</Text>

            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
                placeholder="admin@mail.com"
                placeholderTextColor="#C4A49A"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[styles.input, focusedInput === 'password' && styles.inputFocused]}
                placeholder="••••••••"
                placeholderTextColor="#C4A49A"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <TouchableOpacity
              style={[styles.btnLogin, isLoading && styles.btnLoading]}
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={isLoading}
            >
              <Text style={styles.btnLoginText}>
                {isLoading ? "Loading..." : "Sign In ✨"}
              </Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>atau</Text>
              <View style={styles.dividerLine} />
            </View>

            <Link href="/register" asChild>
              <TouchableOpacity style={styles.btnRegister}>
                <Text style={styles.btnRegisterText}>
                  Belum punya akun?{" "}
                  <Text style={styles.textHighlight}>Daftar sekarang</Text>
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <Text style={styles.hint}>Demo: admin@mail.com / 123456</Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDF6F0" },
  scroll: { flexGrow: 1, padding: 24, justifyContent: "center", minHeight: "100%" },

  blobTop: {
    position: "absolute", top: -80, right: -60,
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: "#FDDDD0", opacity: 0.5,
  },
  blobBottom: {
    position: "absolute", bottom: -60, left: -80,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: "#F4C2AE", opacity: 0.3,
  },

  header: { alignItems: "center", marginBottom: 32 },
  logoWrap: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: "#FFF", justifyContent: "center", alignItems: "center",
    borderWidth: 2, borderColor: "#F4C2AE",
    shadowColor: "#F4C2AE", shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4, shadowRadius: 16, elevation: 8,
    marginBottom: 14,
  },
  logoEmoji: { fontSize: 36 },
  brandTitle: { fontSize: 28, fontWeight: "900", color: "#4A3428", letterSpacing: -0.5 },
  brandSub: { fontSize: 13, color: "#9E7060", fontWeight: "600", letterSpacing: 2, textTransform: "uppercase", marginTop: 2 },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 32, padding: 28,
    borderWidth: 1.5, borderColor: "#F4C2AE",
    shadowColor: "#E8A898",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15, shadowRadius: 24, elevation: 6,
  },
  cardTitle: { fontSize: 22, fontWeight: "800", color: "#4A3428", marginBottom: 4 },
  cardSub: { fontSize: 14, color: "#9E7060", marginBottom: 24 },

  fieldWrap: { marginBottom: 16 },
  label: { fontSize: 11, fontWeight: "700", color: "#7A5548", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" },
  input: {
    backgroundColor: "#FDF6F0", borderWidth: 1.5, borderColor: "#EDD5C8",
    borderRadius: 16, paddingHorizontal: 18, paddingVertical: 14,
    color: "#4A3428", fontSize: 15,
  },
  inputFocused: { borderColor: "#E88E70", backgroundColor: "#FFF", shadowColor: "#E88E70", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 2 },

  btnLogin: {
    backgroundColor: "#4A3428", paddingVertical: 17, borderRadius: 99,
    alignItems: "center", marginTop: 8,
    shadowColor: "#4A3428", shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
  },
  btnLoading: { opacity: 0.7 },
  btnLoginText: { color: "#FFF", fontWeight: "800", fontSize: 16, letterSpacing: 0.5 },

  divider: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#EDD5C8" },
  dividerText: { marginHorizontal: 12, fontSize: 12, color: "#C4A49A", fontWeight: "600" },

  btnRegister: { alignItems: "center", paddingVertical: 4 },
  btnRegisterText: { color: "#9E7060", fontSize: 14 },
  textHighlight: { color: "#4A3428", fontWeight: "800", textDecorationLine: "underline" },

  hint: { textAlign: "center", color: "#C4A49A", fontSize: 12, marginTop: 24 },
});