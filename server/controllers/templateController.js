/* eslint-disable no-trailing-spaces */
import db from '../models/db';
import { submitTemplate } from '../models/templateQuery';

/**
 * @description Defines the actions for Transaction endpoints
 * @class TemplateController
 */
class TemplateController {
  /**
   * @description Credit an Account
   * @static
  * @param {integer} - Number of the Bank Account
  * @return {object} - The account that has the specified number with balance increased
   * @method submitTemplate
   */
  static async submitTemplate(req, res) {
    try {

        let { type } = req.body;
      let name = req.file.originalname

      let userId = req.authUser.id;

      
      const values = [ name, userId, type];
      const result = await db.query(submitTemplate, values);

      return res.status(200).json({
        status: 200,
        message: 'Template created successfully',
        data: result.rows,
      });
    } catch (err) {
        
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

}

export default TemplateController;