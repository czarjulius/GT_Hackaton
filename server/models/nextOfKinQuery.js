const createNextOfKin = `INSERT INTO nextofkin(relationship, phone, userId)
VALUES($1, $2, $3)
RETURNING id, userId, relationship, phone ,createdon`;

const fetchAllNextOfKin = `Select N.id, I.name, N.relationship,
                            N.phone, I.idNumber from identity as I inner join nextofkin N 
                            on N.userid = I.userid`;

const selectOneNextOfKin = `Select I.id, I.name, N.relationship, I.address_nextofkin, I.name_nextofkin,
                            N.phone, I.signature from identity as I inner join nextofkin N 
                            on N.userid = I.userid where N.id = $1 limit 1`;

const checkIdNumber = `select * from nextofkin where userid = $1 limit 1`;

export { createNextOfKin, fetchAllNextOfKin, selectOneNextOfKin, checkIdNumber };


