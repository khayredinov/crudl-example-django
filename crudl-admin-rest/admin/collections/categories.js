
// Credits for this function go to https://gist.github.com/mathewbyrne
function slugify(text) {
    return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

//-------------------------------------------------------------------
var listView = {
    path: 'categories',
    title: 'Categories',
    actions: {
        list: function (req, connexes) { return connexes.categories.read(req) },
    },
}

listView.fields = [
    {
        name: 'name',
        label: 'Name',
        main: true,
    },
    {
        name: 'slug',
        label: 'Slug',
    },
]

listView.filters = {
    fields: [
        {
            name: 'user',
            label: 'User',
            field: 'Select',
            actions: {
                asyncProps: (req, cxs) => cxs.users_options.read(req),
            },
            initialValue: '',
        },
    ]
}

//-------------------------------------------------------------------
var changeView = {
    path: 'categories/:id',
    title: 'Category',
    actions: {
        get: function (req, connexes) { return connexes.category.read(req) },
        delete: function (req, connexes) { return connexes.category.delete(req) },
        save: function (req, connexes) { return connexes.category.update(req) },
    },
}

changeView.fields = [
    {
        name: 'name',
        label: 'Name',
        field: 'String',
    },
    {
        name: 'slug',
        label: 'Slug',
        field: 'String',
        watch: {
            for: 'name',
            setInitialValue: (name) => slugify(name),
        },
        props: {
            helpText: 'If left blank, the slug will be automatically generated.'
        }
    },
    {
        name: 'user',
        label: 'User',
        field: 'Autocomplete',
        props: {
            helpText: 'Help!'
        },
        actions: {
            select: (req, cxs) => {
                return Promise.all(req.data.selection.map(item => {
                    return cxs.user.read(req.with('id', item.value))
                    .then(res => res.set('data', {
                        value: res.data.id,
                        label: res.data.username,
                    }))
                }))
            },
            search: (req, cxs) => {
                return cxs.users.read(req.filter('username', req.data.query))
                .then(res => res.set('data', res.data.map(user => ({
                    value: user.id,
                    label: user.username,
                }))))
            }
        }
    },
]

//-------------------------------------------------------------------
var addView = {
    path: 'categories/new',
    title: 'New Category',
    fields: changeView.fields,
    actions: {
        add: function (req, connexes) { return connexes.categories.create(req) },
    },
}


module.exports = {
    listView,
    changeView,
    addView,
}