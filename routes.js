module.exports = function myRegistrationsRoutes(greetings) {

    async function home(req, res) {

        res.render('index', {
            //message: req.flash('error'),
            //counter: await greetings.setCounter(),
        });

    }
    /*async function greetedPage(req, res) {
        res.render('greeted', {
            greeting: await greetings.greeted(),


        });
    }
    async function counterPage(req, res) {
        const user = req.params.name;

        userGreeted = await greetings.individualCounter(user);

        res.render('counter', {
            user,
            userGreeted
        });


    }
    async function postData(req, res) {
        const { name, lang } = req.body;
        if (!lang) {
            req.flash('error', 'Please select a language!');

        }
        else if (!name) {
            req.flash('error', 'Please enter your name!');

        }
        else {

            await greetings.pushNames(req.body.name);


        }
        res.render('index', {
            message: req.flash('error'),
            greetMessage: greetings.greet(name, lang),
            counter: await greetings.setCounter(),

        });
    }
    async function resetData(req, res) {
        await greetings.resetDatabase();
        res.redirect('/');

    }*/
    return {
        home,
        //greetedPage,
        //counterPage,
        //postData,
        //resetData
    }

}