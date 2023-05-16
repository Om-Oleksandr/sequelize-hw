module.exports.sendId = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    req.idUserForTask = idUser;
    next();
  } catch (error) {
    next(error);
  }
};
