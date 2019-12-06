const createIdentity = `INSERT INTO identity(passport, name, idNumber, unit, branch, name_address_nextOfKin,signature)
VALUES($1, $2, $3, $4, $5, $6,$7)
RETURNING id, passport, name, idNumber, unit, branch, name_address_nextOfKin,signature, createdon`;

const fetchAllId = 'select * from identity';

const selectOneId = `select * from identity where id = $1 limit 1`;
export { createIdentity, fetchAllId, selectOneId};