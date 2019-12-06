const userSignup = `INSERT INTO users(email, staffId, password, instruction)
VALUES($1, $2, $3, $4)
RETURNING id, email, staffId, password, instruction, registeredOn`;

const userDetails = 'SELECT * FROM users WHERE email = $1';

export { userSignup, userDetails };