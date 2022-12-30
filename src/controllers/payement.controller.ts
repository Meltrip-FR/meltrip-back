import * as dotenv from "dotenv";
import Express from "express";
import { stripe } from "../config/stripe.config";
import Database from "../models";

dotenv.config();

const Payement = Database.payements;

export const Create = (req: Express.Request, res: Express.Response) => {
  Payement.create({ ...req.body })
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while creating the Payement",
      });
    });
};
export const FindOne = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Payement.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        error,
        message: "Error retrieving Payement with id=" + id,
      });
    });
};
export const FindAll = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Payement.findAll()
    .then(async (data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        message: error.message || "Error retrieving Payement with id=" + id,
      });
    });
};
export const Update = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Payement.update(
    { ...req.body },
    {
      where: { id: id },
    }
  )
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Payement was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Payement with id=${id}. Maybe Payement was not found or req.body is empty!",
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Error updating Payement with id=" + id,
      });
    });
};
export const Delete = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Payement.destroy({
    where: { id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Payement was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Payement with id=${id}. Maybe Payement was not found!`,
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Could not delete Payement with id=" + id,
      });
    });
};

export const buyByStripe = async (
  req: Express.Request,
  res: Express.Response
) => {
  const { nameDevis, unitAmount } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: nameDevis,
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `https://meltrip.fr/user/payments`,
    cancel_url: `https://meltrip.fr/user/payments`,
  });

  if (session?.id) {
    const result = await Payement.create({
      payementIntent: session.id,
      urlPayement: session.url,
      status: "En cours",
      paye: 0,
      price: unitAmount,
    });

    if (result) {
      const data = result.dataValues;
      res.send({ ...{ sessionId: session.id }, ...data });
    } else {
      res.send("Some error occured while creating the Payement");
    }
  }
};

export const webhook = (req: Express.Request, res: Express.Response) => {
  let event: any;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.API_KEY_STRIPE_WEBHOOK as string;
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });
    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (err: any) {
    console.log(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.async_payment_failed":
      Payement.update(
        {
          status: "Refusé",
          paye: 0,
        },
        {
          where: { payementIntent: event.data.object.id },
        }
      ).then((data: any) => {
        const result = data.dataValues;
        res.send({ ...{ sessionId: event.data.object.id }, ...result });
      });
      break;
    case "checkout.session.async_payment_succeeded":
      Payement.update(
        {
          status: "Terminé",
          paye: event.data.object.amount_total,
        },
        {
          where: { payementIntent: event.data.object.id },
        }
      ).then((data: any) => {
        const result = data.dataValues;
        res.send({ ...{ sessionId: event.data.object.id }, ...result });
      });
      break;
    case "checkout.session.completed":
      Payement.update(
        {
          status: "Terminé",
          paye: event.data.object.amount_total,
        },
        {
          where: { payementIntent: event.data.object.id },
        }
      ).then((data: any) => {
        const result = data.dataValues;
        res.send({ ...{ sessionId: event.data.object.id }, ...result });
      });
      break;
    case "checkout.session.expired":
      Payement.update(
        {
          status: "Refusé",
          paye: 0,
        },
        {
          where: { payementIntent: event.data.object.id },
        }
      ).then((data: any) => {
        const result = data.dataValues;
        res.send({ ...{ sessionId: event.data.object.id }, ...result });
      });
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};
