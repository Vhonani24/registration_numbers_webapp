module.exports = function myRegistrationsRoutes(registrations) {

    async function home(req, res) {
        var getRegies = await registrations.getRegistrations();

        console.log(getRegies + 'show reg');

        res.render('index', {
            message: req.flash('error'),
            success: req.flash('error1'),
           // warning: req.flash('error2'),
            listOfRegies: getRegies

        });

    }
   
    async function getFilter(req, res) {

        res.render('index', {
            message: req.flash('error')

        });
    }
    async function postFilter(req, res) {
        let town = req.body.towns;
        console.log(town + " this is my towns");
        
        if (!town) {
            req.flash('error', 'Please select from drop down menu')

        } else {
             all = await registrations.filterTowns(town)
        }  res.render('index', {
            listOfRegies: all
        });
    }
   

    async function postData(req, res) {
        const { reg } = req.body;
     

        if (!reg) {
            req.flash('error', 'Please add a valid registration number!');

        }
        /*if (reg===reg) {
            req.flash('error2', 'This registration number already exist, try adding another one.');

        }*/
        else {
            console.log(reg)
          req.flash('error1', 'Hurray! You have successfully added a valid registration number!!');
           
            

            await registrations.addRegistration(reg);


        }
        res.redirect('/');
    }
    async function resetData(req, res) {
        await registrations.resetDatabase();
        res.redirect('/reg_numbers');

    }
    return {
        home,
        postData,
        resetData,
        getFilter,
        postFilter

    }

}