const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
 
// Application Insights
const appInsights = require('applicationinsights');
appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || process.env.APPINSIGHTS_INSTRUMENTATIONKEY).start();
 
// Compteur de visites
let visitCount = 0;
 
app.get('/', (req, res) => {
  visitCount++;
 
  // Télémétrie custom
  appInsights.defaultClient.trackEvent({
    name: 'PageView',
    properties: {
      page: 'home',
      version: process.env.APP_VERSION || 'unknown'
    }
  });
 
  appInsights.defaultClient.trackMetric({
    name: 'VisitCount',
    value: visitCount
  });
 
  res.send(`
<html>
<head><title>Azure App Service Lab</title></head>
<body style="font-family: Arial; text-align: center; padding: 50px; background: #f0f8ff;">
<h1>🚀 Azure App Service + GitHub Lab</h1>
<p>Version: ${process.env.APP_VERSION || 'non définie'} - Mise à jour automatique !</p>
<p>Déployé automatiquement depuis GitHub !</p>
<p>Timestamp: ${new Date().toISOString()}</p>
<p style="color: green;">✅ CI/CD fonctionne parfaitement !</p>
<p>Visites : ${visitCount}</p>
</body>
</html>
  `);
});
 
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.APP_VERSION || '1.0'
  });
});
 
app.get('/api/info', (req, res) => {
  res.json({
    app: 'webapp-lab',
    version: process.env.APP_VERSION || '1.0',
    platform: process.platform,
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development',
    customMessage: process.env.CUSTOM_MESSAGE || 'No custom message',
    azureRegion: process.env.REGION_NAME,
    instanceId: process.env.WEBSITE_INSTANCE_ID
  });
});
 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
