class Item {
  constructor (data) {
    self.title = data.title
    self.info = data.info
    self.pic = data.pic || null
    self.years = {
      start: data.start,
      end: data.end || null,
      summary: data.years_title || null
    }
  }
}
/*
class TimelineMe {
  constructor () {
    self.events = []
    self.timelineWrapper = '#timeline_me'
  }
  addEvent (newEvent) {
    self.events.push(newEvent)
  }
  buildTimeline () {
    const wrapper = $(self.timelineWrapper)
    const yearEvents = self.buildYearEvents()


  }
  buildYearEvents () {
    var yearlyEvents = {}
  }
}
*/
const myTimeline = new TimelineMe()

myTimeline.addEvent(new Item({
  title: 'Born',
  info: '',
  pic: null,
  start: 1995,
  end: null
}))


var music4deejays = new Item({
  title: 'Music4deejays',
  position: 'Software Engineer & Founder',
  info: 'Got more than 56,000 downloads',
  pic: '',
  start: 2013,
  end: 2015
})
var ucm = new Item({
  title: 'Universidad Complutense de Madrid',
  position: 'Computer Science Student',
  info: 'Bacheler\'s degree in english',
  pic: '',
  start: 2013,
  end: 2017
})
var huawei = new Item({
  title: 'Huawei',
  position: 'Scholarship in China',
  info: 'Leader in Spanish Group',
  pic: '',
  start: 2016,
  end: 2016,
  years_title: 'Summer 2016'
})
var dailyfocus = new Item({
  title: 'Dailyfocus',
  position: 'Software Engineer and Founder',
  info: 'Top project in college.',
  pic: '',
  start: 2016,
  end: 'current'
})


var data = [
  born,
  music4deejays,
  ucm,
  huawei,
  dailyfocus
]

