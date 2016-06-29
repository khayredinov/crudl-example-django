
var users = require('./collections/users')
var categories = require('./collections/categories')
var tags = require('./collections/tags')
var entries = require('./collections/entries')
var connectors = require('./connectors/connectors')
var auth = require('./auth')
// var DateTimeField = require('./fields/DateTimeField')

var descriptor = {
    connectors,
    collections: [],
    auth,
}

descriptor.collections.push(users)
descriptor.collections.push(categories)
descriptor.collections.push(tags)
descriptor.collections.push(entries)

export default descriptor
