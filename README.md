# RoadRate
<div align="center">
  <img src="./src/assets/icon-above-font.png" width="100px">
</div>
<p align="center">Choose Rate, not Rage</p>

## What is RoadRate?
**Have you ever been perplexed by a neighbor that continuously parks in a way that blocks you from using an otherwise perfectly viable space?**

With RoadRate, you can find their license plate, rate it, and leave an anonymous review.

**What about that time you relied on the help of a stranger for a jump?**
Use RoadRate to publically acknowledge how impactful the kindness of strangers can be.

We developed RoadRate to so that drivers can communicate with each other about the road. With a click of a button you can get your points across anonymously. 

## What is RoadRate?
RoadRate is a social platform for reviewing your fellow drivers and seeing how well your own plate's *RoadRate. Register license plates, browse/search/post reviews, and build up your karma score to let other's know you're a great driver. RoadRate was founded to safely and anonymously encourage quality road etiquette for the over 220 million drivers currently licensed in America.

*RoadRate encourages positive reviews for enviable driving skills and random acts of kindness, and as such, honest negative reviews where there is room for improvement and need are also encouraged.

For version 2, we want to incorporate a tipping feature to encourage rewards for good driving.

## Quick Links
- [Client Repo](https://github.com/thinkful-ei26/roadrate-client)
- [Server Repo](https://github.com/thinkful-ei26/roadrate-server)
- [Deployed Client](https://road-rate-client.herokuapp.com/)
- [Deployed Server](http://road-rate-server.herokuapp.com/) 


## ScreenShot


## V1 Features
- User Registration/Auth/Login
- User Onboarding on landing page
- Users can view reviews about a plate without registering 
- Registered users can leave public reviews anonymously about a plate
- Users can search for a License plate number and view the reviews written about it
- A registered user can claim and unclaim a license plate. 
- Registered can view all of the reviews/feedback they have written about other license plates in a tab “My Reviews”
- Once a user claim a plate, they can see the associated reviews about the plates in the "My Plates" tab. 
- Public reviews are accessible by anyone
- User is able to filter the reviews by license plate #

## V2 Features
- Anonymous tipping
- Karma Score Gamification

## Tech Stack
**Front End:** 
  - [Create React App](https://github.com/facebook/create-react-app)
  - [React](https://github.com/facebook/react)
  - [React Hooks](https://reactjs.org/docs/hooks-intro.html)
  - [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

**Back End:** 
  - [Node](https://github.com/nodejs/node)
  - [Express](https://github.com/expressjs/express)
  - [Passport](http://www.passportjs.org/)
  - [MongoDB](https://github.com/mongodb/mongo)
  - [Mongoose](https://github.com/Automattic/mongoose)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

**Testing:** 
  - [Mocha](https://mochajs.org/)
  - [Chai](https://www.chaijs.com/)

**Workflow** 
  - [Agile](https://www.agilealliance.org/)/[Scrum](https://www.scrum.org/)
  - Check out the [Road Rate Trello Board](https://trello.com/b/Zc46dooe/oh-my-quad)

## Team
- **[Jordan Haddadi](https://github.com/jordanhaddadi)** - Design Lead
- **[Randy Sartor](https://github.com/Rjsartor)** - Product Manager
- **[RP Boyle](https://github.com/RPBoyle11)** - QA Lead
- **[Trisha Aguinaldo](https://github.com/kronicle114)** - Project Manager

## API

```
/api
.
├── /auth
│   └── POST
│       ├── /login
│       └── /refresh
├── /users
│   └── POST
│       └── /
├── /plates
│   └── GET
│       ├── /
│       ├── /:id
│       ├── /all/:id
│       ├── /:plateState/:plateNumber
│   └── POST
│       └── /
│   └── PUT
│       ├── /:userId
│       ├── /unclaim/:userId
├── /reviews
│   └── GET
│       └── /
│       ├── /my-plates/:plateId
│       ├── /plate/:plateId
│       ├── /:plateState/:plateNumber
│       ├── /:userId     <-- GET all reviews by userId
│       ├── /:id         <-- GET one review by reviewId
│   └── POST
│       └── /
│   └── PUT
│       └── /:id
```

## Twitter/ProductHunt
- [Twitter](https://twitter.com/RoadRateNow)  <img src="./src/assets/twitter.svg" width="20px" alt="ProductHunt svg icon"/> 
- [ProductHunt](#) <img src="./src/assets/product-hunt.svg" width="20px" alt="ProductHunt svg icon"/> 

## Wireframes

<img src='./src/assets/wireframe.png' alt='RoadRate Wireframes' width='800px'/>