const createIdentity = `INSERT INTO identity(passport, name, idNumber, unit, branch, name_nextOfKin, address_nextOfKin,signature, userId)
VALUES($1, $2, $3, $4, $5, $6,$7, $8, $9)
RETURNING id, passport, name, idNumber, unit, branch, name_nextOfKin, address_nextOfKin, signature, userId, createdon`;

const fetchAllId = 'select * from identity';

const selectOneId = `select * from identity where id = $1 limit 1`;

const checkIdNumber = `select * from identity where userid = $1 limit 1`;

export { createIdentity, fetchAllId, selectOneId, checkIdNumber};