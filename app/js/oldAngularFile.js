.controller('BeersController', ['$scope', '$http', '$location', '$q', function($scope, $http, $location, $q){
  $scope.showBonds = false;
  $scope.pageSize = 5;

  var getDB = function(tableToGet) {
    console.log('Running DB get...' + tableToGet);
    url = '../../' + tableToGet + '.json';
    var defer = $q.defer();

    $http.get(url)
    .success(function(results){
      defer.resolve(results);
    })
    .error(function(results){
      defer.reject('Error Getting');
    });

    return defer.promise;
  };


  var postDB = function(tableToPost, dataToPost) {
    console.log('Running DB post...' + tableToPost);
    url = '../../' + tableToPost + '.json';
    var defer = $q.defer();

    $http.post(url, dataToPost)
    .success(function(results){
      defer.resolve(results);
    })
    .error(function(results){
      defer.reject('Error Posting');
    });

    return defer.promise;
  };

  var putDB = function(tableToPut, dataToPut) {
    console.log('Running DB put...' + tableToPut);
    url = '../../' + tableToPut + '/' + dataToPut.id + '.json';
    var defer = $q.defer();

    $http.put(url, dataToPut)
    .success(function(results){
      defer.resolve(results);
    })
    .error(function(results){
      defer.reject('Error Posting');
    });

    return defer.promise;
  };

  var bondExists = function(bondList, source, target){
    var foundBond;

    console.log('Searching for bond between...' + source.name + ' & ' + target.name);
    angular.forEach(bondList, function(bond){
      if(bond.source_id === source.id && bond.target_id === target.id){
        foundBond = bond;
      }
    });

    return foundBond;
  };


  var beerExists = function(beerList, beerToFind){
    var foundBeer = false;

    console.log('Searching for beer...' + beerToFind.name);
    angular.forEach(beerList, function(beer){
      if(beer.id === beerToFind.id){
          foundBeer = true;
      }
    });

    return foundBeer;
  };

  var reasonExists = function(reasons, description){
    var foundReason;

    angular.forEach(reasons, function(reason){
      if(reason.description === description){
        foundReason = reason;
      }
    });

    return foundReason;
  };


  // Adds a bond between two beers to DB
  var bondBeers = function(source, target){
    var beersPosted, newBond;

    console.log('Running bondBeers...');
    console.log('SourceID: ' + source.beer.bid);
    console.log('TargetID: ' + target.beer.bid);
    bond = {
      source_id: source.beer.bid,
      target_id: target.beer.bid,
      strength: 1
    };

    beersPosted = postDB('bonds', bond);

    return beersPosted;
  };

  // Adds Source and Target beers to DB
  // Once complete, calls bondBeers to create bond
  var addBeers = function(source, target){
    console.log('Running addBeers');
    var getBeersDB;
    var foundSource, foundTarget;
    var postSource, postTarget;

    getBeersDB = getDB('beers');

    return getBeersDB
    .then(function(results){
      foundSource = beerExists(results.data, source);
      foundTarget = beerExists(results.data, target);
      console.log('foundSource: ' + foundSource);
      console.log('foundTarget: ' + foundTarget);
    })
    .then(function(){
      if(foundSource && foundTarget){
        console.log('Found: Source & Target');
      }
      else if(!foundSource && foundTarget){
        console.log('Found: !Source & Target');
        postSource = makeBeerObject(source);
        // {
        //     name: source.name,
        //     giant_bomb_id: source.id,
        //     icon_url: source.image.icon_url,
        //     thumb_url: source.image.tiny_url
        //   };
        postDB('beers', postSource);
      }
      else if(foundSource && !foundTarget){
        console.log('Found: Source & !Target');
        postTarget = makeBeerObject(target);
        // {
        //     name: target.name,
        //     giant_bomb_id: target.id,
        //     icon_url: target.image.icon_url,
        //     thumb_url: target.image.tiny_url
        //   };
        postDB('beers', postTarget);
      }
      else{
        console.log('Found: !Source & !Target -- Dropped to Else');
        postSource = makeBeerObject(source);
        // {
        //     name: source.name,
        //     giant_bomb_id: source.id,
        //     icon_url: source.image.icon_url,
        //     thumb_url: source.image.tiny_url
        //   };
        postDB('beers', postSource);

        postTarget = makeBeerObject(target);
        // {
        //     name: target.name,
        //     giant_bomb_id: target.id,
        //     icon_url: target.image.icon_url,
        //     thumb_url: target.image.tiny_url
        //   };
        postDB('beers', postTarget);
      }
    });
  };

  var addReason = function(bond, description){
    var getReasonsDB;
    var reasonFound;
    var reason = {
      description: description,
      bond_id: bond.id
    };

    getReasonsDB = getDB('reasons');

    getReasonsDB.then(function(results){
      reasonFound = reasonExists(results, description);
    })
    .then(function(){
      if(reasonFound){
        reasonFound.strength++;
        console.log('Reason ID: ' + reasonFound.id + ' Strength: ' + reasonFound.strength);
        putDB('reasons', reasonFound);
      }
      else{
        postDB('reasons', reason);
        console.log('Reason not found... adding');
      }
    }).then(function(){
      window.location = '/';
    });
  };

  var goToRoot = function(){
    $location.path('/');
    $scope.$apply();
  };

  $scope.newBond = function(source, target, description){
    var getBondDB = getDB('bonds');
    var bondFound, newBond, bondAdded;

    getBondDB
    .then(function(results){
      bondFound = bondExists(results, source, target);
      console.log('Bond Found: ' + bondFound);
    })
    .then(function(){
      if(bondFound){
        bondFound.strength++;
        console.log('Bond ID: ' + bondFound.id + ' Strength: ' + bondFound.strength);
        putDB('bonds', bondFound);
        addReason(bondFound, description);
      }
      else {
        addBeers(source, target)
        .then(function(){
          return bondBeers(source, target);
        })
        .then(function(result){
          console.log('Bond Added! ID: ' + result.id);
          newBond = result;
        })
        .then(function(){
          addReason(newBond, description);
        });
      }
    });
  };

  $scope.searchList = function(searchTerm, list){
    $scope[list + 'Cancel']();
    $scope[list + 'Searched'] = true;

    $.get("https://api.untappd.com/v4/search/beer", {
        client_id: "2C0534B0513D40B8703C0651A1626EA9A2C654BA", 
        client_secret: "D20009CE3E6694F1CFFD12D890576F94401C695D",
        q: searchTerm
    })
      .done(function(resp){
        $scope.$apply(function(){
          $scope[list + 'Page'] = 0;
          $scope[list + 'List'] = resp.response.beers.items;
          $scope[list + 'PageCount'] = Math.floor($scope.sourceList.length / $scope.pageSize);
        });
      });
  };

  $scope.moreInfo = function(id){
    // Open a dialog with data from 
    // https://api.untappd.com/v4/beer/info/:id
  };

  $scope.sourceSelect = function(source){
    $scope.source = source;
    $scope.sourceSelected = true;
  };

  $scope.sourceCancel = function(){
    $scope.source = null;
    $scope.sourceSelected = false;
  };

  $scope.targetSelect = function(target){
    $scope.target = target;
    $scope.targetSelected = true;
  };

  $scope.targetCancel = function(){
    $scope.target = null;
    $scope.targetSelected = false;
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function makeBeerObject(beer){
    beer = beer.beer;
    return {
      beer: {
        untappd_id: beer.bid,
        name: beer.beer_name,
        icon_url: beer.beer_label
      }
    };
  }

}]);
