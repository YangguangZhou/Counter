// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const db = aircode.db;

module.exports = async function(params, context) {
  console.log('Received params:', params);
  if(context.method === 'POST') {
    const table = db.table('counter');
    const name = params.name;
    if(!name) {
      context.status(403);
      return {
        error: 'Invalid name!',
      };
    }
    let data;
    const result = await table.where({name}).findOne();
    if(!result) {
      data = {times: 0, name};
    } else {
      data = result;
    }
    data.times++;
    await table.save(data);
    return data;
  }
  context.status(403);
  return {
    error: 'Method not allowed!',
  };
}