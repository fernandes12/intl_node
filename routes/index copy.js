var express = require('express');
var i18next = require('i18next')
var router = express.Router();
const fs = require('fs-extra')
var currency = require('../locales/lang_helper').getCurrency();
// const deault_lang = 'pt'
// require('../locales/lang_helper')

/* GET home page. */
// router.get('/', function(req, res, next) {


//   var lng = req.language // 'de-CH'
//   var lngs = req.languages // ['de-CH', 'de', 'en']
//   req.i18n.changeLanguage('en') // will not load that!!! assert it was preloaded

//   var exists = req.i18n.exists('myKey')
//   var translation = req.t('myKey')

//   const key_username = req.t('key_username')
//   const key_password = req.t('key_password')

//   res.render('index', { title: 'Express',  key_username, key_password});
// });

// router.get('/cetim/:lang', function(req, res, next) {

//   var lng = req.language // 'de-CH'
//   var lngs = req.languages // ['de-CH', 'de', 'en']
//   req.i18n.changeLanguage(req.params.lang) // will not load that!!! assert it was preloaded

//   var exists = req.i18n.exists('myKey')
//   var translation = req.t('myKey')

//   const key_username = req.t('key_username')
//   const key_password = req.t('key_password')

//   res.render('index', { title: 'Express',  key_username, key_password});
// });

router.get('/:lang', function(req, res) {

  require('../locales/lang_helper').setCurrency(req.params.lang);
  console.log(req.url)
  var currency = require('../locales/lang_helper').getCurrency();
  
  return res.redirect('back');
})

router.get('/cetim/:lang/contact', function( req, res) {


  try {
    
    const data = fs.readFileSync("./locales/"+req.params.lang+"/translation.json", "utf8")
    const t = JSON.parse(data)

    var currency = require('../locales/lang_helper').getCurrency();

    res.render('contact_page', { title: 'Express',  t, currency})
    // res.redirect('back');
  } catch (err) {
    console.error(err)
  }

})

router.get('/pt', function(req, res, next) {

  var lng = req.language // 'de-CH'
  var lngs = req.languages // ['de-CH', 'de', 'en']
  const word = lng.split('-')
  console.log(word[0])
  req.i18n.changeLanguage(req.params.lang) // will not load that!!! assert it was preloaded

  try {
    
      const data = fs.readFileSync("./locales/"+word[0]+"/translation.json", "utf8")
      console.log(data)
      const t = JSON.parse(data)
      var currency = require('../locales/lang_helper').getCurrency();

    res.render('home', { title: 'Express',  t, currency});
  } catch (err) {
      console.error(err)
  }

  // res.render('index', { title: 'Express',  t});
});

router.get('/cetim/:lang', async function(req, res, next) {

  var lng = req.language // 'de-CH'
  var lngs = req.languages // ['de-CH', 'de', 'en']
  req.i18n.changeLanguage(req.params.lang) // will not load that!!! assert it was preloaded

  // var exists = req.i18n.exists('myKey')
  // var translation = req.t('myKey')


  // var lang_picked = req.params.lang
  // const array_lang = require(`../locales/${lang_picked}/translation.json`)

  // const langs = Object.values(array_lang_en);
  // console.log(langs[0])

  //  await fs.readFile("./locales/"+req.params.lang+"/translation.json", "utf8", function(err, data) {
  //     if (err) {
  //       return console.log('Could not read the file')
  //     }
  //     const translation = JSON.parse(data)
  //     res.render('index', { title: 'Express',  translation});
  //   })
  try {
    
    const data = fs.readFileSync("./locales/"+req.params.lang+"/translation.json", "utf8")
    const t = JSON.parse(data)

    var currency = require('../locales/lang_helper').getCurrency();

    res.render('home', { title: 'Express',  t, currency});
    // res.redirect('back');
  } catch (err) {
    console.error(err)
  }

  
});

module.exports = router;
