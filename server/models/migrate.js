/* eslint-disable consistent-return */
import pool from './db';

const tableQuery = async () => {
  try {
    const dropApplicationTable = await pool.query('DROP TABLE IF EXISTS applicants CASCADE;');

    const applicationTable = await pool.query(`CREATE TABLE IF NOT EXISTS applicants(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(50) NOT NULL,
      lastNAme VARCHAR(50) NOT NULL,
      email VARCHAR(50)    ,
      phone VARCHAR(50)    ,
      age numeric NOT NULL,
      nysc VARCHAR(50) NOT NULL,
      grade VARCHAR(50) NOT NULL,
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP )`);

    const applicantValues = ['admin', 'admin', 'admin@gmail.com', '08135778669', 25, 'A00134LA', 'first class'];
    const applicant = await pool.query('INSERT into applicants(firstName, lastName, email, phone, age, nysc, grade)VALUES($1,$2,$3,$4,$5,$6,$7)', applicantValues);

    console.log('All Tables Created Successfully');
  } catch (err) {
    console.log(err.stack);
    return err.stack;
  }
};

tableQuery();