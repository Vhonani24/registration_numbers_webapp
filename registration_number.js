
module.exports = function Registrations(pool) {

    var regexA = /^[a-zA-Z]{2}\s[0-9]+$/;//allows space after CA
    var regexB = /^[a-zA-Z]{2}\s[0-9._-]+$/;
    var regexC = /^[a-zA-Z]{2}\s[0-9.\s]+$/;


    async function getRegistrations() {
        const result = await pool.query("select  * from regNumber")

        return result.rows;

    }
    
    async function addRegistration(reg) {
        if (reg.match(regexA) || reg.match(regexB) || reg.match(regexC)) {
            var townTag = reg.substring(0, 2).toUpperCase();
            console.log(townTag + "this is townTag")
            var towns_id = await getId(townTag)
            console.log(towns_id + "this is towns_id")
 

            await pool.query("INSERT INTO regNumber(reg,town_id)  values($1,$2)", [reg.toUpperCase(), towns_id])
        }

    }

    async function getId(startString) {
        var result = await pool.query("select * from towns where start = $1", [startString])
        var rowResults = result.rows;
        return rowResults[0].id


    }


    async function getRegistration() {
        //console.log(regNum + "this is regnum");
        const result = await pool.query("select * from regNumber")
        return result.rows

    }
    function addReg(reg, town) {


        if (reg.match(regex)) {
            if (town === "All Towns") {
                return reg.toUpperCase();
            }
            if (town === "Bellville") {
                return reg.toUpperCase();
            }
            if (town === "Cape Town") {
                return reg.toUpperCase();
            }

        }


    }

    //add a function to filter through reg




    async function resetDatabase() {
        await pool.query(`DELETE  FROM regNumber`)

    }

    return {
        getId,
        getRegistrations,
        addReg,
        resetDatabase,
        getRegistration,
        addRegistration
    }


}