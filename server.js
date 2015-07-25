var express = require('express'),
app = express();
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });
app.use(express.static(path.join(application_root, "StaticPages")));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
