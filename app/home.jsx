import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();
  const { userName } = useLocalSearchParams();
  const initial = (userName || "S").charAt(0).toUpperCase();

  const features = [
    { icon: "🎞️", title: "4 Slot Foto", desc: "Ambil 4 foto dalam satu strip estetik" },
    { icon: "🖼️", title: "4 Pilihan Frame", desc: "Butterfly, Urban, Vintage, LANY" },
    { icon: "💾", title: "Simpan ke Galeri", desc: "Download strip foto langsung ke HP kamu" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F0" />

      {/* Background blobs */}
      <View style={styles.blobTR} />
      <View style={styles.blobBL} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Top Bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Halo, selamat datang 👋</Text>
            <Text style={styles.username}>{userName || "Sweetie"} 🦋</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerBadge}>
            <Text style={styles.bannerBadgeText}>✨ Seven Butterflies Studio</Text>
          </View>
          <Text style={styles.bannerTitle}>Capture Your{"\n"}Purest Moments.</Text>
          <Text style={styles.bannerSub}>Foto strip estetik dalam genggamanmu 📸</Text>
          <TouchableOpacity
            style={styles.btnAction}
            onPress={() => router.push("/photobooth")}
            activeOpacity={0.85}
          >
            <Text style={styles.btnActionText}>AYUK FOTO 📸</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <Text style={styles.sectionTitle}>Kenapa Seven Butterflies? ✨</Text>
        <View style={styles.featureGrid}>
          {features.map((f, i) => (
            <View key={i} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>

        {/* Info card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📝 Cara Pakai</Text>
          <View style={styles.stepRow}><View style={styles.stepNum}><Text style={styles.stepNumText}>1</Text></View><Text style={styles.infoText}>Pilih frame estetik favoritmu</Text></View>
          <View style={styles.stepRow}><View style={styles.stepNum}><Text style={styles.stepNumText}>2</Text></View><Text style={styles.infoText}>Tap tiap slot & ambil foto selfie</Text></View>
          <View style={styles.stepRow}><View style={styles.stepNum}><Text style={styles.stepNumText}>3</Text></View><Text style={styles.infoText}>Download hasil strip ke galeri ✨</Text></View>
        </View>

        <TouchableOpacity style={styles.btnLogout} onPress={() => router.replace("/")}>
          <Text style={styles.btnLogoutText}>Log out dari Studio</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDF6F0" },
  scroll: { padding: 24, paddingBottom: 40 },

  blobTR: {
    position: "absolute", top: -60, right: -60,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: "#FDDDD0", opacity: 0.45,
  },
  blobBL: {
    position: "absolute", bottom: 100, left: -80,
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: "#F4C2AE", opacity: 0.2,
  },

  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 28, marginTop: 16 },
  greeting: { fontSize: 13, color: "#9E7060", fontWeight: "500" },
  username: { fontSize: 24, fontWeight: "900", color: "#4A3428", letterSpacing: -0.5 },
  avatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: "#F4C2AE", justifyContent: "center", alignItems: "center",
    borderWidth: 2.5, borderColor: "#FFF",
    shadowColor: "#F4A090", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 8, elevation: 4,
  },
  avatarText: { color: "#FFF", fontWeight: "900", fontSize: 20 },

  banner: {
    backgroundColor: "#4A3428", borderRadius: 28, padding: 26, marginBottom: 28,
    shadowColor: "#4A3428", shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25, shadowRadius: 20, elevation: 8,
  },
  bannerBadge: {
    backgroundColor: "rgba(255,255,255,0.15)", alignSelf: "flex-start",
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: 99, marginBottom: 14,
  },
  bannerBadgeText: { color: "#FDDDD0", fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
  bannerTitle: { fontSize: 30, fontWeight: "900", color: "#FFF", marginBottom: 8, lineHeight: 36 },
  bannerSub: { fontSize: 13, color: "#D4A898", marginBottom: 22 },
  btnAction: {
    backgroundColor: "#F4C2AE", paddingVertical: 15, borderRadius: 99, alignItems: "center",
    shadowColor: "#F4A090", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 4,
  },
  btnActionText: { color: "#4A3428", fontWeight: "900", fontSize: 15, letterSpacing: 1 },

  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#4A3428", marginBottom: 14 },
  featureGrid: { flexDirection: "row", gap: 10, marginBottom: 20 },
  featureCard: {
    flex: 1, backgroundColor: "#FFF", borderRadius: 20, padding: 16,
    borderWidth: 1.5, borderColor: "#EDD5C8", alignItems: "center",
    shadowColor: "#E8C4B0", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 8, elevation: 2,
  },
  featureIcon: { fontSize: 26, marginBottom: 8 },
  featureTitle: { fontSize: 12, fontWeight: "800", color: "#4A3428", textAlign: "center", marginBottom: 4 },
  featureDesc: { fontSize: 10, color: "#9E7060", textAlign: "center", lineHeight: 14 },

  infoCard: {
    backgroundColor: "#FFF", borderRadius: 24, padding: 22,
    borderWidth: 1.5, borderColor: "#EDD5C8",
    borderStyle: "dashed", marginBottom: 28,
  },
  infoTitle: { fontWeight: "800", color: "#4A3428", marginBottom: 16, fontSize: 15 },
  stepRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  stepNum: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: "#F4C2AE", justifyContent: "center", alignItems: "center",
    marginRight: 12,
  },
  stepNumText: { color: "#FFF", fontWeight: "900", fontSize: 13 },
  infoText: { color: "#6D4A3C", fontSize: 14, flex: 1 },

  btnLogout: {
    paddingVertical: 14, borderRadius: 99, borderWidth: 1.5,
    borderColor: "#EDD5C8", alignItems: "center",
  },
  btnLogoutText: { color: "#BC9A8C", fontWeight: "700", fontSize: 14 },
});