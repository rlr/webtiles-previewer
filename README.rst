==================
webtiles-previewer
==================

webtiles-previewer is as an app to preview webtiles.


Project details
===============

Code:
    http://github.com/rlr/webtiles-previewer

IRC:
    ``#tiles`` on irc.mozilla.org

License:
    Mozilla Public License Version 2.0; see LICENSE file


Running
=======

You must have npm installed on your computer.
From the root project directory run these commands from the command line:

    npm install

This will install all dependencies.

To build the project, first run this command:

    npm start

This will perform an initial build and start a watcher process that will
update bundle.js with any changes you wish to make. This watcher is based
on `Browserify <http://browserify.org/>`_. and
`Watchify <https://github.com/substack/watchify>`_, and it transforms React's
JSX syntax into standard JavaScript with
`Reactify <https://github.com/andreypopp/reactify>`_.

To run the app, spin up an HTTP server and visit http://localhost:<port>/.
Or simply open the index.html file in a browser.