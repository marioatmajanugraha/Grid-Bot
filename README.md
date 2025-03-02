# 🪂 Airdrop 888 - Auto Ping Grid

🚀 **Script ini membantu Anda menghubungkan akun Grid ke WebSocket secara otomatis dengan dukungan login Playwright dan token verifikasi!**

## 📂 Fitur Utama
- 🔑 **Login Otomatis:** Gunakan Playwright untuk otomatis login ke Grid.
- 🔒 **Token Handling:** Ambil dan verifikasi token dari cookie.
- 🛜 **WebSocket Connection:** Terhubung ke WebSocket dengan UUID akun.
- 🔄 **Auto Reconnect:** Jika koneksi putus, script akan reconnect otomatis.
- 📊 **Earnings Check:** Tampilkan penghasilan harian langsung dari API.
- 🧹 **Clean Logs:** Log terminal yang bersih tanpa bocor data sensitif.

- ## New Update
- Support Multi Account

---
## Cara dapat UUID via Extension
![how to get UUID](https://github.com/user-attachments/assets/2cb45c3c-da93-4e03-bf35-f14e887859c6)
---

## 🛠️ Instalasi

1. **Clone repo ini:**
```bash
git clone https://github.com/marioatmajanugraha/Grid-Bot.git
cd Grid-Bot
```

2. **Install dependensi:**
```bash
npm install axios chalk@4 cfonts ws playwright
```

3. **Buat file akun:** `accounts.txt`
```
email@example.com|password123|your-uuid-here
```

> 📘 **Catatan:** UUID bisa didapatkan setelah login ke dashboard Grid.

4. **Jalankan script:**
```bash
node index.js
```

---

## 🚀 Cara Kerja

- Script akan login ke Grid dan ambil token.
- Verifikasi token via API earnings.
- Menghubungkan ke WebSocket dengan format:
```
ws://ws.getgrid.ai:8080/becl/{uuid}/{token}
```
- Kirim ping setiap 30 detik.
- Auto reconnect jika koneksi terputus.

---

## 🔔 Log Terminal (Contoh)
```
🚀 Script coded by - @balveerxyz || Auto Ping Grid
🔑 Login untuk akun: email@example.com
🔓 Token berhasil didapatkan!
🔍 Verifikasi token...
✅ Token valid!
📊 Earnings Hari Ini: 3411.9414
🚫 Proxy tidak digunakan, langsung terhubung...
🔗 Menghubungkan ke WebSocket dengan UUID: 3cbdd06e-461a-44ef-89...
✅ WebSocket terhubung!
🔔 Ping ke server...
```

---

## 💡 Tips
- **Gunakan headless mode** untuk jalankan script tanpa membuka browser.
- **Atur cron job** untuk otomatis jalanin script.

## 🤝 Kontribusi
Pull request dan masukan sangat diterima! 🚀

## 📜 Lisensi
MIT License

---

✨ Keep Grinding, Keep Earning! ✨

🔥 Airdrop 888 | Grind. Earn. Repeat. 🔥

