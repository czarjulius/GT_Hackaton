/* eslint-disable no-trailing-spaces */
/* eslint-disable consistent-return */

import {
  createIdentity,
  fetchAllId,
  selectOneId
} from "../models/identityQuery";
import db from "../models/db";
/**
 * @description Defines the actions for Account endpoints
 * @class AccountController
 */
class IdentityController {
  /**
   * @description Creates new account record
   * @static
   * @param {object} req - request
   * @param {object} res - response
   * @method postIdentity
   */
  static async postIdentity(req, res) {
    try {
      let { name, idNumber, unit, branch, name_address_nextOfKin } = req.body;

      let { signature, passport } = req.files;

      passport = req.filename;
    //   console.log(passport, "hdvgfgfdfgfsxdsd");

      passport = req.files.passport[0].filename;
      signature = req.files.signature[0].filename;

      const values = [
        passport,
        name,
        idNumber,
        unit,
        branch,
        name_address_nextOfKin,
        signature
      ];
      const result = await db.query(createIdentity, values);

      return res.status(201).json({
        status: 201,
        message: "Identity successfully created",
        data: {
          id: result.rows[0].id,
          passport: result.rows[0].passport,
          name: result.rows[0].name,
          idNumber: result.rows[0].idnumber,
          unit: result.rows[0].unit,
          branch: result.rows[0].branch,
          name_address_nextOfKin: result.rows[0].name_address_nextOfKin,
          signature: result.rows[0].signature
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  static async getAllIdentity(req, res) {
    try {
      const result = await db.query(fetchAllId);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 400,
          error: "No result to display yet"
        });
      }
      return res.status(200).json({
        status: 200,
        message: "All IDs successfully fetched",
        data: result.rows
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  static async getSingleId(req, res) {
    try {
      const { id } = req.params;

      const identityId = await db.query(selectOneId, [id]);

      if (identityId.rowCount < 1) {
        return res.status(404).json({
          status: 400,
          error: "This ID is yet to create an account"
        });
      }

      return res.status(200).json({
        message: "ID fetched successfully",
        status: 200,
        data: identityId.rows
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }
}

export default IdentityController;
