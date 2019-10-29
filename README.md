# Adventure Buddy

This is a app to help players play DnD and help Dm's run it. It's main goal is to provide a lot of the features other Dnd tools provide but to make the experience extremely simple and user friendly.

It should make someones journey of playing DnD focused on the played and not on the math not paper keeping.

The app should be able to be used without ever having to google how to do it. If the application becomes difficult or confusing or overwhelming the features should be scaled back. The goal is to be easy to pick up and use over all else.

The app is split up into the frontend and the backend. Each one has a dockerFile that does nothing for the moment. When ready for a production push both will be built into docker containers and combined via a docker-compose file into a app listening on a localhost. This can then be deployed on any box with a reverse proxy.

# Tech Stack

## Backend

### Introduction
The backend is built in python on a framework called FastAPI. Python will interact with a postgres database which is run in a docker container and exposed to the backend via a docker-compose managed host name.

### How to run

**No real backend code has been written as of yet.**

## Client

### Introduction
This is the frontend which is build on Lit elements. We use babel and rollup to compile the sources into a app.js bundle.

### How to run 
1. Have node and npm install
2. do `npm run install`
3. to build do `npm run build`, output files are put into dist
4. to run a dev server do `npm run dev`, note this will watch all the files in src/ but any changes outside of this folder will not be noticed i.e index.html

# Milestones

# V.0

The aim of this milestone is to have just a basic page which mimics a character sheet. Users can edit the page just as they can fill in a sheet to update health, stats etc.

After any change the sheet should save, for V.0 this is done just by giving the user a unique url at which their sheet is saved. In later milestones there will be a login flow where users can see all of their sheets.

List of things that the sheet should show

- [X] Character Name
- [X] Character Race and Class
- [X] Character Level
- [ ] Character Stats (str, wis, etc.)
- [ ] HP
- [ ] Hit Dice
- [ ] Spell Slots
- [ ] Spells (empty field for V.0)
- [ ] Skills
- [ ] Saving Throws
- [ ] Inspiration
- [ ] Proficiency Bonus
- [ ] Perception
- [ ] Equipment
- [ ] Attacks
- [ ] Other information (just a text field which supports markdown)


# V.1

The aim of this milestone is to give the user features that a paper sheet does not give.

- Have an searchable spell list users can use to find spells to use
    - Should automatically filter given their level / class.
    - Clicking on a spell should give detailed information about the spell
- Give the user a easy way to roll dice, such as a text field which parses input such as "3d8 + d5 + 8" (there are npm packages that do this for us).
    - Additionally allow users to quickily roll initative / saving throws by automatically adding the relevant modifiers.

# V.2
To be fleshed out...

- Have a login
- Have a basic dashboard after login
- let users upload a image for their character sheet

# V.3
To be fleshed out...

- Have a new character flow
- store all changes to character sheet so we can make graphs of health and have stats like "# times died"

# V.4
To be fleshed out...

- Proper DM features (console etc.)