const axios = require("axios");

const assert = require("assert");

const carroExemplo = {
  placa: "abc",
  chassi: "xyz",
  renavam: "uio",
  modelo: "X1",
  marca: "Porsche",
  ano: "0",
  id: "5edff827bc24db4534c32ccb",
};

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

describe("Testes das operações CRUD:", function () {
  it("Deve retornar o carro que corresponde ao id", async function () {
    const carro = await axios.get(
      "http://localhost:3000/carros/5edff827bc24db4534c32ccb"
    );
    //The test passes if 'carro2' is inside our database

    assert.equal(JSON.stringify(carro.data), JSON.stringify(carroExemplo));
    //JSON.stringify() was used to transform the content of the objects in a string
    //otherwise comparing objects would be comparing if their address in memory is the same
    //(it would always return false)
  });

  it("Deve retornar um array com todos os carros", async function () {
    const carros = await axios.get("http://localhost:3000/carros");
    //The test passes if 'carro2' is inside our database
    const carros2 = [
      {
        placa: "abc",
        chassi: "xyz",
        renavam: "uio",
        modelo: "X1",
        marca: "Porsche",
        ano: "0",
        id: "5edff827bc24db4534c32ccb",
      },
    ];
    assert.equal(JSON.stringify(carros.data), JSON.stringify(carros2));
    //JSON.stringify() was used to transform the content of the objects in a string
    //otherwise comparing objects would be comparing if their address in memory is the same
    //(it would always return false)
  });
});
