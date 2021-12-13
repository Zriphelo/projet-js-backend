const jsonDbPath = __dirname + "/../data/scores.json";
const { parse, serialize } = require("../utils/json");

// Default data
const defaultItems = [
  {
    id: 1,
    player: 1,
    text: 1,
    score: 100,
    date: "13-12-2021"
  }
];


class Scores {
    constructor(dbPath = jsonDbPath, items = defaultItems) {
      this.jsonDbPath = dbPath;
      this.defaultItems = items;
    }
  
    getNextId() {
      const items = parse(this.jsonDbPath, this.defaultItems);
      let nextId;
      if (items.length === 0) nextId = 1;
      else nextId = items[items.length - 1].id + 1;
  
      return nextId;
    }
  
    /**
     * Returns all items
     * @returns {Array} Array of items
     */
    getAll() {
      const items = parse(this.jsonDbPath, this.defaultItems);
      return items;
    }
  
    /**
     * Returns the item identified by id
     * @param {number} id - id of the item to find
     * @returns {object} the item found or undefined if the id does not lead to a item
     */
    getOne(id) {
      const items = parse(this.jsonDbPath, this.defaultItems);
      const foundIndex = items.findIndex((item) => item.id == id);
      if (foundIndex < 0) return;
  
      return items[foundIndex];
    }
  
    /**
     * Returns the item identified by username
     * @param {string} player - name of the item to find
     * @returns {object} the item found or undefined if the title does not lead to a item
     */
    getOneByPlayer(id) {
      const items = parse(this.jsonDbPath, this.defaultItems);
      const foundIndex = items.findIndex((item) => item.player == id);
      if (foundIndex < 0) return;
  
      return items[foundIndex];
    }

    /**
     * Returns the item identified by username
     * @param {string} player - name of the item to find
     * @returns {object} the item found or undefined if the title does not lead to a item
     */
     getOneByText(id) {
        const items = parse(this.jsonDbPath, this.defaultItems);
        const foundIndex = items.findIndex((item) => item.text == id);
        if (foundIndex < 0) return;
    
        return items[foundIndex];
      }
  
    /**
     * Add a item in the DB and returns the added item (containing a new id)
     * @param {object} body - it contains all required data to create a item
     * @returns {object} the item that was created (with id)
     */
  
    addOne(body) {
      const items = parse(this.jsonDbPath, this.defaultItems);
  
      const newitem = {
        id: this.getNextId(),
        player: body.player,
        text: body.text,
        date = Date.now()
      };
      items.push(newitem);
      serialize(this.jsonDbPath, items);
      return newitem;
    }
  
    /**
     * Delete a item in the DB and return the deleted item
     * @param {number} id - id of the item to be deleted
     * @returns {object} the item that was deleted or undefined if the delete operation failed
     */
    deleteOne(id) {
      const items = parse(this.jsonDbPath, this.defaultItems);
      const foundIndex = items.findIndex((item) => item.id == id);
      if (foundIndex < 0) return;
      const itemRemoved = items.splice(foundIndex, 1);
      serialize(this.jsonDbPath, items);
  
      return itemRemoved[0];
    }
  
    /**
     * Update a item in the DB and return the updated item
     * @param {number} idValue - id of the item to be updated
     * @param {object} body - it contains all the data to be updated
     * @param {number} idKey - key (or name) of the attribute to be used as id (id by default)
     * @returns {object} the updated item or undefined if the update operation failed
     */
    updateOne(idValue, body, idKey = "id") {
      const items = parse(this.jsonDbPath, this.defaultItems);
      const foundIndex = items.findIndex((item) => item[idKey] == idValue);
      if (foundIndex < 0) return;
      // create a new object based on the existing item - prior to modification -
      // and the properties requested to be updated (those in the body of the request)
      // use of the spread operator to create a shallow copy and repl
      const updateditem = { ...items[foundIndex], ...body };
      // replace the item found at index : (or use splice)
      items[foundIndex] = updateditem;
  
      serialize(this.jsonDbPath, items);
      return updateditem;
    }
    
  }
module.exports = { Scores };