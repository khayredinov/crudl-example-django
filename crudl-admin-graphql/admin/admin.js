import React from 'react'
import CustomDashboard from './custom/Dashboard'

var users = require('./views/users')
var sections = require('./views/sections')
var categories = require('./views/categories')
var tags = require('./views/tags')
var entries = require('./views/entries')
var connectors = require('./connectors/connectors')
var { login, logout } = require('./auth')

var admin = {
    title: 'crudl.io Django GraphQL Example',
    options: {
        debug: false,
        basePath: '/crudl-graphql/',
        baseURL: '/graphql-api/',
    },
    connectors,
    views: {
        users,
        sections,
        categories,
        tags,
        entries,
    },
    auth: {
        login,
        logout,
    },
    custom: {
        dashboard: <CustomDashboard />,
    },
}

export default admin
