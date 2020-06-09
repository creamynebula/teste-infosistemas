const Carro = require("../models/carro");
const carroRouter = require("express").Router();

carroRouter.get("/", async (request, response) => {
  try {
    const carros = await Carro.find({});
    return response.status(200).json(carros.map((carro) => carro.toJSON()));
  } catch (err) {
    return response.status(500).json({ error: "Algo de errado." });
  }
});

carroRouter.get("/:id", async (request, response) => {
  try {
    const carro = Carro.findById(request.params.id);
    return response.status(200).json(carro.toJSON());
  } catch (err) {
    return response.status(400).json({
      error: "Carro não encontrado, provavelmente o ID não existe.",
    });
  }
});

const checkForMissingField = (body) => {
  if (
    !body.placa ||
    !body.chassi ||
    !body.renavam ||
    !body.modelo ||
    !body.marca ||
    !body.ano
  )
    return true;
  //field missing
  else return false; //no field missing
};

const makeCarFromRequest = (body) => {
  const carro = new Carro({
    //cant do 'carro = new Carro({...body}) or the user could inject other properties
    placa: body.placa,
    chassi: body.chassi,
    renavam: body.renavam,
    modelo: body.modelo,
    marca: body.marca,
    ano: body.ano,
  });
  return carro;
};

carroRouter.post("/", async (request, response) => {
  const body = request.body;
  const fieldMissing = checkForMissingField(body);

  if (fieldMissing) {
    return response.status(400).json({
      error:
        "Algum dos campos está faltando. São necessários placa, chassi, renavam, modelo, marca e ano.",
    });
  }

  const carro = makeCarFromRequest(body);

  try {
    const result = await carro.save();
    return response.status(201).json(result.toJSON()); //201 == created
  } catch (err) {
    return response.status(500).json({
      error:
        "Erro ao colocar o carro no DB. Provavelmente as informações são inválidas - chassi, renavam ou placa já cadastrados",
      ...err,
    });
  }
});

carroRouter.delete("/:id", async (request, response) => {
  const carro = await Carro.findById(request.params.id);
  if (!carro)
    return response
      .status(400)
      .json({ error: "Carro não encontrado, provavelmente o ID não existe." });

  try {
    const removedNote = await Carro.findByIdAndRemove({
      _id: request.params.id,
    });
    response.status(204).json(removedNote.toJSON()); //204 == no content (because it was removed now)
  } catch (err) {
    return response
      .status(500)
      .json({ error: "Erro ao remover carro do DB", ...err });
  }
});

carroRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const fieldMissing = checkForMissingField(body);
  if (fieldMissing) {
    return response.status(400).json({
      error:
        "Algum dos campos está faltando. São necessários placa, chassi, renavam, modelo, marca e ano.",
    });
  }

  const carro = makeCarFromRequest(body);

  try {
    const updatedCarro = await Carro.findByIdAndUpdate(
      request.params.id,
      carro,
      {
        new: true,
      }
    );
    return response.status(200).json(updatedCarro.toJSON());
  } catch (err) {
    return response
      .status(500)
      .json({ error: "Erro ao atualizar as informações do carro.", ...err });
  }
});

module.exports = carroRouter;
