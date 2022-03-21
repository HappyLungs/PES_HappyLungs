export default class Pin {
    constructor(name, location, description, media, rating, public) {
      this.name = name;
      this.location = location;
      this.description = description;
      this.media = media;
      this.rating = rating;
      this.public = public;
    }
  
    create_pin(name, location, description, media, rating, public) {}
    
    //Getters
    get recomended_IDs() {
        return this.show_recomended_IDs;
    }

    get charts() {
        return this.show_charts;
    }

      //returns true if public pin
    get public() {
        return this.public;
    }

    show_recomended_IDs(){}
  
    show_charts() {}

    addCalendarEvent() {
      var gapi = window.gapi
      var CLIENT_ID = "940094993561-ul26es9rio610t1gj6161n2n1oqo6nc0.apps.googleusercontent.com"
      var API_KEY = "AIzaSyDnGgm8vf2p1rWoEQPb2OxXREvhIh2-CJk"
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
      var SCOPES = "https://www.googleapis.com/auth/calendar.readonly"

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'))

      gapi.auth2.getAuthInstance().signIn().then(() => {
        var event = {
          'summary': 'Awesome Event!',
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'Really great refreshments',
          'start': {
            'dateTime': '2020-06-28T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': '2020-06-28T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
          ],
          'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
        

        /*
        // get events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        */
      })
    }
}
