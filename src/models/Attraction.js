const db = require("../config/db");

exports.createAttraction = async (a) => {
  const query = `
    INSERT INTO attractions
    (name, slug, additional_info, cancellation_policy, images, price, includes, country, city)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
  `;
  await db.query(query, [
    a.name,
    a.slug,
    a.additionalInfo,
    a.cancellationPolicy,
    JSON.stringify(a.images),
    a.price,
    a.includes,
    a.country,
    a.city
  ]);
};
