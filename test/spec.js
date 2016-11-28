

//script tests ---------------------------
//http://code.tutsplus.com/tutorials/testing-your-javascript-with-jasmine--net-21229
//http://jasmine.github.io/1.3/introduction.html

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

describe('JavaScript addition operator', function () {
    it('adds two numbers together', function () {
        expect(1 + 2).toEqual(3);
    });
});



// describe('sorting the list of users', function() {
//   it('sorts in descending order by default', function() {
//     var users = ['jack', 'igor', 'jeff'];
//     var sorted = sortUsers(users);
//     expect(sorted).toEqual(['igor', 'jack', 'jeff']);
//   });
// });



//--------------------------------------------------------------------------------------
//https://scotch.io/tutorials/testing-angularjs-with-jasmine-and-karma-part-1

describe('Users factory', function() {
	var Users;
    var userList = [
      {
        id: '1',
        name: 'Jane',
        role: 'Designer',
        location: 'New York',
        twitter: 'gijane'
      },
      {
        id: '2',
        name: 'Bob',
        role: 'Developer',
        location: 'New York',
        twitter: 'billybob'
      },
      {
        id: '3',
        name: 'Jim',
        role: 'Developer',
        location: 'Chicago',
        twitter: 'jimbo'
      },
      {
        id: '4',
        name: 'Bill',
        role: 'Designer',
        location: 'LA',
        twitter: 'dabill'
      }
    ];

    //The single user we expect to receive when calling findById('2')
    var singleUser = {
      id: '2',
      name: 'Bob',
      role: 'Developer',
      location: 'New York',
      twitter: 'billybob'
    };








  // Load our api.users module
  beforeEach(angular.mock.module('open'));

  // Set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_Users_) {
    Users = _Users_;
  }));

  // A simple test to verify the Users service exists
  it('should exist', function() {
    expect(Users).toBeDefined();
  });

  // A set of tests for our Users.all() method
  describe('.all()', function() {
    // A simple test to verify the method all exists
    it('should exist', function() {
      expect(Users.all).toBeDefined();
    });
  });


  describe('.findById(id)', function() {
     // A simple test to verify the method findById exists
     it('should exist', function() {
       expect(Users.findById).toBeDefined();
     });

     it('should exist', function() {
       expect(Users.findById).toBeDefined();
     });

     // it('should exist', function() {
     //   expect(Users.findById).toBeDefined();
     // });

     // it('should exist', function() {
     //   expect(Users.findById('2').name).toBeDefined();
     // });

     // // A test to verify that calling findById() with an id that doesn't exist, in this case 'ABC', returns undefined
     //     it('should return undefined if the user cannot be found', function() {
     //       expect(Users.findById('ABC')).not.toBeDefined();
     //     });
         

     // // A test to verify that calling findById() with an id, in this case '2', returns a single user
     // it('should return one user object if it exists', function() {
     //   expect(Users.findById('2')).toEqual(singleUser);
     // });

     // // A test to verify that calling findById() with an id that doesn't exist, in this case 'ABC', returns undefined
     // it('should return undefined if the user cannot be found', function() {
     //   expect(Users.findById('ABC')).not.toBeDefined();
     // });

  });




});





















// //angular tests ---------------------------

// http://www.ng-newsletter.com/advent2013/#!/day/19

// describe('Unit: MainController', function() {
//   // Load the module with MainController
//   beforeEach(module('myApp'));

//   var ctrl, scope;
//   // inject the $controller and $rootScope services
//   // in the beforeEach block
//   beforeEach(inject(function($controller, $rootScope) {
//     // Create a new scope that's a child of the $rootScope
//     scope = $rootScope.$new();
//     // Create the controller
//     ctrl = $controller('MainController', {
//       $scope: scope
//     });
//   }));

//   it('should create $scope.greeting when calling sayHello', 
//     function() {
//       expect(scope.greeting).toBeUndefined();
//       scope.sayHello();
//       expect(scope.greeting).toEqual("Hello Ari");
//   });
// })




















// describe('Hello World example', function () {

//   // beforeEach(module('open'));


//   // var HelloWorldController,
//   // scope;

//   // beforeEach(inject(function ($rootScope, $controller) {
//   // scope = $rootScope.$new();
//   // HelloWorldController = $controller('HelloWorldController', {
//   // $scope: scope
//   // });
//   // }));


//   // it('it should say hello', function() {
//   //   expect(scope.greeting).toEqual('Hello world!');
//   // });

// }









// angular.module('app', [])
// .controller('PasswordController', function PasswordController($scope) {
//   $scope.password = '';
//   $scope.grade = function() {
//     var size = $scope.password.length;
//     if (size > 8) {
//       $scope.strength = 'strong';
//     } else if (size > 3) {
//       $scope.strength = 'medium';
//     } else {
//       $scope.strength = 'weak';
//     }
//   };
// });



// describe('PasswordController', function() {
//   beforeEach(module('app'));

//   var $controller;

//   beforeEach(inject(function(_$controller_){
//     // The injector unwraps the underscores (_) from around the parameter names when matching
//     $controller = _$controller_;
//   }));

//   describe('$scope.grade', function() {
//     it('sets the strength to "strong" if the password length is >8 chars', function() {
//       var $scope = {};
//       var controller = $controller('PasswordController', { $scope: $scope });
//       $scope.password = 'longerthaneightchars';
//       $scope.grade();
//       expect($scope.strength).toEqual('strong');
//     });
//   });
// });







// describe("A suite", function() {
//   it("contains spec with an expectation", function() {
//     expect(true).toBe(true);
//   });
// });


// describe('grunt-karma', function() {

//   describe('one', function() {
//     it('should be awesome', function() {
//       console.log('one');
//       expect('foo').to.be.a('string');
//     });
//   });

//   describe('two', function() {
//     it('should be equally awesome', function() {
//       console.log('two');
//       expect('woot').to.be.a('string');
//     });
//   });

// });


