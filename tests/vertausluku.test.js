import laskeVertausluvut from "../vertausluku.js";
import ehdokasRekisteri from "../ehdokasRekisteri.js";

import { afterEach, beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";

describe("laskeVertausluvut", () => {
  beforeEach(() => {
    const lista = [
      { numero: 101, nimi: "Maija Meikäläinen", aanet: 1 },
      { numero: 102, nimi: "Kalle Koljonen", aanet: 4 },
      { numero: 103, nimi: "Sari Virtanen", aanet: 2 },
      { numero: 104, nimi: "Jukka Jokinen", aanet: 5 },
      { numero: 105, nimi: "Pekka Pouta", aanet: 3 },
      { numero: 106, nimi: "Liisa Laakso", aanet: 3 },
    ]

    mock.method(ehdokasRekisteri, 'haeLista', () => {
      return lista;
    });
  });
  afterEach(() => {
    mock.reset();
  });

  it('listan eniten ääniä saaneen ehdokkaan vertausluku on listan äänten summa', () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[0].vertausluku, 18);
  });
  it('listan toiseksi eniten ääniä saaneen ehdokkaan vertausluku on puolet listan äänien summasta', () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[1].vertausluku, 9);
  });
  it('listan kolmanneksi eniten ääniä saaneen ehdokkaan vertausluku on kolmasosa listan äänien summasta', () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[2].vertausluku, 6);
  });
  it('jos ehdokkailla on sama äänimäärä, ehdokkailla lukee arvottu true', () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[2].arvottu, true);
    assert.equal(tulos[3].arvottu, true);
  });
  it('arvottu-järjestys vaihtelee saman äänimäärän ehdokkailla', () => {
    const järjestykset = new Set();
  
    for (let i = 0; i < 20; i++) {
      const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
      const samaAanet = tulos.filter(e => e.aanet === 3).map(e => e.numero).join(",");
      järjestykset.add(samaAanet);
    }
    
    assert.ok(järjestykset.size > 1, "Arvonta ei tuota eri järjestyksiä");
  });
  

});