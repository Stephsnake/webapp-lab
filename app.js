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
const appInsights = require('applicationinsights');
appInsights.setup();
appInsights.start();

// Compteur de visites
let visitCount = 0;

app.get('/', (req, res) => {
  visitCount++;

  // Télémétrie custom
  appInsights.defaultClient.trackEvent({
    name: 'PageView',
    properties: { page: 'home', version: process.env.APP_VERSION }
  });

  appInsights.defaultClient.trackMetric({
    name: 'VisitCount',
    value: visitCount
  });

  // ... reste du code
});
{
  "dependencies": {
    "express": "^4.18.2",
    "applicationinsights": "^2.7.0"
  }
}
app.get('/load-test', (req, res) => {
  // Simulation d'une charge
  const start = Date.now();

  // CPU intensive task
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i);
  }

  const duration = Date.now() - start;

  res.json({
    message: 'Load test completed',
    duration: `${duration}ms`,
    result: Math.floor(result),
    timestamp: new Date().toISOString()
  });
});
