var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(
    {
      users: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ]
    }
  );
});

module.exports = router;
