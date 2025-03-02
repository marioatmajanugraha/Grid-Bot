// Import module yang dibutuhkan
const { chromium } = require('playwright');
const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const CFonts = require('cfonts');
const WebSocket = require('ws');

// Tampilkan banner
CFonts.say('Airdrop 888', {
  font: 'block',
  align: 'center',
  colors: ['cyan', 'blue'],
});

console.log(chalk.green('🚀 Script coded by - @balveerxyz || Auto Ping Grid'));

// Fungsi untuk login dan ambil token via Playwright
const getTokenFromBrowser = async (email, password) => {
  try {
    console.log(chalk.yellow(`🔑 Login untuk akun: ${email}`));
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://sso.getgrid.ai/registration');
    await page.click('a[href*="login-actions/authenticate"]');

    await page.fill('#email', email);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(5000);

    const cookies = await context.cookies();
    const oauthCookie = cookies.find((cookie) => cookie.name === '_oauth2_proxy');

    await browser.close();

    if (oauthCookie) {
      console.log(chalk.green('🔓 Token berhasil didapatkan!'));
      return oauthCookie.value;
    } else {
      console.log(chalk.red('❌ Token tidak ditemukan!'));
      process.exit(1);
    }
  } catch (err) {
    console.log(chalk.red('❌ Kesalahan saat login!'));
    process.exit(1);
  }
};

const verifyToken = async (token) => {
  try {
    console.log(chalk.yellow('🔍 Verifikasi token...'));
    const response = await axios.get('https://api.getgrid.ai/dashboard/earnings', {
      headers: {
        'Cookie': `_oauth2_proxy=${token}`,
      },
    });

    console.log(chalk.green('✅ Token valid!'));
    console.log(`📊 Earnings Hari Ini: ${response.data.today_earnings || 'Tidak tersedia'}`);
    return true;
  } catch {
    console.log(chalk.red('❌ Token tidak valid atau kadaluarsa'));
    return false;
  }
};

const accounts = fs.readFileSync('accounts.txt', 'utf-8').split('\n').filter(Boolean);
if (accounts.length === 0) {
  console.log(chalk.red('❌ Tidak ada akun ditemukan di accounts.txt!'));
  process.exit(1);
}

const [email, password, uuid] = accounts[0].split('|');

if (!uuid) {
  console.log(chalk.red('❌ UUID tidak ditemukan!'));
  process.exit(1);
}

getTokenFromBrowser(email, password).then(async (token) => {
  const isValid = await verifyToken(token);
  if (!isValid) process.exit(1);

  const generateWsUrl = () => `ws://ws.getgrid.ai:8080/becl/${uuid}/${token}`;

  const wsHeaders = {
    'connection': 'Upgrade',
    'upgrade': 'websocket',
    'user-agent': 'Mozilla/5.0'
  };

  const startPingInterval = (ws) => {
    setInterval(() => {
      console.log(chalk.yellow('🔔 Ping ke server...'));
      ws.send(JSON.stringify({ op: 'ping' }));
    }, 30000);
  };

  const connectWebSocket = (agent = null) => {
    console.log(chalk.cyan(`🔗 Menghubungkan ke WebSocket dengan UUID: ${uuid}`));
    const wsUrl = generateWsUrl();
    
    const ws = new WebSocket(wsUrl, { agent, headers: wsHeaders });

    ws.on('open', () => {
      console.log(chalk.green('✅ WebSocket terhubung!'));
      startPingInterval(ws);
    });

    ws.on('message', () => {
      console.log(chalk.cyan('📩 Pesan diterima dari server'));
    });

    ws.on('error', () => {
      console.log(chalk.red('❌ WebSocket error'));
    });

    ws.on('close', () => {
      console.log(chalk.red('🔴 Koneksi terputus. Reconnect dalam 5 detik...'));
      setTimeout(() => connectWebSocket(agent), 5000);
    });
  };

  console.log(chalk.gray('🚫 Proxy tidak digunakan, langsung terhubung...'));
  connectWebSocket();
});
