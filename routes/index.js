var express = require('express');
var i18next = require('i18next')
var router = express.Router();
const fs = require('fs-extra')
var curLanguage = require('../locales/lang_helper').getCurLanguage();
// const deault_lang = 'pt'
// require('../locales/lang_helper')


router.get('/switch/:lang', function(req, res) {

  require('../locales/lang_helper').setNewLanguage(req.params.lang);

  var oldURL = req.headers.referer
  // const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

  var split_array = oldURL.split("/")

  console.log(split_array.length)
  console.log('Original url '+oldURL)
  console.log('Before Replacement '+ split_array[3])

  split_array[3] = req.params.lang

    var jointArray = []
  for (let index = 0; index < split_array.length; index++) {
    // jointArray.concat(split_array[index]);
    jointArray.push(split_array[index])
    
  }

  var stringArray = split_array.toString()


  var stringFinished = stringArray.split(",").join("/")


  // console.log(stringArray.replace(",", "/")) 
  console.log(stringFinished)
  console.log('After Replacement '+split_array[3])
  console.log('Final changed url '+split_array)

  var curLanguage = require('../locales/lang_helper').getCurLanguage;

  return res.redirect(stringFinished);
  // return res.redirect('/'+curLanguage);
})

router.get('/:lang/contact', function( req, res) {

  var curLanguage = require('../locales/lang_helper').getCurLanguage();

  try {
    
      const data = fs.readFileSync("./locales/"+curLanguage+"/translation.json", "utf8")
      const t = JSON.parse(data)

      res.render('contact_page', { title: 'Express',  t, curLanguage})
    } catch (err) {
      console.error(err)
    }
})


router.get('/:lang', async function(req, res, next) {

  var lng = req.language // 'de-CH'
  var lngs = req.languages // ['de-CH', 'de', 'en']
  req.i18n.changeLanguage(req.params.lang) // will not load that!!! assert it was preloaded

  var curLanguage = require('../locales/lang_helper').getCurLanguage();

  try {
    
      const data = fs.readFileSync("./locales/"+curLanguage+"/translation.json", "utf8")
      const t = JSON.parse(data)

      res.render('home', { title: 'Express',  t, curLanguage});
    } catch (err) {
      console.error(err)
    }
});

module.exports = router;
