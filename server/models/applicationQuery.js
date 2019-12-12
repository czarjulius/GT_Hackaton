const createApplicant = `INSERT INTO applicants(firstName, lastName, email, school, course, age, nysc, grade)
VALUES($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING id, firstName, lastName, email, school, course, age, nysc, grade, registeredOn`;

const checkEmail = `select * from applicants where email = $1 limit 1`;
export { createApplicant, checkEmail };