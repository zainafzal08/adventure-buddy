# Adventure Buddy

This is a app to help players play DnD and help Dm's run it. It's main goal is to provide a lot of the features other Dnd tools provide but to make the experience extremely simple and user friendly.

It should make someones journey of playing DnD focused on the playing and not on the math or paper keeping.

The app should be able to be used without ever having to google how to do it. If the application becomes difficult or confusing or overwhelming the features should be scaled back. The goal is to be easy to pick up and use over all else.

The app is split up into the frontend and the backend. Each one has a dockerfile that does nothing for the moment. When ready for a production push both will be built into docker containers and combined via a docker-compose file into a app listening on a localhost. This can then be deployed on any box with a reverse proxy.

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
4. to run the dev server do `npm run dev`

# Concepts

Each character has a `CharacterSheet` object that encodes all information for that character.
A new character is created when the new character form is correctly submitted. This character
is appended into the redux state and will be available in the gallery. Edits on this character
can then happen in the play UI via a mutation interface. During play all character mutations
happen through a SheetMutator class instance. This is created with the player state and has
the ability to accept character mutations. It will log all mutations in a session and disallow
any mutation which puts the character in a invalid state. After any successful update it will update the
redux state to match such that the redux character sheet is a source of VALID truth.

# Milestones

# V.0

**MVP**

The aim of this milestone is to have just a basic page which mimics a character sheet and a handbook people can use to quickly look up spells, items etc. This will involve setting up a basic database of all things Dnd which will server as a foundation for all future features. This database is likely to be incomplete but hopefully can be a good starting point, in future opensourcing the database so people can add to it is how i imagine it growing / being corrected.

Users can edit the page just as they can fill in a sheet to update health, stats etc. Most of the page will (unlike a physical sheet) automatically update when base stats change, i.e all skills are auto calculated from
prof bonus + stat.

After any change the sheet should save, for V.0 this is propegated to local storage. There is no server yet.

List of things that the sheet should show

- [X] Character Name
- [X] Character Race and Class
- [X] Character Level
- [ ] Character Stats (str, wis, etc.)
- [ ] HP
- [ ] Inspiration
- [ ] Proficiency Bonus
- [ ] Perception
- [ ] Hit Dice
- [ ] Spell Slots
- [ ] Spells (Text field entry for V.0)
- [ ] Skills
- [ ] Saving Throws
- [ ] Equipment
- [ ] Attacks
- [ ] Other information (just a text field which supports markdown)
- [ ] Death Rolls

**Additional features to make this a proper v.0**

- Have an searchable spell list users can use to find spells to use
    - Should automatically filter given their level / class.
    - Clicking on a spell should give detailed information about the spell
- Let the user enter temporary stats such as the effects of a spell like shield of faith
- Delete and duplicate a character sheet
- Better loading ui then 'loading innit'
- Basic notes tab for players + DMs where you can title and tag enteries
  and search for them in the DM handbook.
      - Idea being that you can jot down story items like gladeron #city
      king is a douchebag.

# V.1

The aim of this milestone is to give the user features that a paper sheet does not give.

- Give the user a easy way to roll dice, such as a text field which parses input such as "3d8 + d5 + 8" (there are npm packages that do this for us).
    - Additionally allow users to quickily roll initative / saving throws by automatically adding the relevant modifiers.
- Give quick methods to trigger a hit (lose HP) or a rest (gain HP + spell slots)
- Give a quick method to cast a spell and use up a spell slot
- Have a login flow and upsync/downsync data from the server
- Have shareable character sheets which are locked to read only
- Improve database
- Full tablet and mobile support

# V.2
To be fleshed out...

- Improve the home page.
- let users upload a image for their character sheet
- Have a new character flow to create a new character
- store all changes to character sheet so we can make graphs of health and have stats like "# times died"

# V.4
To be fleshed out...

- Proper DM features (console etc.)
    - Have a screen with all characters / monsters
    - Keep track of initative and whose turn it is
    - Quick monster generator