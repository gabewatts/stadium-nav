// creates and returns a div containing event information
//
// return:
// <div>
//     <label for="event.id">
//         <span>event.name</span>
//         <span>event.date</span>
//     </label>
//     <input type="radio" name="eventSection" id="event.id"></div>
//     <div>
//         <span>event.venueName</span>
//         <p>event.description</p>
//     </div>
// </div>
export const createEvent = ( event ) => {
    const div = document.createElement( 'div' );
    const label = document.createElement( 'label' );
    const id = `${event.id}_${event.date_converted}`;
    label.htmlFor = id;
    const name = document.createElement( 'span' );
    name.innerHTML = event.name;
    const date = document.createElement( 'span' );
    date.innerHTML = event.date_converted;
    label.append( name, date );
    const checkbox = document.createElement( 'input' );
    checkbox.type = 'radio';
    checkbox.name = 'eventSection';
    checkbox.id = id;
    const details = document.createElement( 'div' );
    const location = document.createElement( 'span' );
    location.innerHTML = event.venueName;
    const description = document.createElement( 'p' );
    description.innerHTML = event.description;
    details.append( location, description );
    div.append( label, checkbox, details );
    return div;
};
