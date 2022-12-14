const bcrypt = require('bcryptjs');
const timeago = require('timeago.js');
const timeagoInstance = timeago;

const helpers = {};


helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

helpers.timeAgo = (savedTimestamp) => {  
 return savedTimestamp.toLocaleString('en-GB', { timeZone: 'America/Argentina/Buenos_Aires' });
  /* return timeagoInstance.format(savedTimestamp); */
};

helpers.colorEstado =    (cantidad , reposicion)=> {if (cantidad > reposicion) {return "table-success";
}else if (cantidad <= (reposicion+2) && cantidad >= reposicion){
    return "table-warnig";
}else{
     return "table-danger"
    }   
};

helpers.json = (obj) => {
    return JSON.stringify(obj);
  }



module.exports = helpers;