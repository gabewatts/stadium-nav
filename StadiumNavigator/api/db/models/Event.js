module.exports = class {
    id = null;
    name = null;
    description = null;
    venueId = null;
    venueName = null;
    date_converted = null;
    date = null;
    mapBathroom = null;
    mapVendor = null;
    mapServices = null;
  
    constructor(data) {
      this.id = data.evt_id;
      this.name = data.evt_name;
      this.description = data.evt_descr;
      this.venueId = data.ven_id;
      this.venueName = data.ven_name;
      this.date = data.date_string;
      this.date_converted = convertDate(data.date_string);
      this.mapBathroom = data.evt_bathroom_map;
      this.mapVendor = data.evt_vendor_map;
      this.mapServices = data.evt_services_map;
    }
  };

function convertDate(date) {
  let eventdate = new Date(date);
  let datestring = eventdate.toDateString();
  let timestring = eventdate.toLocaleTimeString();

  let dws = 0;
  let idx = 0;
  let fullstring = "";
  let dcc = datestring.charAt(idx);
  while (dws < 3)
  {
      if (dcc == " ") {
          dws++;
      }
      fullstring = fullstring + dcc;
      idx++;
      dcc = datestring.charAt(idx);
  }

  fullstring = fullstring.substring(0, fullstring.length - 1) + ", ";

  idx = 0;
  let tcol = 0;
  let tcc = timestring.charAt(idx);
  while (tcol < 2)
  {
      if (tcc == ":") {
          tcol++;
      }
      fullstring = fullstring + tcc;
      idx++;
      tcc = timestring.charAt(idx);
  }

  let timesuffix = timestring.substring(timestring.length - 2, timestring.length) == "PM" ? "pm" : "am";
  return fullstring.substring(0, fullstring.length - 1) + timesuffix;
}