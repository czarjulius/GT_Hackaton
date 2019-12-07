const submitTemplate = `INSERT INTO template(name, userId, type)
VALUES($1, $2, $3)
RETURNING id, name, userId, type, createdOn`;

export { submitTemplate };