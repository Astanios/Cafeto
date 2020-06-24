/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

/**
 * @author Rafael Torres
 * @file api.js
 * @description Initialize API routes
 */

// Dependencies
const { Router } = require('restify-router');
const events_controller = require("../controllers/events");
var multer = require('multer');
var fs = require('fs');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload2 = multer({ storage: storage })
const upload = multer({ dest: 'uploads/' });

// Dependency Injector
const {
  container: dependencyContainer
} = require('../../dependency_injection/dependencyInjection');


// Initialice params
const apiRouter = new Router();
const API = dependencyContainer.api;

/**
 * Call dummy service ..
 *
 * @type { GET }
 *
 * @param { Object } req - Content info about request
 * @param { Object } res - Data to send response
 *
 * @return Dummy test response
 */

apiRouter.post('/uploadfile', (req, res) => {
  console.log('File upload service');
  var tmp_path = req.files.thumbnail.path;
  var target_path = './public/images/' + req.files.thumbnail.name;
  fs.rename(tmp_path, target_path, function (err) {
    if (err) throw err;
    fs.unlink(tmp_path, function () {
      if (err) throw err;
      console.log('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
      res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
    });
  })
})


apiRouter.post('/user', events_controller.readCreate);
apiRouter.post('/image', upload.single('image'), function (req, res, next) {
  console.log('File upload service');
  console.log(req.file);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});
apiRouter.get('/', events_controller.getAll);
apiRouter.post('/', events_controller.create);
apiRouter.get('/:id', events_controller.get);
apiRouter.put('/:id', events_controller.update);
apiRouter.del('/:id', events_controller.delete);


module.exports = apiRouter;
