
module.exports = function Registrations(pool) {

    var regexA = /^[a-zA-Z]{2}\s[0-9]+$/;
    var regexB = /^[a-zA-Z]{2}\s[0-9._-]+$/;
    var regexC = /^[a-zA-Z]{2}\s[0-9.\s]+$/;
    


    async function getRegistrations() {
        const result = await pool.query("select * from regNumber")

        return result.rows;

    }
    async function getRegistration() {
        const result = await pool.query("select reg from regNumber")

        return result.rows;

    }
   
    async function filterTowns(town) {
        
        if (town === "All") {
            const result = await pool.query("select * from regNumber")

            return result.rows;
            
        }
         else {

            const result = await pool.query("select reg from regNumber where town_id =$1", [town])

            return result.rows;

        }
    }

    async function addRegistration(reg) {
        var regNum = reg.toUpperCase()
        var result = await regExist(regNum)
        if (regNum.match(regexA) || regNum.match(regexB) || regNum.match(regexC)) {
            try {

                if (result.rowCount === 0) {
                    var townTag = regNum.substring(0, 2).toUpperCase();
                    var towns_id = await getId(townTag)
                    
                    await pool.query("INSERT INTO regNumber(reg,town_id)  values($1,$2)", [regNum, towns_id])
                    return true;

                }else{
                    return false
                }

            } catch (err) {
                console.error('Oops error has been detected!', err);
                throw err;

            }
        }
    }


    async function getId(startString) {
        var result = await pool.query("select * from towns where start = $1", [startString])
        var rowResults = result.rows;
        return rowResults[0].id


    }


    async function regExist(reg) {

        const result = await pool.query("select reg from regNumber where reg = $1", [reg])
        return result

    }

    async function resetDatabase() {
        await pool.query(`DELETE  FROM regNumber`)

        

    }

    return {
        getId,
        getRegistrations,
        resetDatabase,
        regExist,
        addRegistration,
        filterTowns,
        getRegistration
    }


}