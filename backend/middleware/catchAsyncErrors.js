// To perform Validations for Try Catch Block in Async Function

module.exports = (theFunction) => (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
  