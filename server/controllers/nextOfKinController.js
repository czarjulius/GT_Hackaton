/* eslint-disable no-trailing-spaces */
/* eslint-disable consistent-return */

import {
    createNextOfKin,
    fetchAllNextOfKin,
    selectOneNextOfKin,
    checkIdNumber
  } from "../models/nextOfKinQuery";
  import db from "../models/db";
  /**
   * @description Defines the actions for Account endpoints
   * @class AccountController
   */
  class NextOfKinController {
    /**
     * @description Creates new account record
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @method postIdentity
     */
    static async postNextOfKin(req, res) {
      try {
        let { relationship, phone } = req.body;
  
        let userId = req.authUser.id;

        const { rows } = await db.query(checkIdNumber, [userId]);


        if (rows[0]) {
          return res.status(404).json({
            status: 404,
            error: 'User already filled the next of kin form',
          });
        }
  
        const values = [
          relationship,
          phone,
          userId
        ];
        
        const result = await db.query(createNextOfKin, values);
  
        return res.status(201).json({
          status: 201,
          message: "Next Of Kin successfully created",
          data: {
            id: result.rows[0].id,
            name: result.rows[0].relationship,
            idNumber: result.rows[0].phone,
            userId: result.rows[0].userid,
          }
        });
      } catch (err) {
        return res.status(500).json({
          status: 500,
          error: err.message
        });
      }
    }
  
    static async getAllNextOfKin(req, res) {
      try {
        const result = await db.query(fetchAllNextOfKin);
        if (result.rowCount < 1) {
          return res.status(404).json({
            status: 400,
            error: "No result to display yet"
          });
        }
        return res.status(200).json({
          status: 200,
          message: "All Next Of Kin successfully fetched",
          data: result.rows
        });
      } catch (err) {
        return res.status(500).json({
          status: 500,
          error: err.message
        });
      }
    }
  
    static async getSingleNextOfKin(req, res) {
      try {
        const { id } = req.params;
        
        const nextOfKinId = await db.query(selectOneNextOfKin, [id]);

        if (nextOfKinId.rowCount < 1) {
          return res.status(404).json({
            status: 400,
            error: " Next Of Kin is yet to be created"
          });
        }
  
        return res.status(200).json({
          message: "Next Of Kin fetched successfully",
          status: 200,
          data: nextOfKinId.rows[0]
        });
      } catch (err) {
        return res.status(500).json({
          status: 500,
          error: err.message
        });
      }
    }
  }
  
  export default NextOfKinController;
  