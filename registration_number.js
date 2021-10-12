
module.exports = function Registrations(pool) {
    
    var regex = /^[a-zA-Z]{2}\s[0-9]+$/;

    async function getRegistrations() {
        const result = await pool.query("select * from regNumber")

        return result.rows;

    }
    async function addRegistration(reg) {
        var townTag = reg.substring(0,2)
        console.log(townTag + "this is townTag")
        var towns_id = await getId(townTag)
        console.log(towns_id + "this is towns_id")

        await pool.query("INSERT INTO regNumber(reg,town_id)  values($1,$2)", [reg,towns_id])

    }
    async function getId(startString){
        var result = await pool.query("select id from towns where start = $1", [startString])
        return result.rows[0].id


    }
    
    async function getRegistration() {
        //console.log(regNum + "this is regnum");
        const result = await pool.query("select * from regNumber")
        return result.rows

    }
    function addReg(reg,town) {


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

    async function pushRegNum(reg) {
        var regToUpperCase = reg.toUpperCase()
        try {
            var uniqueReg = await getRegistration(regToUpperCase)
            if (uniqueReg.rowCount === 0) {
                var result = await addRegistration(regToUpperCase)
            }
            else {
                
            }


        } catch (err) {
            console.error('Oops error has been detected!', err);
            throw err;
        }


    }

  
   
    async function resetDatabase() {
        await pool.query(`DELETE  FROM regNumber`)

    }

    return {
        getId,
        getRegistrations,
        pushRegNum,
        addReg,
        resetDatabase,
        getRegistration
    }


}