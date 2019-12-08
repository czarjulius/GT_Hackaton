/* eslint-disable consistent-return */
import pool from './db';

const tableQuery = async () => {
  try {
    const dropUserTable = await pool.query('DROP TABLE IF EXISTS users CASCADE;');

    const dropApplicationTable = await pool.query('DROP TABLE IF EXISTS applicants CASCADE;');

    const dropIdentityTable = await pool.query('DROP TABLE IF EXISTS identity CASCADE;');

    const dropTemplateTable = await pool.query('DROP TABLE IF EXISTS template CASCADE;');

    const dropNextOfKinTable = await pool.query('DROP TABLE IF EXISTS nextofkin CASCADE;');


    const userTable = await pool.query(`CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      email VARCHAR(50) UNIQUE NOT NULL,
      staffId VARCHAR(50) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      instruction TEXT,
      isAdmin BOOLEAN DEFAULT FALSE,
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP )`);

    const applicationTable = await pool.query(`CREATE TABLE IF NOT EXISTS applicants(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(50) NOT NULL,
      lastNAme VARCHAR(50) NOT NULL,
      email VARCHAR(50)    ,
      school VARCHAR(50)    ,
      course VARCHAR(50)    ,
      age numeric NOT NULL,
      nysc VARCHAR(50) NOT NULL,
      grade VARCHAR(50) NOT NULL,
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP )`);

    const identityTable = await pool.query(`CREATE TABLE IF NOT EXISTS identity(
        id SERIAL PRIMARY KEY,
        passport VARCHAR(255),
        name VARCHAR(255),
        idNumber VARCHAR(255),
        unit VARCHAR(255),
        branch VARCHAR(255),
        name_nextOfKin TEXT,
        address_nextOfKin TEXT,
        userId  INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        signature VARCHAR(255) DEFAULT 'signature',
        createdOn DATE DEFAULT CURRENT_TIMESTAMP)`);

      const templateTable = await pool.query(`CREATE TABLE IF NOT EXISTS template(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        userId  INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(255) DEFAULT 'identity',
        createdOn DATE DEFAULT CURRENT_TIMESTAMP)`);

      const nextofkinTable = await pool.query(`CREATE TABLE IF NOT EXISTS nextofkin(
        id SERIAL PRIMARY KEY,
        userId  INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        relationship  VARCHAR(255),
        phone VARCHAR(255),
        createdOn DATE DEFAULT CURRENT_TIMESTAMP)`);

        const adminValues = ['admin@gmail.com','admin123','LA/2019/007', 'instruction', 'true'];
        const admin = await pool.query('INSERT into users(email, password, staffId, instruction, isAdmin)VALUES($1,$2,$3,$4,$5)', adminValues);
        
        const templateValues = ['juliusId.pdf','indentity', 1];
        const template = await pool.query('INSERT into template(name, type, userId)VALUES($1,$2,$3)', templateValues);
        
        const identityValues = ['admin.png','julius ngwu','LA/2019/007', 'app dev', 'vi', 'chinedu chinedu', 'emmanuel lekki','signature', 1];
        const identity = await pool.query('INSERT into identity(passport, name, idNumber, unit, branch, name_nextOfKin ,address_nextOfKin, signature, userId)VALUES($1,$2,$3,$4,$5,$6,$7,$8, $9)', identityValues);
        
        const nextOfKinValues = [ 1,'brother', '0908833218'];
        const nextOfKin = await pool.query('INSERT into nextofkin(userId, relationship, phone)VALUES($1,$2,$3)', nextOfKinValues);


        const applicantValues = ['admin', 'admin', 'admin@gmail.com', 'unn', 'Electronic', 25, 'A00134LA', 'first class'];
        const applicant = await pool.query('INSERT into applicants(firstName, lastName, email, school, course, age, nysc, grade)VALUES($1,$2,$3,$4,$5,$6,$7, $8)', applicantValues);

    console.log('All Tables Created Successfully');
  } catch (err) {
    console.log(err.stack);
    return err.stack;
  }
};

tableQuery();