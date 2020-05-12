This is a simple mDNS test that redirects mDNS requests to a name of your choosing to a test server.

# How to use it
Download the dependencies and run the index.js file with 1 argument. That argument should be the name of your service.

After that you can go into a browser and visit that name you entered as your name with a ".local" at the end. You should now be redirected to the test server.

## Example:
1. Run `npm install`
2. Run `node index.js myTest`
3. Visit http://myTest.local in a browser

# Supported Browsers
* The system has been tested in 10.14.6.
* It is also known to not work on Android since chrome does not have mDNS support there :(
