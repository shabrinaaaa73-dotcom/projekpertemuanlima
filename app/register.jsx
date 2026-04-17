import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView,
  StatusBar, StyleSheet, Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, View
} from "react-native";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !phone || !password || !confirmPassword)
      return Alert.alert("Wait! 🦋", "Lengkapi semua data ya.");
    if (password !== confirmPassword)
      return Alert.alert("Oops! 🔐", "Password gak cocok, cek lagi bestie.");
    if (phone.length < 10)
      return Alert.alert("Phone! 📱", "Minimal 10 digit angka.");

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Welcome! 🎉", `Akun Seven Butterflies untuk ${name} sudah aktif!`);
      router.replace({ pathname: "/home", params: { userName: name } });
    }, 800);
  };

  const fields = [
    { key: "name", placeholder: "Nama Lengkap", value: name, setter: setName, icon: "👤", keyboard: "default", capitalize: "words" },
    { key: "email", placeholder: "Email Address", value: email, setter: setEmail, icon: "📧", keyboard: "email-address", capitalize: "none" },
    { key: "phone", placeholder: "Nomor HP (min. 10 digit)", value: phone, setter: setPhone, icon: "📱", keyboard: "numeric", capitalize: "none" },
    { key: "password", placeholder: "Password", value: password, setter: setPassword, icon: "🔐", secure: true },
    { key: "confirm", placeholder: "Konfirmasi Password", value: confirmPassword, setter: setConfirmPassword, icon: "🔑", secure: true },
  ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F0" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          <View style={styles.blobTop} />
          <View style={styles.blobRight} />

          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.replace("/")}>
              <Text style={styles.backText}>← Kembali</Text>
            </TouchableOpacity>
            <View style={styles.logoWrap}>
              <Text style={styles.logoEmoji}>🦋</Text>
            </View>
            <Text style={styles.brandTitle}>Gabung Studio</Text>
            <Text style={styles.brandSub}>Buat akun Seven Butterflies kamu ✨</Text>
          </View>

          <View style={styles.card}>
            {fields.map((f) => (
              <View key={f.key} style={styles.fieldWrap}>
                <Text style={styles.label}>{f.icon}  {f.placeholder}</Text>
                <TextInput
                  style={[styles.input, focusedInput === f.key && styles.inputFocused]}
                  placeholder={f.placeholder}
                  placeholderTextColor="#C4A49A"
                  value={f.value}
                  onChangeText={f.setter}
                  keyboardType={f.keyboard || "default"}
                  autoCapitalize={f.capitalize || "none"}
                  secureTextEntry={f.secure || false}
                  onFocus={() => setFocusedInput(f.key)}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            ))}

            <TouchableOpacity
              style={[styles.btnRegister, isLoading && styles.btnLoading]}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>
                {isLoading ? "Mendaftar..." : "Join Studio ✨"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace("/")} style={styles.btnLogin}>
              <Text style={styles.btnLoginText}>
                Sudah punya akun? <Text style={styles.textHighlight}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDF6F0" },
  scroll: { flexGrow: 1, padding: 24, paddingBottom: 48 },

  blobTop: {
    position: "absolute", top: -60, right: -60,
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: "#FDDDD0", opacity: 0.5,
  },
  blobRight: {
    position: "absolute", top: 200, left: -80,
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: "#F4C2AE", opacity: 0.25,
  },

  header: { alignItems: "center", marginTop: 20, marginBottom: 28 },
  backBtn: { alignSelf: "flex-start", marginBottom: 20, paddingVertical: 6, paddingHorizontal: 2 },
  backText: { color: "#9E7060", fontWeight: "700", fontSize: 14 },
  logoWrap: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: "#FFF", justifyContent: "center", alignItems: "center",
    borderWidth: 2, borderColor: "#F4C2AE",
    shadowColor: "#F4C2AE", shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4, shadowRadius: 16, elevation: 8, marginBottom: 12,
  },
  logoEmoji: { fontSize: 32 },
  brandTitle: { fontSize: 26, fontWeight: "900", color: "#4A3428", letterSpacing: -0.5 },
  brandSub: { fontSize: 13, color: "#9E7060", marginTop: 4, textAlign: "center" },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 32, padding: 28,
    borderWidth: 1.5, borderColor: "#F4C2AE",
    shadowColor: "#E8A898",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15, shadowRadius: 24, elevation: 6,
  },

  fieldWrap: { marginBottom: 14 },
  label: { fontSize: 11, fontWeight: "700", color: "#7A5548", marginBottom: 7, letterSpacing: 0.5 },
  input: {
    backgroundColor: "#FDF6F0", borderWidth: 1.5, borderColor: "#EDD5C8",
    borderRadius: 16, paddingHorizontal: 18, paddingVertical: 13,
    color: "#4A3428", fontSize: 15,
  },
  inputFocused: {
    borderColor: "#E88E70", backgroundColor: "#FFF",
    shadowColor: "#E88E70", shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 2,
  },

  btnRegister: {
    backgroundColor: "#4A3428", paddingVertical: 17, borderRadius: 99,
    alignItems: "center", marginTop: 10,
    shadowColor: "#4A3428", shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
  },
  btnLoading: { opacity: 0.7 },
  btnText: { color: "#FFF", fontWeight: "800", fontSize: 16, letterSpacing: 0.5 },

  btnLogin: { paddingVertical: 18, alignItems: "center" },
  btnLoginText: { color: "#9E7060", fontSize: 14 },
  textHighlight: { color: "#4A3428", fontWeight: "800", textDecorationLine: "underline" },
});