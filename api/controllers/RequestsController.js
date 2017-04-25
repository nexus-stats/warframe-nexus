/**
 * RequestsController
 *
 * @description :: Server-side logic for managing requests
 *                 Validates requests from python POST, generates list of users and their respective requests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



// Import Dependencies
var bcrypt = require('bcryptjs');
var fs = require('fs');


module.exports = {

    // Request Processing
    // -------------------------------------------------
    create: function (req, res) {
        var request = req.body // catch data sent from python POST

        function ProcessRequest(err, request) {


            //Convert data from Python to similar variables
            var REQ_User = request.username;
            var REQ_TO = request.to;
            var REQ_Main = request.item;
            var REQ_Type = request.type;
            var REQ_Comp = request.comp;
            var REQ_Price = request.price;
            var REQ_Obj = {
                user: REQ_User,
                requests: [{
                    title: REQ_Main,
                    type: REQ_Type,
                    updatedAt: new Date(),
                    components: [{
                        to: REQ_TO,
                        name: REQ_Comp,
                        data: REQ_Price
                    }]
                }]
            }

            // Request Processing Main Functions
            async.waterfall([

                    // Get local pwd
                    function getPwd(callback) {
                    Root.find({
                        user: request.user
                    }).exec(function (err, user) {
                        if (err) {
                            callback(err, null)
                            return
                        }
                        callback(null, user[0].pass)
                    });
                    },


                    // Compare Passwords
                    function authenticate(pass, callback) {
                    //console.log(hash)
                    if (request.user === 'python' && bcrypt.compareSync(request.password, pass) === true) {
                        callback();
                    } else {
                        console.log('Connection to Requests forbidden.')
                        res.forbidden()
                    }
                    },


                    // Get itemschema from itemlist
                    function generateItemSchema(callback) {
                    ItemList.find({
                        _id: REQ_Main
                    }).exec(function (err, itemschema) {
                        if (err) {
                            callback(err, null)
                            return
                        }
                        if (typeof itemschema[0] !== 'undefined') {
                            callback(null, itemschema)
                        } else {
                            res.notFound()
                        }
                    });
                    },


                    // Check if requested item component exists
                    function validateItemComponent(itemschema, callback) {
                    var request_status = 'false'

                    // Component not given
                    if (REQ_Comp === 'Set') {
                        request_status = 'valid'
                        callback();

                        // Component is given
                    } else {

                        // Check if component found for each item in itemschema
                        itemschema[0].components.forEach(function (itemcomponent) {
                            if (itemcomponent === REQ_Comp && itemschema[0].type === REQ_Type) {
                                request_status = 'valid'

                                // Items without components
                            } else if (typeof itemcomponent[0] === 'undefined') {
                                request_status = 'valid'
                            }
                        })

                        if (request_status === 'valid') {
                            callback();
                        } else {
                            res.notFound()
                        }
                    }
                    },


                    // Ensure user exists. If not, create
                    function updateUserList(callback) {
                    console.log('[PYTHON]')
                    Users.find({
                        user: REQ_User
                    }).exec(function (err, user) {
                        if (typeof user[0] === 'undefined') {
                            Users.create({
                                user: REQ_User
                            }).exec(function createCB(err, created) {
                                console.log('User: ' + created.user + ' (new)');
                                callback();
                            });
                        } else {
                            console.log('User: ' + REQ_User)
                            callback();
                        }
                    })
                    },


                    // Create Request entries
                    function createEntries(callback) {
                    Users.find({
                        user: REQ_User
                    }).exec(function (err, user) {


                        // Check if user has requested any items before
                        if (typeof user[0].requests !== 'undefined') {

                            var requested = 'false'
                            var itemrequestdate = ''
                            var requested_comp = 'false'


                            // Check each request for item & update
                            user[0].requests.forEach(function (itemrequest) {

                                // Check if item has been requested
                                if (itemrequest.title === REQ_Main) {
                                    requested = 'true'
                                    itemrequestdate = itemrequest.updatedAt
                                }
                                itemrequest.components.forEach(function (component) {
                                    if (component.name === REQ_Comp) {
                                        requested_comp = 'true'
                                    }
                                })
                            })


                            // If item has been requested
                            if (requested === 'true') {

                                var prevTime = new Date(itemrequestdate);
                                var thisTime = new Date();
                                var diff = thisTime.getTime() - prevTime.getTime();
                                var delta = (diff / (1000 * 60 * 60 * 24));


                                // Check if request older than 1 > then create new
                                if (delta > 1) {
                                    console.log('Request: Add ( ' + REQ_Main + ' ' + REQ_Comp + ' )')
                                    Users.native(function (err, collection) {
                                        collection.update({
                                            "user": REQ_User,
                                        }, {
                                            $push: {
                                                "requests": {
                                                    _id: REQ_Main,
                                                    title: REQ_Main,
                                                    type: REQ_Type,
                                                    updatedAt: new Date(),
                                                    components: [{
                                                        to: REQ_TO,
                                                        name: REQ_Comp,
                                                        data: REQ_Price
                                                    }]
                                                }
                                            }
                                        })
                                    })
                                    Logs.native(function (err, collection) {
                                        collection.insert({
                                            user: REQ_User,
                                            request: REQ_Main + ' ' + REQ_Comp,
                                            request_operator: REQ_TO,
                                            request_param: "add",
                                            request_url: "www.nexus-stats.com/" +  REQ_Type + '/' + REQ_Main,
                                            price: REQ_Price,
                                            date: new Date()
                                        })
                                    })
                                    callback();

                                    // If request already sent today > then update values to latest request
                                } else if (delta < 1) {
                                    if (requested_comp !== 'true') {
                                        console.log('Request: Update ( ' + REQ_Main + ' ' + REQ_Comp + ' )')

                                        // Set request as updated
                                        Users.native(function (err, collection) {
                                            collection.update({
                                                "user": REQ_User,
                                                "requests.title": REQ_Main
                                            }, {
                                                $set: {
                                                    "requests.$.updatedAt": new Date(),
                                                }
                                            }, false, true)
                                        })
                                        Users.native(function (err, collection) {
                                            collection.update({
                                                "user": REQ_User,
                                                "requests.title": REQ_Main
                                            }, {
                                                $push: {
                                                    "requests.$.components": {
                                                        to: REQ_TO,
                                                        name: REQ_Comp,
                                                        data: REQ_Price
                                                    }
                                                }
                                            })
                                        })
                                        Logs.native(function (err, collection) {
                                            collection.insert({
                                                user: REQ_User,
                                                request: REQ_Main + ' ' + REQ_Comp,
                                                request_operator: REQ_TO,
                                                request_param: "update",
                                                request_url: "www.nexus-stats.com/" +  REQ_Type + '/' + REQ_Main,
                                                price: REQ_Price,
                                                date: new Date()
                                            })
                                        })
                                    } else { // Nothing to update/same request in same day
                                        console.log('Request: Same ( ' + REQ_Main + ' ' + REQ_Comp + ' )')
                                        Logs.native(function (err, collection) {
                                            collection.insert({
                                                user: REQ_User,
                                                request: REQ_Main + ' ' + REQ_Comp,
                                                request_operator: REQ_TO,
                                                request_param: "same",
                                                request_url: "www.nexus-stats.com/" +  REQ_Type + '/' + REQ_Main,
                                                price: REQ_Price,
                                                date: new Date()
                                            })
                                        })
                                    }
                                    callback();
                                }


                                // Create New Requst
                            } else {
                                console.log('Request: New ( ' + REQ_Main + ' ' + REQ_Comp + ' )')
                                Users.native(function (err, collection) {
                                    collection.update({
                                        "user": REQ_User,
                                    }, {
                                        $push: {
                                            "requests": {
                                                _id: REQ_Main,
                                                title: REQ_Main,
                                                type: REQ_Type,
                                                updatedAt: new Date(),
                                                components: [{
                                                    to: REQ_TO,
                                                    name: REQ_Comp,
                                                    data: REQ_Price
                                                }]
                                            }
                                        }
                                    })
                                })
                                Logs.native(function (err, collection) {
                                    collection.insert({
                                        user: REQ_User,
                                        request: REQ_Main + ' ' + REQ_Comp,
                                        request_operator: REQ_TO,
                                        request_param: "new",
                                        request_url: "www.nexus-stats.com/" +  REQ_Type + '/' + REQ_Main,
                                        price: REQ_Price,
                                        date: new Date()
                                    })
                                })
                                callback();
                            }


                        // if user has no previous requests at all, create new
                        } else {
                            console.log('Request: New ( ' + REQ_Main + ' ' + REQ_Comp + ' )')
                            Users.native(function (err, collection) {
                                collection.update({
                                    "user": REQ_User,
                                }, {
                                    $addToSet: {
                                        "requests": {
                                            _id: REQ_Main,
                                            title: REQ_Main,
                                            type: REQ_Type,
                                            updatedAt: new Date(),
                                            components: [{
                                                to: REQ_TO,
                                                name: REQ_Comp,
                                                data: REQ_Price
                                            }]
                                        }
                                    }
                                }, {
                                    upsert: true
                                })
                            })
                            Logs.native(function (err, collection) {
                                collection.insert({
                                    user: REQ_User,
                                    request: REQ_Main + ' ' + REQ_Comp,
                                    request_operator: REQ_TO,
                                    request_param: "new",
                                    request_url: "www.nexus-stats.com/" +  REQ_Type + '/' + REQ_Main,
                                    price: REQ_Price,
                                    date: new Date()
                                })
                            })
                            callback();
                        }
                    })

                    // if req_item exists > if date larger 1 > create new + component
                    // else if req_item exists > if date smaller 1 > update values / create component if not exist
                    // else > if req_item NOT exist > create new + component

                    },

                    // final logs
                    function showResults(callback) {
                    ItemList.native(function (err, collection) {
                        collection.update({
                            "_id": REQ_Main,
                        }, {
                            $set: {
                                "update": 'pending'
                            }
                        })
                    })

                    console.log('Date: ' + new Date().toISOString())
                    console.log('----------------------')
                    console.log(' ')

                    // Return info
                    return res.json(request);
                                }
                            ])
        }

        // Call function above
        ProcessRequest('', request)
    }
}