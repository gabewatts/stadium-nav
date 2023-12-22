module.exports = class {
    id = null;
    name = null;
    city = null;
    state = null;
    address = null;
    map = null;
    mapLot = null;
  
    constructor(data) {
      this.id = data.ven_id;
      this.name = data.ven_name;
      this.city = data.address_city;
      this.state = data.address_state;
      this.address = data.address_street + ', ' + data.address_zip;
      this.map = data.ven_map;
      this.mapLot = data.ven_map_parking;
    }
  };