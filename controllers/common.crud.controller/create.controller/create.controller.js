const BaseController = require('../base.controller');

class CreateController extends BaseController {
    constructor(req, res, next) {
        super(req, res, next);
    };

    async doAction(){
      this.options.implOptions = this.options.request.body;
      this._initiateAction().then((result) => {
         this.responseHandler.parser(this.options.response, {statusCode: 201, result: result, success: true});
      });
    };
}

module.exports = CreateController;