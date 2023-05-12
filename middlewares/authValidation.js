const Joi = require("joi");

module.exports = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(50).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "uk"] },
      })
      .min(6)
      .max(50)
      .required(),
    user: Joi.string().min(3).max(50),
  });
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      message: "Some data didn`t pass the validation. Try again!",
    });
  }
  next();
};
