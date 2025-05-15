module.exports = {
  launch: {
    headless: true, // Muss true sein, sonst bricht es in Codespaces ab
    slowMo: 25, // Optional – verlangsamt Puppeteer-Interaktionen (hilft beim Debuggen)
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
};
