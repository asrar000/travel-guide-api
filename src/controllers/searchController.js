exports.search = async (req, res, next) => {
  try {
    const location = req.params.locationname;

    res.json({
      GeoInfo: { location },
      Flights: [],
      Attractions: []
    });
  } catch (err) {
    next(err);
  }
};
