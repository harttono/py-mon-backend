const Model             = require("../models");
const Ticket            = Model.ticket;
const TypeOfTrain       = Model.train;
const { Op }            = require("sequelize");
// insert new ticket 
exports.InsertNewTicket = (req, res) => {
   const Body  = req.body;
   const dataticket = {
     name: Body.name,
     type_train: Body.type_train.id,
     start_date:Body.start_date,
     start_station:Body.start_station,
     start_time:Body.start_time,
     destination:Body.destination,
     arrival_time: Body.arrival_time,
     price: Body.price,
     qty:Body.qty
   };
  console.log(dataticket);
  Ticket.create(dataticket).then(resTicket => {
    TypeOfTrain.findOne({ where: { id: Body.type_train.id } }).then(resTypeOfTrain => {
          const resData = {
            id: resTicket.id,
            name: resTicket.name,
            type_train: resTypeOfTrain.id,
            date_start:resTicket.date_start,
            start_station:resTicket.start_station,
            start_time:resTicket.start_time,
            destination:resTicket.destination,
            arrival_time:resTicket.arrival_time,
            price:resTicket.price
          };
          res.status(200).send({
            message: "success",
            resData
        });
      });
    });
};

// get ticket today & finding a ticket
exports.getTicketsStartTime = (req, res) => {
  const startTime = req.query.start_time;
  const dateTimeGte = req.query.date_time_gte;
  const dateTimeLte = req.query.date_time_lte;
  const startStation = req.query.start_station;
  const destination = req.query.destination;
  if (startTime) {
    Ticket.findAll({
      attributes: [
        "id",
        "name",
        "start_date",
        "start_station",
        "start_time",
        "destination",
        "arrival_time",
        "price",
        "qty"
      ],
      include: [
        {
          model: TypeOfTrain,
          attributes: ["id", "name"]
        }
      ],
      where: {start_date: req.query.start_time }
    }).then(data => {
      res.send(data);
    });
  } else if (dateTimeGte && dateTimeLte) {
    console.log(req.query);
    Ticket.findAll({
      attributes: [
        "id",
        "name",
        "start_date",
        "start_station",
        "start_time",
        "destination",
        "arrival_time",
        "price",
        "qty"
      ],
      include: [
        {
          model: TypeOfTrain,
          attributes: ["id", "name"],
        }
      ],
      where:{
        [Op.and]: [
          { start_date: { [Op.gte]: dateTimeGte } },
          { start_date: { [Op.lte]: dateTimeLte } }
        ],
        start_station: {[Op.like]:`%${startStation}%`},
        destination: {[Op.like]:`%${destination}%`}
      }
    }).then(data => {
      res.send(data);
    });
  } else {
    res.status(400).send({
      error: true,
      message:
        "param start_time required example [api]/tickets?start_time=2020-03-03 OR [api]/tickets?date_time_gte=2020-03-01&date_time_lte=2020-03-02"
    });
  }
};

