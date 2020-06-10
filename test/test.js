const app = require("../index");
const axios = require("axios");
const assert = require("assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Carro = require("../models/carro");

const api = supertest(app);

const carrosExemplos = [
  {
    placa: "JKY4300",
    chassi: "4Nw cNAr3Y A4 8H9680",
    renavam: "10628240829",
    modelo: "959",
    marca: "Porsche",
    ano: "1989",
  },
  {
    placa: "KAY9082",
    chassi: "15R 6KxEpA C7 ZS1675",
    renavam: "02062303755",
    modelo: "Model 3",
    marca: "Tesla",
    ano: "2018",
  },
  {
    placa: "NAV0502",
    chassi: "64u 9vJMmA kA CA9618",
    renavam: "03466200549",
    modelo: "SPORTWAGON",
    marca: "Alfa Romeo",
    ano: "2006",
  },
  {
    placa: "NEK0146",
    chassi: "6nN ASswP2 07 kA3690",
    renavam: "05427625620",
    modelo: "V12",
    marca: "Aston Martin",
    ano: "2009",
  },
  {
    placa: "MMU7386",
    chassi: "2eg vA61z7 Yv VS1812",
    renavam: "09421277452",
    modelo: "F103",
    marca: "Audi",
    ano: "1965",
  },
  {
    placa: "MVX5001",
    chassi: "5AD wAAU35 Re Ue4381",
    renavam: "02880218777",
    modelo: "M1",
    marca: "BMW",
    ano: "1981",
  },
  {
    placa: "AVQ3428",
    chassi: "3df 47uAU6 4p a72099",
    renavam: "03191808436",
    modelo: "599",
    marca: "Ferrari",
    ano: "2007",
  },
  {
    placa: "JUH6852",
    chassi: "64v r887AZ KH 2w5646",
    renavam: "00520091493",
    modelo: "X300",
    marca: "Jaguar",
    ano: "1994",
  },
];
let carrosExemplosComId = [];
let id, randomIndex;

describe("Testes das operações CRUD:", function () {
  before(async function () {
    console.log(
      'Preparar o DB para os testes:\n\n1. Limpar o DB\n2. Preencher o DB com as entries de "carrosExemplos"\n'
    );
    await Carro.deleteMany({});

    const length = carrosExemplos.length;
    for (let i = 0; i < length; i++) {
      let novoCarro = new Carro(carrosExemplos[i]);
      let novoCarroComId = await novoCarro.save();
      carrosExemplosComId = carrosExemplosComId.concat(novoCarroComId);
    }

    randomIndex = Math.floor(Math.random() * carrosExemplosComId.length);
    id = carrosExemplosComId[randomIndex].id;
  });

  describe("GET /carros", function () {
    it("responde com um array contendo todos os carros", function (done) {
      request(app)
        .get("/carros")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          assert.strictEqual(
            JSON.stringify(response.body),
            JSON.stringify(carrosExemplosComId)
          );
        });
    });
  });

  describe("GET /carros/:id", function () {
    it("", function (done) {
      request(app)
        .get(`/carros/${id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          assert.strictEqual(
            JSON.stringify(response.body),
            JSON.stringify(carrosExemplosComId[randomIndex])
          );
        });
    });
  });
});
