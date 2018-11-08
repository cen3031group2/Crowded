angular.module('crowdy').factory('Theaters', function() {
  var theaters = {
    entries : [
      {
        "id" : 0,
        "name" : "Regal #1",
        "address" : "3702 W Newberry Rd",
        "company" : "Regal Cinemas" ,
        "crowdy_lvl_public" : 75,
        "crowdy_lvl_employee" : 85,
        "movies" : {
          "0" : "Jaws"
        }
      },
      {
        "id" : 0,
        "name" : "Regal #2",
        "address" : "A Road",
        "company" : "Regal Cinemas" ,
        "crowdy_lvl_public" : 43,
        "crowdy_lvl_employee" : 54,
        "movies" : {
          "0" : "Jaws"
        }
      }
    ]
  };
  return theaters.entries;
});
