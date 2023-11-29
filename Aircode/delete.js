const aircode = require('aircode');
const db = aircode.db;

module.exports = async function(params, context) { 
  const table = db.table('counter');
  let date = new Date();
  date.setDate(date.getDate() - 7);
  
  const results = await table
    .where({ updatedAt: { $lt: date }, times: { $lte: 5 } })
    .find();
  if(results.length === 0){
    return { message: "No data found that matches the conditions" }
  }
  const deleted = await table.delete(results);
  return { delete: deleted.count};
};
