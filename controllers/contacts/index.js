const getAll = require("./getAll");
const getContactById = require("./getContactById");
const add = require("./add");
const updateById = require("./updateById");
const removeById = require("./removeById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
    getAll,
    getContactById,
    add,
    updateById,
    removeById,
    updateStatusContact
}