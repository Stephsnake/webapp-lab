// Modifier la version dans app.js
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Azure App Service Lab</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px; background: #f0f8ff;">
        <h1>🚀 Azure App Service + GitHub Lab</h1>
        <p>Version: 2.0 - Mise à jour automatique !</p>
        <p>Déployé automatiquement depuis GitHub !</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
        <p style="color: green;">✅ CI/CD fonctionne parfaitement !</p>
      </body>
    </html>
  `);
});
