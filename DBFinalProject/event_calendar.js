/* Form to Register Events */
// Get form input values
const eventDate = document.getElementById('eventDate').value;
const eventTime = document.getElementById('eventTime').value;
const eventDescription = document.getElementById('eventDescription').value;

// Create an event object
const newEvent = {
  date: eventDate,
  time: eventTime,
  description: eventDescription
};

// Add the event object to the calendar
addEventToCalendar(newEvent);

// Clear the form
event.target.reset();
});

function addEventToCalendar(event) {
// Your logic to add the event to the calendar
}