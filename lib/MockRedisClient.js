
/**
 * @class MockRedisClient
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 9/3/14
 */
var dash = require('lodash'),
    RedisMock = require('node-redis-mock');

var MockRedisClient = function() {
    'use strict';

    RedisMock.setMaxListeners(30);

    var mock = this,
        client = RedisMock.createClient();

    this.watch = function(key, callback) {
        //TODO: Implement
        if (callback)
            callback();
    };

    this.unwatch = function(key, callback) {
        //TODO: Implement
        if (callback)
            callback();
    };

    this.mset = function(list, callback) {
        list = dash.clone( list );

        var cb = function(err, model) {
            if (err) throw err;

            var key = list.shift();
            var value = list.shift();

            if (!key || !value) {
                return callback(null, 'ok');
            } else {
                // console.log(key, '=', value);
                client.set( key, value, cb );
            }
        };

        cb();
    };

    this.mget = function(keys, callback) {
        keys = dash.clone( keys );
        var values = [];

        var cb = function(err, value) {
            if (err) throw err;

            if (value) {
                values.push( value );
            }

            var key = keys.pop();

            if (key) {
                mock.get( key, cb );
            } else {
                return callback( err, values );
            }
        };

        cb();
    };

    this.zscore = function(key, field, callback) {
        var cb = function(err, value) {
            if (err) throw err;
            if (RedisMock.storage[key]) {
                if (RedisMock.storage[key].type !== 'zset') {
                  var err = new Error('ERR Operation against a key holding the wrong kind of value');
                  return RedisMock._callCallback(callback, err);
                } 
                else {
                    var zset = RedisMock.storage[key].value;
                    for (var i=0; i<zset.length; i++) {
                        if (zset[i][0] === field) {
                            return callback(undefined, zset[i][1]);
                        }
                    }
                }
            }
            callback(undefined, null);
        };
        cb();
    };

    // re-assign all the methods
    dash.methods( client).forEach(function(method) {
        mock[ method ] = client[ method ];
    });

    this.pub_sub_mode = false;

    // We always listen for 'message', even if this is not a subscription client.
    // We will only act on it, however, if the channel is in this.subscriptions, which is populated through subscribe
    this._message = function (ch, msg) {

        if (ch in mock.subscriptions && mock.subscriptions[ch] === true) {
            mock.emit('message', ch, msg);
        }
    }

    client.on('message', this._message);

    this.subscriptions = client.subscriptions;
};

MockRedisClient.createMockRedis = function() {
    'use strict';
    this.createClient = function() {
        return new MockRedisClient();
    };

    return this;
};

module.exports = MockRedisClient;
