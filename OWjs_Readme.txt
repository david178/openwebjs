
/* ----------------------------------------------------------- */
/* ------------------- OpenWeb.js README --------------------- */
/* ----------------------------------------------------------- */

TABLE
Chapter 1: Getting Started . . . . . . . . . . . . . 1
   Introduction  . . . . . . . . . . . . . . . . . . 1.1
   Compilation  . . . . . . . . . . . . . . . . . .  1.2
Chapter 2: System Architecture . . . . . . . . . . . 2
   APIs  . . . . . . . . . . . . . . . . . . . . . . 2.1
   Client  . . . . . . . . . . . . . . . . . . . . . 2.2
   Services  . . . . . . . . . . . . . . . . . . . . 2.3
Chapter 3: Testing & Maintenance . . . . . . . . . . 3
   Frameworks and Methodology  . . . . . . . . . . . 3.1
   Unit Tests  . . . . . . . . . . . . . . . . . . . 3.2
   Code Linting  . . . . . . . . . . . . . . . . . . 3.3
   Pulling and Pushing  . . . . . . . . .  . . . . . 3.4


--------------------------------------------------------------------------------------------------------------
[[ CHAPTER 1 - GETTING STARTED ]]

-INTRODUCTION-

Hello,

This readme is meant to serve as a quick guide in order to assist and faciliate in the compilation,
orientation and development of the OpenWeb.js application. Below you will find an easy to follow guide
in order to get up and running quickly with the platform. The sections below are delinated by a numerical
system, with sub-sections outline in alpha-characters.



-COMPILATION-

The Openweb.js codebase is written in Javascript, and so thus, does not require compilation in order to run. 
However, in order to set up the development environment and test locally as though one were to functionality
test and operate the application as in a production environment (including all data services), you will
be required to run a local instance of a test server on your machine. The server that Openweb.js uses is 
Grunt server, a package of Node.js. The following steps outline the procedure in order to set up the 
Grunt server, as well as all associated packages necessary to run Openweb.js from a local dev machine.

(1) Set up your dev environment
-Install NodeJS, Yeoman
https://nodejs.org/en

-Download package
>Click the green download button on landing page
>Open up package to install to machine
>>Then, pull up command prompt to install Yeoman
>>"npm install -g yo"

(2) Grab and run codebase
-Create a copy of the OpenWeb.js codebase from the server on your local development environment
(maps.clarkcountynv.gov or otherwise)

-Run the Grunt Server to test it out
>Example assumes codebase on desktop:
>>cd desktop/openwebjs
>>Grunt serve






--------------------------------------------------------------------------------------------------------------
[[ CHAPTER 2 - SYSTEM ARCHITECTURE ]]

-APIS-

This section is intended to familiarize yourself with the Openweb.js architecture.
The following framework APIs are used in Openweb.js (which can be found referenced in app/index.html)

Vendor Libraries:
-ESRI ArcGIS JavaScript API (3.11) (//js.arcgis.com/3.11/)
-AngularJS (1.3.0) (https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js)
-AngularJS UI (0.12.0) (//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.12.0.js)
-jQuery (1.10.1) (https://code.jquery.com/jquery-1.10.1.min.js)
-Google Maps api - Used in StreetView (https://maps.googleapis.com/maps/api/js)
-Google Analytics

UI Libraries:
-Bootstrap (js/lib/bootstrap.min.js)
-Bootstrap-tour - Used in the Introductory Tour (js/lib/bootstrap-tour.js)
-jQuery UI (1.10.4) (js/lib/jqueryui-1.10.4.min.js)



-CLIENT-

The Openweb.js client application consists of the following high-level architectural layout:

/OpenWeb/
[app]
[bower_components]
[node_modules]
[test]
" " (runtime log)
bower.json
Gruntfile.js
karma.conf.js
package.json
test-results

/OpenWeb/app
[css]
[feedback]
[fonts]
[images]
[js]
[print]
[proxy]
[resources]
[views]
index.html

/OpenWeb/bower components
[angular]
[bootstrap]
[jquery]

/OpenWeb/node_modules
...various node.js modules...

In terms of the main directory, points of note are the main "app" folder, the bower components folder, the 
node modules, as well as the "test" folder. The app folder contains the main client-side application,
which is what the end-user will utilize when interacting with the application. The code-files contained
in "app" are as you would expect, and contain html, css, as well as native javascript and angular-js 
base code files.

The main directory also contains a few files that are important. The Gruntfile.js file serves to direct
the Grunt Server towards internal application files that are then used in order to facilitate the live-reload
aspect of the grunt server. This assists during application development and testing, as you no longer 
require reloading on each iteration in order to see development changes. As well, the gruntfile also contains
code to be tested on with a suite of test scripts written internal to the "test" folder, which we will
get further into later. Package.json is an auto-generated object list of system packages that are used
in the application (filled via node.js), as well as a karma.conf.js file, which is used to delinate
the files that contain the actual unit tests used during test runs.
The test-results.xml document contains test and code coverage results from unit test runs.



-SERVICES-

The Openweb.js application uses various services in order to derive and deliver its data to end user
over the course of its operating lifecycle.

The web services are primarily located in the factory (/OpenWeb/app/js/app/services/).

Services located in the factory are thereby referenced throughout the application.

Map specific services, delivering specific overlays, layers, and mapping objects and data can also
be found in the map.js file (OpenWeb/app/js/app/)






--------------------------------------------------------------------------------------------------------------
[[ CHAPTER 3 - TESTING & MAINTENANCE ]]

-FRAMEWORKS AND METHODOLOGY-

Openweb.js uses Karma test runner and the jasmine unit test language in order to run its tests. THe karma test
runner is internal to the package that was installed during the Yeoman compilation step. Further documentation
in order to orient yourself to the Jasmine testing framework can be located on the Jasmine github:
https://jasmine.github.io/



-UNIT TESTS-

The aformentioned unit tests are located in the /OpenWeb/test/ folder. 
Additional code coverage reports can be located in /OpenWeb/test/coverage.



-CODE LINTING-

Code Linting can also become helpful during intra-development testing and refactoring. Linting packages can be 
integrated directing in the Sublime Text 3 editor environment by pulling up the package control 

Ctrl+Shift+P

and searching for "Linting"



-PULLING AND PUSHING-

Pulling and pushing code from the VSO repository is easy. The below outlines how one would accomplish this via
gitbash prompt, as well as internal to the Sublime Text 3 editor:


### Install Git for Windows (with default settings)
https://git-scm.com/downloads


### Push via git bash windows prompt

Add new remote origin: git remote add origin https://gismoclarkcounty.visualstudio.com/_git/-projectname-
sign in using:

VSO credentials:
gismo@clarkcountynv.gov
county

Git credentials:
Gismo@ClarkCountyNV.gov
County123@


# Push an existing repository from command line:
git remote add origin https://gismoclarkcounty.visualstudio.com/_git/-projectname-
git push -u origin --all


### Adding/Removing Remotes 
git remote -v 
git remote remove origin 
git remote add origin https://gismoclarkcounty.visualstudio.com/_git/-projectname- (VSO)


### Push Local to Repo (git bash)

Open Git Bash prompt

CD to local directory


# Initialize local directory as a git repo
git init

# Add the files
git add .

# Commit
git commit -m 'First commit'

# Sets the new remote
git remote add origin https://gismoclarkcounty.visualstudio.com/_git/-projectname-

git push -u origin --all


### Push Local to Repo (Sublime Text 3)

ADD, COMMIT, AND PUSH WITHIN SUBLIME TEXT

# Download & Install Sublime Text 3 editor
https://www.sublimetext.com/3


# Download & Install Sublime Text Git Package
Install using Package Control (ctrl + shift + p)
& restart editor


*Quick commit from Sublime:
ctrl + shift + p > git add . + all files
ctrl + shift + p > git quick repo
"commit message"
ctrl + shift + p > push > git push current branch


### Pull Repo to Local (GitBash/Sublime Text 3)

# cd to working directory

git clone https://gismoclarkcounty.visualstudio.com/_git/-projectname-




























