const contactsOperations = require("../../models/contacts");
const {NotFound} = require("http-errors");

const getContactById = async (req, res) => {
      const {contactId} = req.params;
      const result = await contactsOperations.getContactById(contactId);
      if(!result) {
       throw new NotFound(`Product with id=${contactId} not found`);
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result: result
        }
      });
  }

  module.exports = getContactById;