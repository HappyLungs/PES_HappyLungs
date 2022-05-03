const bcrypt = require("bcryptjs");

comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {comparePassword};