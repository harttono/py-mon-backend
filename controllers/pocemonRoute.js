const Model = require("../models");
const Pocemon = Model.pocemon;

exports.createPocemon = async (req, res) => {
  try {
    const { name, species, ability, height, weight, catched, exchange } = req.body;
    const data = {
      name,
      species: species.id,
      ability,
      height,
      weight,
      catched,
      exchange,
    };
    const createPocemon = await Pocemon.create(data);
    if (createPocemon) {
      return res.status(200).send({ message: "Data has been created successfully", data: Product });
    }
  } catch (err) {
    return res.status(500).send({
      message: `${err}`,
    });
  }
};
