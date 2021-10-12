const assert = require('assert');
const Greetings = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool;
// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://vhonani:vhonani123@localhost:5432/greet';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

beforeEach(async function () {
    // clean the tables before each test run
    await pool.query("delete from users;");
});

describe('The greet function', function () {

    it('should set counter to 0 when database is reset', async function () {

        let testGreet = Greetings(pool);

        await testGreet.resetDatabase();

        assert.equal(0, await testGreet.setCounter());
    });
    it('should be able to take in a name and return a greeting in Mandarin and that name with the first letter uppercased', function () {

        let testGreet = Greetings();


        assert.equal('你好吗, Ted', testGreet.greet('ted', 'Mandarin'));
    });
    it('should be able to take in a name and return a greeting in French and that name with the first letter uppercased', function () {

        let testGreet = Greetings();


        assert.equal('Comment ça va, Ted', testGreet.greet('ted', 'French'));
    });

});
describe('Counter', function () {
    it('Should be able to return the count number if one person greeted', async function () {

        let testGreet = Greetings(pool);

        await testGreet.addName('Musa');
        await testGreet.updateCounter('Musa');

        assert.equal(1, await testGreet.setCounter());

    });
    it('Should be able to return the count number if same person greetet in all 3 langauges', async function () {

        let testGreet = Greetings(pool);


        await testGreet.pushNames('Musa');
        await testGreet.pushNames('Musa');
        await testGreet.pushNames('MUsa');
        testGreet.greet('Musa', 'French');
        testGreet.greet('Musa', 'Spanish');
        testGreet.greet('Musa', 'Mandarin');

        assert.equal(1, await testGreet.setCounter());

    });



});
describe('Name list', async function () {
    it('Should be able to return the list of all the names greeted', async function () {

        let testGreet = Greetings(pool);


        await testGreet.pushNames('Musa');
        await testGreet.pushNames('Mulalo');
        await testGreet.pushNames('Naledi');
        await testGreet.pushNames('Piet');
        
        var nameList = [];
        var greeted = await testGreet.greeted();
        for (var i = 0; i < greeted.length; i++) {
            nameList.push(greeted[i].name);
            //console.log(nameList);

        }



        assert.deepEqual(
            ["Musa","Mulalo","Naledi","Piet"], nameList)


    });
    it('Should be able to return the list of all the names greeted', async function () {

        let testGreet = Greetings(pool);

        await testGreet.pushNames('Mulalo');
        await testGreet.pushNames('Mulalo');
        await testGreet.pushNames('Mashudu');

        var nameList = [];
        var greeted = await testGreet.greeted();
        for (var i = 0; i < greeted.length; i++) {
            nameList.push(greeted[i].name);
            //console.log(nameList);

        }

        assert.deepEqual(["Mulalo","Mashudu"], nameList)

    });

});
after(function () {
    pool.end();
});




