const formidable = require('formidable');
const fs = require('fs');

module.exports = function upload(req, res) {
  const form = formidable({ multiples: true });
  form.parse(req, function(err, fields, files){
    console.log('SAVING FILE TO TEMPORARY FOLDER');
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
    let oldPath = files.file.path;
    let newPath = __dirname + 'server\\assets\\' + files.file.name;
    fs.rename(oldPath, newPath, function (err) {
      if(err){
        console.log(oldPath);
        console.log(newPath);
        console.log('ERROR RENAMING FILE');
      }
      console.log('OK');
      res.end();
    });
  });
  // form.on('file', (field, file) => {
  //   // Do something with the file
  //   // e.g. save it to the database
  //   // you can access it using file.path
  // });
  form.on('end', () => {
    res.json();
  });
  form.parse(req)
};
