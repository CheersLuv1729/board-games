import express from 'express';

const PORT = 8000;
const app = express();

app.get('/', (req, res) => {
    res.send('Henlo worldo');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});