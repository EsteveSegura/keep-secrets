const { body } = require('express-validator');
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const container = require('../../container');
const CreateSessionCommand = require('../../application/create_session/create-session-command');
const InvalidClientError = require('../../domain/session/errors/invalid-client-error');

const httpValidator = require('./middleware/http-validator');
const { IS_STRING, INVALID_LENGTH, NOT_EMPTY } = require('./validation-values');

router.post('/',
  body('aud')
    .notEmpty().withMessage(NOT_EMPTY)
    .isString().withMessage(IS_STRING)
    .isLength({ min: 1, max: 15 }).withMessage(`${INVALID_LENGTH} 1 and 15`),
  httpValidator,
  async (req, res) => {
    const { aud } = req.body;

    try {
      const command = new CreateSessionCommand({ aud });
      const createSession = container.resolve('createSession');
      const response = await createSession.execute(command);

      res.status(200).json(response);
    } catch (err) {
      if(err instanceof InvalidClientError) {
        return res.status(400).json({message: err.message});
      }
      return res.status(500).json({ message: 'Something wrong' });
    }
  });

module.exports = router;
