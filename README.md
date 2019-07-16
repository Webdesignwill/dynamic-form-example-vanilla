# Maarktplaats Frontend Test

Demo - (https://marktplaats-test.herokuapp.com/)

I decided not to use React, Angular or Vue for this test and decided to create some vanilla code with some jQuery to aid with some cross browser support and speed

## Backend
The backend is using Mongoose with Mongo to store the data and has a cars database which in turn has the car brands and their respective models.

There are three routes, two of which are for the API:
- /api/cars/brands
- /api/cars/models

Brands simply returns the normalised object with all of the brands and their ID's. The models route expects a url parameter brand_id with the selected brand ID which will then return the models associated with the brand. The / route is for the .ejs index template.

## Frontend
The application object starts off by finding data-component="form-control" objects and then storing them in an object on the application context so that mapping can be done easier. This is also scalable since further elements like 'year' can be added with the data-component attribute.

Using the observer pattern, events are triggered and then responded to once data is saved to the application state. The architecture is based around manipulating the DOM based around the state, much like modern applications.

I chose this as the architecture since there can be some complexity around what elements should be enabled or disabled based on their values. It is much easier to check the state rather than accessing the DOM repeatedly to see if values are there or not. I do this for consistency.

The request object returns a promise which can just be the ajax object from jQuery but there is additional logic so it's neater to keep this as a standalone method on the class.

I use the getters and setters from ES6 to modify the state and then trigger events after they have been updated so the rest of the application has the opportunity to listen and then modify themselves.

## Testing
The application $broker, being exposed can be triggered after the instantiation of the application class. The side effects of this can then be tested quite easily.

const application = new Application()
application.$broker.trigger('event')
expect(application.selectedbrands).toBe({
  cars,
  brands,
  etc
})

Could use async await, axios, redux for state etc but again, wanted to keep it as vanilla and $ as possible for 'fun'.

## SASS
A lot of the utilities and other bits i've cut and pasted from other projects which I have a lot of reusable code to tap in to. Might as well look neat.

## Improvements
The observer, $broker stuff can for sure be tidied up in terms of the way that the ordering in the validator is. I wrote a vanilla validator using the now deprecated Object.observe which the pattern would have fit here nicely to save some of the listeners getting messy (https://github.com/Webdesignwill/vanilla-validation/blob/master/js/main.js)

## Heroku
Deployed to Heroku so that it can be seen working straight away.
