import dotenv from 'dotenv';
import db from '../models/db';
import generateToken from '../middlewares/generateToken';
import { userSignup, userDetails } from '../models/userQuery';
import EmailController from '../mail/send'
dotenv.config();
/**
 * @description Defines the actions for User endpoints
 * @class AccountController
 */
class User {
  /**
   * @description Creates a new user record
   * @static
   * @param {object} req - The form data to be inputted
   * @param {object} res - The status code and data including login token..
   * @method postUser
   */
  static async userSignup(req, res) {
    try {
      const { email, staffId,instruction
      } = req.body;

      const password = Math.floor(10000 + Math.random() * 90000);
      const userEmail = await db.query(userDetails, [email]);
      if (userEmail.rows.length) {
        return res.status(409).json({
          status: 409,
          error: 'Email is already registered',
        });
      }

      const values = [ email, staffId, password, instruction];
      const result = await db.query(userSignup, values);
      const token = generateToken(result.rows[0].id, result.rows[0].email, result.rows[0].isadmin, result.rows[0].staffid);
      
      EmailController.pushEmail(result.rows[0])
      return res.header('x-access-token', token).status(201).json({
        status: 201,
        message: 'Registration successful',
        data: {
          token,
          email,
          staffId,
          instruction,
          registeredOn: result.rows[0].registeredon,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  /**
    * @description Login  a user
    * @method login
    * @params {object} req - The form data to be inputted
    * @return {object} res - The status code and data including login token.
    *
   */
  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const userEmail = await db.query(userDetails, [email]);
      if (!userEmail.rows.length) {
        return res.status(400).json({
          status: 400,
          error: 'invalid email or password',
        });
      }
      // const userPassword = await bcrypt.compare(password, userEmail.rows[0].password);
      if ((!userEmail.rows[0]) || (password != userEmail.rows[0].password)) {
        return res.status(400).json({
          status: 400,
          error: 'invalid email or password',
        });
      }

      const rows = userEmail;
      const {
        id,staffid, isadmin, registeredon,
      } = rows.rows[0];
      const token = generateToken(rows.rows[0].id, rows.rows[0].email, rows.rows[0].isadmin, rows.rows[0].staffid);
      return res.header('x-access-token', token).status(200).json({
        status: 200,
        message: 'Login successful',
        data: {
          token,
          id,
          email,
          staffId: staffid,
          isAdmin: isadmin,
          registeredOn: registeredon,
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

export default User;
