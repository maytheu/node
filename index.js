const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to server', api: 'interact with our endpoint with /api/v1/' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server starting on ${port}`));
