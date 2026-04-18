# 🦋 Seven Butterflies Studio

Aplikasi Photo Booth estetik berbasis React Native (Expo) yang memungkinkan pengguna untuk mendaftar akun, masuk ke dashboard, dan mengambil atau memproses strip foto ala studio.

## 📋 Requirement Fitur
Aplikasi ini telah memenuhi seluruh kriteria yang disyaratkan:
- **Screen 1 (Login):** Form input Email & Password dilengkapi tombol "Daftar sekarang" yang mengarah ke halaman registrasi.
- **Screen 2 (Register):** Form pendaftaran yang mencakup Nama Lengkap, Email Address, Nomor HP, Password, dan Konfirmasi Password.
- **Screen 3 (Home):** Menampilkan Welcome Message dinamis sesuai nama user yang didaftarkan.

## 🛡️ Security & Logic
- **Validasi Email:** Menggunakan *Regular Expression* (RegEx) untuk memastikan format email valid.
- **Validasi Phone:** Memastikan input hanya berupa angka numeric dan minimal 10 digit.
- **Match Check:** Validasi ketat untuk memastikan *Password* dan *Confirm Password* sama persis.
- **Handle Keyboard:** Menggunakan `KeyboardAvoidingView` dan `ScrollView` agar keyboard tidak menutupi form dan tombol Submit/Register.

## 📸 Capture Running Program
Berikut adalah cuplikan / demo dari aplikasi saat dijalankan:

![Demo Aplikasi](<img width="709" height="1600" alt="home" src="https://github.com/user-attachments/assets/3fff66bb-b922-4bb7-a8aa-b0300730fd78" />
<img width="709" height="1600" alt="Register" src="https://github.com/user-attachments/assets/a05bf7b1-7c40-4d6a-bd7c-b5f69efdaafc" />
<img width="709" height="1600" alt="Login" src="https://github.com/user-attachments/assets/ed13ec64-136c-41d1-b581-e4a7258310df" />
)

## 🚀 Coba Langsung di Expo Snack
Aplikasi ini dapat diuji coba secara langsung tanpa perlu melakukan proses instalasi lokal. 

👉 **[Klik di sini untuk membuka Expo Snack](https://snack.expo.dev/@shb73/mission5photobooth)**

**Langkah pengujian:**
1. Buka link Expo Snack di atas.
2. Lakukan pendaftaran akun baru di layar Register.
3. Login menggunakan Email dan Password yang baru saja didaftarkan.
4. Anda akan diarahkan ke Home screen dan dapat mengakses fitur Studio Photobooth!

---
Shabrina Yuspiana
 NIM:243303621210
