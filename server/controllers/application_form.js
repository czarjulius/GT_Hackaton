
/* eslint-disable no-trailing-spaces */
/* eslint-disable consistent-return */
import {createApplicant, checkEmail } from '../models/applicationQuery';

import db from '../models/db';
/**
 * @description Defines the actions for Account endpoints
 * @class AccountController
 */
class ApplicationFormController {
  /**
   * @description Creates new account record
   * @static
   * @param {object} req - request
   * @param {object} res - response
   * @method postApplicant
   */
  static async postApplicationForm(req, res) {
      
    try {
      const { firstName, lastName, email, school, course, age, nysc, grade } = req.body;
      
      const { rows } = await db.query(checkEmail, [email]);
      

      if (rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Applicant already Submitted application',
        });
      }


      const values = [firstName, lastName, email, school, course, age, nysc, grade];
      const result = await db.query(createApplicant, values);

      return res.status(201).json({
        status: 201,
        message: 'Application successfully created',
        data: {
          id: result.rows[0].id,
          firstName,
          lastName,
          email,
          school,
          course,
          age,
          nysc,
          grade
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }
}

export default ApplicationFormController;