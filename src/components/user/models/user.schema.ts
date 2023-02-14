import Joi from "joi";

/**
 * User schema validation
 * @requires email
 * @requires password
 * @requires firstname
 * @requires lastname
 */

const userSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  role: Joi.string(),
  profile: Joi.object(),
}).with("email", "password");

export default userSchema;
