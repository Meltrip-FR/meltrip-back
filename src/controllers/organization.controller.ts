import Express from "express";
import Database from "../models";
import axios from "axios";
import { generatedToken } from "../tools/generatedToken";

const Organizations = Database.organizations;

export const Create = async (req: Express.Request, res: Express.Response) => {
  const newInseeToken = await generatedToken();
  const getOrganization: any = await axios({
    method: "get",
    url: `https://api.insee.fr/entreprises/sirene/V3/siret/${req.body.siret}`,
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "application/json",
      Authorization: `Bearer ${newInseeToken}`,
    },
  }).catch((e: TypeError) => console.log(e));

  const etablissement = getOrganization.data.etablissement;

  Organizations.create({
    siret: etablissement.siret,
    dateCreation: etablissement?.dateCreationEtablissement,
    denominationUniteLegale:
      etablissement?.uniteLegale?.denominationUniteLegale,
    numeroVoie: etablissement?.adresseEtablissement?.numeroVoieEtablissement,
    typeVoie: etablissement?.adresseEtablissement?.typeVoieEtablissement,
    voie: etablissement?.adresseEtablissement?.libelleVoieEtablissement,
    codePostal: etablissement?.adresseEtablissement?.codePostalEtablissement,
    commune: etablissement?.adresseEtablissement?.libelleCommuneEtablissement,
    codeCommune: etablissement?.adresseEtablissement?.codePostalEtablissement,
    cedex: etablissement?.adresseEtablissement?.codeCedexEtablissement,
  })
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while creating the organization",
      });
    });
};
export const FindOne = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Organizations.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        error,
        message: "Error retrieving Organizations with id=" + id,
      });
    });
};
export const FindAll = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Organizations.findAll()
    .then(async (data: any) => {
      res.send(data);
    })
    .catch((error: TypeError) => {
      res.status(500).send({
        message: error.message || "Error retrieving organization with id=" + id,
      });
    });
};
export const Update = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Organizations.update(
    { ...req.body },
    {
      where: { id: id },
    }
  )
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Organization was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Organization with id=${id}. Maybe Organization was not found or req.body is empty!",
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Error updating Organization with id=" + id,
      });
    });
};
export const Delete = (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  Organizations.destroy({
    where: { id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Organizations was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Organizations with id=${id}. Maybe Organizations was not found!`,
        });
      }
    })
    .catch((_error: TypeError) => {
      res.status(500).send({
        message: "Could not delete Organizations with id=" + id,
      });
    });
};
