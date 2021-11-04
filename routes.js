module.exports = function myRegistrationsRoutes(registrations) {
  const regexA = /^[a-zA-Z]{2}\s[0-9]+$/;
  const regexB = /^[a-zA-Z]{2}\s[0-9._-]+$/;
  const regexC = /^[a-zA-Z]{2}\s[0-9.\s]+$/;
  async function home(req, res) {
    const getRegies = await registrations.getRegistrations();

    res.render('index', {
      message: req.flash('error'),
      success: req.flash('success'),
      warning: req.flash('warning'),
      listOfRegies: getRegies,

    });
  }

  async function getFilter(req, res) {
    res.render('index', {
      message: req.flash('error'),

    });
  }
  async function postFilter(req, res) {
    const town = req.body.towns;
    const all = await registrations.filterTowns(town);
    res.render('index', {
      listOfRegies: all,
    });
  }

  async function postData(req, res) {
    const { reg } = req.body;

    // eslint-disable-next-line no-undef
    if (!reg) {
      req.flash('error', 'Please add a registration number!');
    } else if (!(reg.match(regexA) || reg.match(regexB) || reg.match(regexC))) {
      req.flash('error', 'Please add a valid registration number!');
    } else if (await registrations.addRegistration(reg) === false) {
      req.flash('warning', 'This registration number already exist, try adding another one.');
    } else if (reg.match(regexA) || reg.match(regexB) || reg.match(regexC)) {
      req.flash('success', 'Hurray! You have successfully added a valid registration number!!');

      await registrations.addRegistration(reg);
    }
    res.redirect('/');
  }
  async function resetData(req, res) {
    await registrations.resetDatabase();
    res.redirect('/');
  }
  return {
    home,
    postData,
    resetData,
    getFilter,
    postFilter,

  };
};
