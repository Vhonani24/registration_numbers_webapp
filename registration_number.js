/* eslint-disable no-unreachable */
/* eslint-disable no-use-before-define */
module.exports = function Registrations(pool) {
  const regexA = /^[a-zA-Z]{2}\s[0-9]+$/;
  const regexB = /^[a-zA-Z]{2}\s[0-9._-]+$/;
  const regexC = /^[a-zA-Z]{2}\s[0-9.\s]+$/;

  async function getRegistrations() {
    const result = await pool.query('select * from regNumber');

    return result.rows;
  }
  async function getRegistration() {
    const result = await pool.query('select reg from regNumber');

    return result.rows;
  }

  async function filterTowns(town) {
    if (town === 'All') {
      const result = await pool.query('select * from regNumber');

      return result.rows;
    }
    const result = await pool.query('select reg from regNumber where town_id =$1', [town]);

    return result.rows;
  }

  // eslint-disable-next-line consistent-return
  async function addRegistration(reg) {
    const regNum = reg.toUpperCase();
    const result = await regExist(regNum);
    if (regNum.match(regexA) || regNum.match(regexB) || regNum.match(regexC)) {
      try {
        if (result.rowCount === 0) {
          const townTag = regNum.substring(0, 2).toUpperCase();
          // eslint-disable-next-line camelcase
          const towns_id = await getId(townTag);

          // eslint-disable-next-line camelcase
          await pool.query('INSERT INTO regNumber(reg,town_id)  values($1,$2)', [regNum, towns_id]);
          return true;
        }
        return false;
      } catch (err) {
        console.error('Oops error has been detected!', err);
        throw err;
      }
    }
  }

  async function getId(startString) {
    const result = await pool.query('select * from towns where start = $1', [startString]);
    const rowResults = result.rows;
    return rowResults[0].id;
  }

  async function regExist(reg) {
    const result = await pool.query('select reg from regNumber where reg = $1', [reg]);
    return result;
  }

  async function resetDatabase() {
    await pool.query('DELETE  FROM regNumber');
  }

  return {
    getId,
    getRegistrations,
    resetDatabase,
    regExist,
    addRegistration,
    filterTowns,
    getRegistration,
  };
};
