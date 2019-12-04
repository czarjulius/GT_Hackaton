const createApplicant = `INSERT INTO applicants(firstName, lastName, email, phone, age, nysc, grade)
VALUES($1, $2, $3, $4, $5, $6, $7)
RETURNING id, firstName, lastName, email, phone, age, nysc, grade, registeredOn`;

export { createApplicant };