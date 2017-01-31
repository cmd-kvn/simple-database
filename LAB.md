<img src="https://cloud.githubusercontent.com/assets/478864/22186847/68223ce6-e0b1-11e6-8a62-0e3edc96725e.png" width=30> Simple Database
===

## Doc/Resources
* [Node fs docs](https://nodejs.org/api/fs.html)
* JSON [stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 
and [parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
* Checkout `mkdirp` and `rimraf` on `npm`

##Description:
This assignment will have you create a very simple database using json files and the file system.

**You are strongly encouraged to pair on this assignment**

## Testing
You should use TDD to drive the implementation. Note that these are E2E tests. You can write unit tests
if you have identifyable modules that can be tested (you may not). 

Do not inspect the file system in your tests. Build logically consistent tests (empty array, 
add some objects, test that they are there, etc) that don't require you to inspect the file system and tie yourself to
the implementation.

## Requirements/Guidelines
Your file store should:
* Live under a directory configurable at startup
* Have the following API (interface):
    * `.save(<table>, <objectToSave>, cb)`
      * returns `objectToSave` with added `_id` property
      * error if object already has id
    * `.update(<table>, <objectToSave>)`
      * returns `<objectToSave>`
      * error if object does not have id property, or id does not exist
    * `.remove(<table>, <id>, cb)`
      * returns number of files removed
    * `.get(<table>, <id>, cb)`
      * returns object with that id
      * else return `null`
    * `.getAll(<table>, cb)`
      * returns array of all objects
* Use an npm package to find a library to assign id's
* Use the supplied table name as a folder to store object in
* Use `JSON.parse` and `JSON.stringify`


Standard repository/dev stuff: README, package.json, travis-ci, tests, meaningful commits, named npm scripts, etc.

##Rubric:

* Tests: 3pts
* Async Coding: 3pts
* Functional Correct Behavior: 1pts
* Project (Module) Organization: 1pts
