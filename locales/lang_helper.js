var exchangePrefs = { lang_value: "pt" };
module.exports = { 
    setNewLanguage : function(newVal){ exchangePrefs.lang_value = newVal; },
    getCurLanguage : function(){ return exchangePrefs.lang_value; }
};