const Venue = require('./models/Venue');
const db = require('./DBConnection');

async function getVenues() {
  return db.query('SELECT * FROM venue').then(({results}) => {
    return results.map(venue => new Venue(venue)); ;
  });
}

async function getVenueByName(venueName) {
  return db.query('SELECT * FROM venue WHERE ven_name=?', [venueName]).then(({results}) => {
    if (results[0]) {
      return new Venue(results[0]);
    }
  });
}

async function getVenueById(venueId) {
  return db.query('SELECT * FROM venue WHERE ven_id=?', [venueId]).then(({results}) => {
    if (results[0]) {
      return new Venue(results[0]);
    }
  });
}

async function getVenuesByState(state) {
  return db.query('SELECT * FROM venue WHERE address_state=?', [state]).then(({results}) => {
    return results.map(venue => new Venue(venue)); ;
  });
}

async function createVenue(venue) {
  const full_address = venue.address;
  const length = full_address.length;
  const street_address = full_address.substring(0, length - 8);
  const zip = full_address.substring(length - 6, length - 1);
  return db.query('INSERT INTO venue (ven_name, address_city, address_state, address_street, address_zip, ven_map) VALUES (?, ?, ?, ?, ?, ?)',
  [venue.name, venue.city, venue.state, street_address, zip, venue.map]).then(({results}) => {
    return this.getVenueById(results.insertId);
  });
}

module.exports = {
  getVenues: getVenues,
  getVenueByName: getVenueByName,
  getVenueById: getVenueById,
  getVenuesByState: getVenuesByState,
  createVenue: createVenue,
};