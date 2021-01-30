module.exports = (req, res) => {
    res.status(200).json({
    message: 'My Rule-Validation API',
    status: 'success',
    data: {
      name: 'Sunkanmi Olalude',
      github: '@olaludesunkanmi',
      email: 'olaludesunkanmi@yahoo.com',
      mobile: '07068110841',
      twitter: '@nelsunky',
    },
  });
}