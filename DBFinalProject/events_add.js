document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      initialDate: '2024-11-07',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [
        {
          title: 'Open Mic',
          href:'http://127.0.0.1:5501/DBFinalProject/event_registration.html',
          start: '2024-12-24T15:00:00'
        },
        {
          title: 'Painting Class',
          url:'',
          start: '2025-01-06T14:30:00'
        },
        {
          title: 'Live Jazz',
          url:'',
          start: '2025-01-13T14:00:00'
        },
        {
          title: 'Trivia',
          url:'',
          start: '2025-01-20T15:00:00'
        },
        {
          title: 'Book Club',
          url:'',
          start: '2025-01-28T11:30:00'
        },
        {
          title: 'Trivia',
          url:'',
          start: '2025-02-03T15:00:00'
        },
        {
            title: 'Painting Class',
            url:'',
            start: '2025-02-10T15:00:00'
        },
        {
            title: 'Karaoke',
            url:'',
            start: '2025-02-18T14:30:00'
        },
        {
            title: 'Art Show',
            url:'',
            start: '2025-02-24T14:30:00'
        },
        {
            title: 'Book Club',
            url:'',
            start: '2025-02-25T11:30:00'
        }
      ]
    });
  
    calendar.render();
  });
  