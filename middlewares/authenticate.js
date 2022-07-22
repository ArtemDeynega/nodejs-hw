const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { createError } = require('../helpers');

/*
1. Извлечь из заголовка запроса заголовок authorization
2. Разделить его на 2 слова
3. Проверить, равно ли первое слово Bearer
3.1. Если нет - отправить ошибку 401
4. Проверить, валиден ли токен
4.1. Если нет - отправаить ошибку 401
5. Проверить есть ли в базе пользователь с таким id
5.1 Если нет - отправить ошибку 401
6.  Добавить в объект request найденого пользователя req.user = user
7. Передать  обработку дальше.
27
 */
const { SECRET_KEY } = process.env;
const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw createError(401);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw createError(401, 'Not authorized');
      }
      req.user = user;
      next();
    } catch (error) {
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
module.exports = authenticate;
