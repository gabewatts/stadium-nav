const Event = require('./models/Event');
const db = require('./DBConnection');

async function getEvents() {
  return db.query('SELECT * FROM event').then(({results}) => {
    let ret = results.map(event => new Event(event)); ;
    return sortEvents(ret);
  });
}

async function getEventByName(eventName) {
  return db.query('SELECT * FROM event WHERE evt_name=?', [eventName]).then(({results}) => {
    if (results[0]) {
      return new Event(results[0]);
    }
  });
}

async function getEventById(eventId) {
  return db.query('SELECT * FROM event WHERE evt_id=?', [eventId]).then(({results}) => {
    if (results[0]) {
      return new Event(results[0]);
    }
  });
}

//returns all event objects with venue fields that match the provided venue name
async function getEventsByVenue(venueName) {
  return db.query('SELECT * FROM event WHERE ven_name=?', [venueName]).then(({results}) => {
    let ret = results.map(event => new Event(event));
    return sortEventsByVenue(ret);
  });
}

async function getUpcomingEvents() {
  return db.query('SELECT * FROM event JOIN venue ON venue.ven_id=event.ven_id').then(({results}) => {
    let events = results.map(res => new Event(res));
    const now = new Date().getTime();
    let futureEvents = events.filter( event => new Date( event.date ).getTime() > now );
    return sortEvents( futureEvents );
  }) 
}

async function createEvent(event) {
  return db.query('INSERT INTO event (evt_name, evt_descr, ven_id, date_string, evt_map) VALUES (?, ?, ?, ?, ?)',
  [event.name, event.description, event.venue, event.date, event.map]).then(({results}) => {
      return this.getEventById(results.insertId);
  });
}

module.exports = {
  getEvents: getEvents,
  getEventByName: getEventByName,
  getEventById: getEventById,
  getEventsByVenue: getEventsByVenue,
  createEvent: createEvent,
  getUpcomingEvents: getUpcomingEvents,
};

function sortEvents(events) {
  return events.sort(timeComparator);
}

function sortEventsByVenue(events) {
  return events.sort(venueComparator);
}

function timeComparator(a, b) {
  const d1 = new Date(a.date);
  const d2 = new Date(b.date);

  return d1.getTime() - d2.getTime();
}

function venueComparator(a, b) {
  const v1 = a.venueName;
  const v2 = b.venueName;

  return v1 - v2;
}

// function upcoming(date) {
//   let d1 = new Date(date);
//   d1.setHours(d1.getHours() + 6);

//   let d2 = new Date();

//   return (d1 >= d2);
// }