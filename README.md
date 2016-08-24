# JavaScript for the Traces Through Time custom analytics

Provides the JavaScript that fires WebTrends events in response to specific events. These are: 

* Upon page load
* Scrolling:
    * First scroll
    * Upon reaching the TTT widget
    * Upon reaching the footer

Has a dependency upon jQuery

## Development dependencies

The only development dependencies for this project is QUnit. Dependencies are managed via Bower. 

### Bower is used for dependency management

Use:
 * `npm install -g bower` to install Bower globally on a development machine (if it has not been up).
 * `bower install` to install the dependencies (these are listed in bower.json)
