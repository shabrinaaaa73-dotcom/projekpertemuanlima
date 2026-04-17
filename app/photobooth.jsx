import React, { useState, useRef } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image,
  ScrollView, Alert, ActivityIndicator, ImageBackground, Dimensions
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';
import ViewShot, { captureRef } from 'react-native-view-shot';

const { width } = Dimensions.get('window');

export default function Photobooth() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  const [photos, setPhotos] = useState([null, null, null]); // Tetap 3 Slot
  const [activeSlot, setActiveSlot] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const cameraRef = useRef(null);
  const stripRef = useRef(null);

  // 🌸 DAFTAR FRAME LOKAL 🌸
  // textBg aku jadikan agak tebal warnanya biar teksnya sejelas di screenshot
  const frames = [
    { id: 'f1', name: '🌸 Frame 1', src: require('../assets/images/f1.jpg'), text: '#4A3428', textBg: 'rgba(253, 246, 240, 0.9)' },
    { id: 'f2', name: '🎀 Frame 2', src: require('../assets/images/f2.jpg'), text: '#FFFFFF', textBg: 'rgba(91, 49, 31, 0.59)' },
    { id: 'f3', name: '🦋 Frame 3', src: require('../assets/images/f3.jpg'), text: '#f5f5f5', textBg: 'rgba(9, 9, 9, 0.41)' },
    { id: 'f4', name: '✨ Frame 4', src: require('../assets/images/f4.jpg'), text: '#FFFFFF', textBg: 'rgba(6, 18, 61, 0.67)' },
    { id: 'f5', name: '🍒 Frame 5', src: require('../assets/images/f5.jpg'), text: '#FFFFFF', textBg: 'rgba(40, 40, 40, 0.36)' },
    { id: 'f6', name: '🎧 Frame 6', src: require('../assets/images/f6.jpg'), text: '#FFFFFF', textBg: 'rgba(244, 244, 244, 0.3)' },
    { id: 'f7', name: '🕸️ Frame 7', src: require('../assets/images/f7.jpg'), text: '#FFFFFF', textBg: 'rgba(90, 10, 20, 0.8)' },
    { id: 'f8', name: '🕷️ Frame 8', src: require('../assets/images/f8.jpg'), text: '#FFFFFF', textBg: 'rgba(50, 50, 50, 0.8)' },
  ];

  const [selectedFrame, setSelectedFrame] = useState(frames[0]);

  // ─── PERMISSION SCREEN ───
  if (!permission) return <View style={styles.container} />;
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.emojiLarge}>📸</Text>
        <Text style={styles.permissionTitle}>Izin Kamera Dulu! 🦋</Text>
        <TouchableOpacity style={styles.btnPrimary} onPress={requestPermission}>
          <Text style={styles.btnPrimaryText}>KASIH IZIN ✨</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ─── AMBIL FOTO ───
  const takePicture = async () => {
    if (!cameraRef.current) return;
    for (let i = 3; i >= 1; i--) {
      setCountdown(i);
      await new Promise(r => setTimeout(r, 900));
    }
    setCountdown(null);

    const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
    const newPhotos = [...photos];
    newPhotos[activeSlot] = photo.uri;
    setPhotos(newPhotos);
    setActiveSlot(null); 
  };

  // ─── SIMPAN KE GALERI ───
  const saveToGallery = async () => {
    const isComplete = photos.every(p => p !== null);
    if (!isComplete) {
      return Alert.alert("Wait! 🦋", "Isi ke-3 slot foto dulu ya biar estetik!");
    }

    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      const uri = await captureRef(stripRef, { format: 'jpg', quality: 1 });

      try {
        await MediaLibrary.requestPermissionsAsync(true);
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert("Slay! ✨", "Strip foto estetik kamu berhasil disimpan ke galeri! 🦋");
      } catch (err) {
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert("Slay! ✨", "Berhasil disimpan! 🦋");
      }
    } catch (error) {
      Alert.alert("Aduh 😬", "Masih gagal nyimpan nih. Coba restart aplikasinya ya.");
    } finally {
      setIsSaving(false);
    }
  };

  // ─── LAYAR KAMERA ───
  if (activeSlot !== null) {
    return (
      <View style={styles.cameraScreen}>
        <CameraView style={styles.camera} facing="front" ref={cameraRef}>
          <View style={styles.cameraOverlay}>
            {countdown !== null ? (
              <View style={styles.countdownCircle}>
                <Text style={styles.countdownText}>{countdown}</Text>
              </View>
            ) : null}
            <View style={styles.cameraInfo}>
              <Text style={styles.cameraSlotText}>📸 Slot {activeSlot + 1} dari 3</Text>
            </View>
            <View style={styles.cameraControls}>
              <TouchableOpacity onPress={() => setActiveSlot(null)} style={styles.btnCancel}>
                <Text style={styles.btnCancelText}>✕</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shutterBtn} onPress={takePicture}>
                <View style={styles.shutterInner} />
              </TouchableOpacity>
              <View style={{ width: 52 }} />
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  // ─── LAYAR UTAMA ───
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* PILIHAN FRAME */}
        <Text style={styles.sectionLabel}>Pilih Frame Favoritmu ✨</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.frameSelector}>
          {frames.map((frame) => (
            <TouchableOpacity
              key={frame.id}
              style={[
                styles.frameBox,
                selectedFrame.id === frame.id && styles.frameBoxActive
              ]}
              onPress={() => setSelectedFrame(frame)}
            >
              <Text style={[
                styles.frameBoxText, 
                selectedFrame.id === frame.id && styles.frameBoxTextActive
              ]}>
                {frame.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.hintText}>Tap kotak buat ambil foto 👇</Text>

        {/* 🌸 AREA STRIP FOTO (LEBIH LEBAR) 🌸 */}
        <ViewShot ref={stripRef} options={{ format: 'jpg', quality: 1 }}>
          <View collapsable={false} style={styles.stripWrapper}>
            
            <ImageBackground 
              source={selectedFrame.src} 
              style={styles.floralBackground}
              resizeMode="cover"
            >
              
              {/* JUDUL ESTETIK DI ATAS (Full Width seperti di screenshot) */}
              <View style={[styles.headerBanner, { backgroundColor: selectedFrame.textBg }]}>
                <Text style={[styles.titleText, { color: selectedFrame.text }]}>
                  SEVEN BUTTERFLIES STUDIO
                </Text>
                <Text style={[styles.dateText, { color: selectedFrame.text }]}>
                  {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                </Text>
              </View>

  
              {/* 3 KOTAK FOTO (TANPA ANGKA) */}
              <View style={styles.slotsContainer}>
                {photos.map((p, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.photoBox} 
                    onPress={() => setActiveSlot(index)}
                    activeOpacity={0.9}
                  >
                    {p ? (
                      <Image source={{ uri: p }} style={styles.imgResult} />
                    ) : (
                      <View style={styles.emptyBox}>
                        <Text style={styles.cloudEmoji}>☁️</Text>
                        <Text style={[styles.emptySlotText, { color: selectedFrame.textBg === 'rgba(0, 0, 0, 0.8)' || selectedFrame.textBg === 'rgba(20, 20, 20, 0.8)' ? '#666' : '#C4A49A' }]}>
                          Tap untuk Foto
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* TULISAN ESTETIK DI BAWAH (Full Width) */}
              <View style={[styles.footerBanner, { backgroundColor: selectedFrame.textBg }]}>
                <Text style={[styles.footerText, { color: selectedFrame.text }]}>
                  🦋 seven butterflies • capture your moment
                </Text>
              </View>

            </ImageBackground>
          </View>
        </ViewShot>

        {/* Tombol Simpan */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.btnSave, isSaving && styles.btnSaveDisabled]}
            onPress={saveToGallery}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.btnSaveText}>Download ke Galeri 📥</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnReset} onPress={() => setPhotos([null, null, null])}>
            <Text style={styles.btnResetText}>Ulangi Semua Foto</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6F0' }, 
  scrollContent: { alignItems: 'center', paddingBottom: 40 },
  topHeader: { width: '100%', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 5 },
  backBtn: { paddingVertical: 8, alignSelf: 'flex-start' },
  backText: { color: '#9E7060', fontWeight: '700', fontSize: 16 },
  
  sectionLabel: { alignSelf: 'flex-start', paddingHorizontal: 20, fontSize: 14, fontWeight: '800', color: '#4A3428', marginBottom: 12 },
  frameSelector: { paddingHorizontal: 20, marginBottom: 20, flexGrow: 0 },
  frameBox: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 12, borderWidth: 1.5, borderColor: '#F4C2AE', opacity: 0.7 },
  frameBoxActive: { backgroundColor: '#F4C2AE', opacity: 1, transform: [{ scale: 1.05 }], shadowColor: '#F4C2AE', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 6, elevation: 4 },
  frameBoxText: { color: '#9E7060', fontWeight: '700', fontSize: 13 },
  frameBoxTextActive: { color: '#4A3428', fontWeight: '900' },
  hintText: { color: '#9E7060', fontWeight: '600', marginBottom: 16 },

  // 🌸 STRIP FOTO LEBAR 🌸
  stripWrapper: {
    width: width * 0.88, // Dibuat lebar hampir full layar (88% layar)
    borderRadius: 0, // Dibuat kotak tegas sesuai screenshot
    overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.2, shadowRadius: 15, elevation: 10,
    backgroundColor: '#FFF'
  },
  floralBackground: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // 🌸 HEADER BANNER (Kotak tulisan atas) 🌸
  headerBanner: {
    width: '100%',
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 3, // Jarak huruf agak jauh biar elegan
    textTransform: 'uppercase', // Huruf besar semua
    marginBottom: 4,
  },
  dateText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    opacity: 0.8,
  },

  // 📸 KOTAK FOTO LEBAR & SPASI
  slotsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16, // Jarak/Spasi manis antar foto
    paddingHorizontal: 16,
  },
  photoBox: {
    width: '91%',  
    height: 180, // Dibuat landscape lebar
    borderRadius: 25, // 👈 Lengkungan estetik
    backgroundColor: 'rgba(255,255,255,0.7)', 
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imgResult: { width: '100%', height: '100%', resizeMode: 'cover',transform: [{ scaleX: -1 }] }, 
  
 

  // 🌸 FOOTER BANNER (Kotak tulisan bawah) 🌸
  footerBanner: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'lowercase', // Huruf kecil estetik
  },

  // Tombol Bawah
  actionContainer: { marginTop: 30, width: '100%', alignItems: 'center' },
  btnSave: { backgroundColor: '#4A3428', paddingVertical: 18, borderRadius: 99, width: '75%', alignItems: 'center', shadowColor: '#4A3428', shadowOpacity: 0.3, shadowRadius: 10, elevation: 6 },
  btnSaveDisabled: { opacity: 0.6 },
  btnSaveText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  btnReset: { marginTop: 20 },
  btnResetText: { color: '#9E7060', fontWeight: '700', fontSize: 14, textDecorationLine: 'underline' },

  // Layar Kamera & Permission
  cameraScreen: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  cameraOverlay: { flex: 1, justifyContent: 'space-between', padding: 24 },
  countdownCircle: { position: 'absolute', top: '40%', alignSelf: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  countdownText: { fontSize: 54, fontWeight: '900', color: '#FFF' },
  cameraInfo: { alignItems: 'center', marginTop: 30 },
  cameraSlotText: { color: '#FFF', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 99, fontWeight: '700' },
  cameraControls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20 },
  btnCancel: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  btnCancelText: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  shutterBtn: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FFF' },
  shutterInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF' },

  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF0F5' },
  permissionTitle: { fontSize: 22, fontWeight: '900', color: '#4A3428', marginBottom: 20 },
  emojiLarge: { fontSize: 60, marginBottom: 10 },
  btnPrimary: { backgroundColor: '#4A3428', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 99 },
  btnPrimaryText: { color: '#FFF', fontWeight: '800' }
});