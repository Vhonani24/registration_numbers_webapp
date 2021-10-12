
module.exports = function Registrations(pool) {
    
    var regex = /^[A-Za-z]+$/;

    async function getNames() {
        const result = await pool.query("select * from users")

        return result.rows;

    }
    async function addName(name) {
        await pool.query("INSERT INTO users(name,count) values($1,1)", [name])

    }
    async function updateCounter(name) {
        await pool.query("UPDATE users SET count = count + 1 where name = $1", [name])

    }
    async function getName(name) {
        const result = await pool.query("select * from users where name = $1", [name])
        return result

    }
    function greet(name,lang) {


        if (name.match(regex)) {
            if (lang === "Mandarin") {
                return "你好吗, " + name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            }
            if (lang === "Spanish") {
                return "Como estas, " + name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            }
            if (lang === "French") {
                return "Comment ça va, " + name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            }

        }


    }

    async function pushNames(enterNames) {
        var nameToUpperCase = enterNames.charAt(0).toUpperCase() + enterNames.slice(1).toLowerCase()
        try {
            var uniqueUser = await getName(nameToUpperCase)
            if (uniqueUser.rowCount === 0) {
                var result = await addName(nameToUpperCase)
            }
            else {
                var result = await updateCounter(nameToUpperCase)
            }


        } catch (err) {
            console.error('Oops error has been detected!', err);
            throw err;
        }


    }

    async function setCounter() {
       const names = await getNames()

        return names.length;

    }
    async function individualCounter(individual) {
        var count = await pool.query(`SELECT count FROM users WHERE name = $1`, [individual])
        count = count.rows;
        return count[0].count;
    }
    async function resetDatabase() {
        await pool.query(`DELETE  FROM users`)

    }

    return {
        greet,
        pushNames,
        setCounter,
        greeted:getNames,
        individualCounter,
        resetDatabase,
        addName,
        updateCounter,
        getName
    }


}