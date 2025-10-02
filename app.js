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
