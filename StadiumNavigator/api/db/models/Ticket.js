module.exports = class {
    id = null;
    owner = null;
    event = null;
    seatMap = null;
    seatInfo = null;
    parkingMap = null;
    name = null;
    description = null;
    venueId = null;
    venueName = null;
    venueMap = null;
    venueMapLot = null;
    venueLocation = null;
    date_converted = null;
    date = null;
    mapBathroom = null;
    mapVendor = null;
    mapServices = null;
    qrCode = null;
    barCode = null;
  
    constructor(data) {
        this.id = data.tkt_id;
        this.owner = data.usr_id;
        this.event = data.evt_id;
        this.seatMap = data.tkt_seat_map;
        this.seatInfo = data.tkt_seat_desc;
        this.parkingMap = data.tkt_parking_map;
        this.name = data.evt_name;
        this.description = data.evt_descr;
        this.venueId = data.ven_id;
        this.venueName = data.ven_name;
        this.venueMap = data.ven_map;
        this.venueMapLot = data.ven_map_parking;
        this.venueLocation = `${data.ven_name} is at ${data.address_street} in ${data.address_city},${data.address_state} ${data.address_zip}.`;
        this.date = data.date_string;
        this.date_converted = convertDate(data.date_string);
        this.mapBathroom = data.evt_bathroom_map;
        this.mapVendor = data.evt_vendor_map;
        this.mapServices = data.evt_services_map;
        this.qrCode = data.tkt_qr_code;
        this.barCode = data.tkt_bar_code;
    }
};

function convertDate(date) {
    let eventdate = new Date(date)
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