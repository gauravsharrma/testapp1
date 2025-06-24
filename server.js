const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const apps = [
  {
    name: 'EMI Calculator',
    description: 'Calculate your loan EMI quickly.',
    category: 'Finance'
  },
  {
    name: 'BMI Calculator',
    description: 'Check your body mass index.',
    category: 'Health'
  }
];

app.get('/api/apps', (req, res) => {
  res.json(apps);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
