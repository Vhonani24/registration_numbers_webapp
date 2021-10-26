const assert = require('assert');
const Registrations = require('../registration_number');
const pg = require("pg");
const Pool = pg.Pool;
// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://vhonani:vhonani123@localhost:5432/registrations';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

beforeEach(async function () {
    // clean the tables before each test run
    await pool.query("delete from regNumber;");
});

describe('Registration_numbers', function () {

    it('should be able to add a valid reistration number from Cape Town, Bellville or Paarl', async function () {

        let testRegistrations = Registrations(pool);

        await testRegistrations.addRegistration('CA 123-456');
        await testRegistrations.addRegistration('CY 123 456');
        await testRegistrations.addRegistration('CJ 123456');

        assert.deepEqual([
            { reg: 'CA 123-456' },
            { reg: 'CY 123 456' },
            { reg: 'CJ 123456' }
        ]
            , await testRegistrations.getRegistration());
    });
    it('should be able to add a valid registration number from Cape Town with a lowercase town tag and return it in uppercase', async function () {

        let testRegistrations = Registrations(pool);

        await testRegistrations.addRegistration('ca 000-456');



        assert.deepEqual([
            {
                reg: 'CA 000-456'
            }
        ]
            , await testRegistrations.getRegistration());
    });
    it('should NOT be able to add duplicate registration number from Cape Town', async function () {

        let testRegistrations = Registrations(pool);

        await testRegistrations.addRegistration('CA 123-456');
        await testRegistrations.addRegistration('CA 123-456');
        await testRegistrations.addRegistration('CJ 123456');


        assert.deepEqual([
            { reg: 'CA 123-456' },
            { reg: 'CJ 123456' }
        ], await testRegistrations.getRegistration());
    });

});
describe('Filter', function () {
    it('Should be able to return the reg from Cape Town', async function () {

        let testRegistrations = Registrations(pool);

        await testRegistrations.addRegistration('CA 123-456');
        await testRegistrations.addRegistration('Ca 000-111')
        await testRegistrations.addRegistration('CY 000-456');
        await testRegistrations.addRegistration('CJ 123-456');

        assert.deepEqual([
            { reg: 'CA 123-456' },
            { reg: 'CA 000-111' }
        ], await testRegistrations.filterTowns('1'));

    });
    describe('Reset', async function () {

        it('should clear the database when reset', async function () {

            let testRegistrations = Registrations(pool);

            await testRegistrations.addRegistration('CA 123-456');
            await testRegistrations.addRegistration('CY 000-456');
            await testRegistrations.addRegistration('CJ 123-456');
            await testRegistrations.resetDatabase()

            assert.deepEqual([], await testRegistrations.getRegistrations());
        });

    });


});
after(function () {
    pool.end();
});




