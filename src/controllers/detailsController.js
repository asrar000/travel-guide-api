exports.details = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { searchtype } = req.query;

    res.json({
      GeoInfo: {},
      [searchtype === "flight" ? "Flight" : "Attraction"]: { id }
    });
  } catch (err) {
    next(err);
  }
};
