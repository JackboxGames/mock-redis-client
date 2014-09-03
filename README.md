# Mock Redis Client
- - -

A redis mock for node

[![NPM version](https://badge.fury.io/js/mock-redis-client.svg)](http://badge.fury.io/js/mock-redis-client) [![Build Status](https://travis-ci.org/darrylwest/mock-redis-client.svg?branch=develop)](https://travis-ci.org/darrylwest/mock-redis-client) [![Dependency Status](https://david-dm.org/darrylwest/mock-redis-client.svg)](https://david-dm.org/darrylwest/mock-redis-client)

## Introduction

The mock redis client barows methods from [node-redis-mock](https://github.com/darrylwest/mock-redis-client) which was originally cloned from redis-mock.  There are a few more implementations, like mset witch is handy for inserting model lists for query tests.

## Installation

~~~
	npm install mock-redis-client --save-dev
~~~

## Use

~~~
	var MockRedisClient = require('mock-redis-client');
    
    var client = new MockRedisClient();
~~~

## API Implementation

# API

Currently implemented are the following:

## General

* createClient
* end

## Events

* ready
* connect
* end
* subscribe
* unsubscribe
* message

## Publish/subscribe
* publish
* subscribe
* unsubscribe

## Keys
* del
* keys
* exists
* expire

## Strings
* get
* set
* incr
* mset

## Hashing
* hset
* hsetnx
* hget
* hexists
* hdel
* hlen
* hgetall
* hmset
* hkeys
* hincrby

## Lists
* llen
* lpush
* rpush
* lpushx
* rpushx
* lpop
* rpop
* blpop
* brpop
* lindex
* lset
* rpoplpush

## Server
* flushdb
* flushall
* save
* lastsave
* time
* dbsize (always returns zero)
* ping

## Transactions
* multi
* exec
* every previous supported commands can be chained

~~~
    make test

    or

    make watch

    or

    grunt mochaTest jshint validate-package
~~~

- - -
<p><small><em>Copyright © 2014, rain city software | Version 0.90.10</em></small></p>
