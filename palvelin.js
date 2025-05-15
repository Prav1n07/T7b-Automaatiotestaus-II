import express from 'express';

import { laskeVertausluvut } from './vertausluku.js';

const app = express();

// koodia


app.get('/vertausluvut', (req, res) => {
  // 
  const ehdokkaat = [
		{ numero: 101, nimi: "Maija Meikäläinen", aanet: 1 },
		{ numero: 102, nimi: "Kalle Koljonen", aanet: 4 },
		{ numero: 103, nimi: "Sari Virtanen", aanet: 4 },
		{ numero: 104, nimi: "Jukka Jokinen", aanet: 5 },
	];
  const tulos = laskeVertausluvut(ehdokkaat);
  res.json(tulos);
});

app.listen(3000, () => {
  console.log('Palvelin käynnissä portissa 3000');
});