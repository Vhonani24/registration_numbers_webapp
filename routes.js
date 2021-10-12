module.exports = function myRegistrationsRoutes(registrations) {

    async function home(req, res) {
        var getRegies =  await registrations.getRegistration();
        console.log(getRegies);

        res.render('index', {
            //message: req.flash('error'),
            listOfRegies: getRegies

            
        });

    }
  
    async function postData(req, res) {
        const { reg } = req.body;
      
        if (!reg) {
            req.flash('error', 'Please add a valid registration number!');

        }
        else {

            await registrations.pushRegNum(reg);


        }
        res.render('index', {
            message: req.flash('error'),
           

        });
    }
    /*async function resetData(req, res) {
        await greetings.resetDatabase();
        res.redirect('/');

    }*/
    return {
        home,
        postData,
        //resetData
    }

}