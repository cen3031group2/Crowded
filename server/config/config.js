// crowdy's config file for the server
// 10/11/18
module.exports = {
    db: {
      uri: "mongodb://admin:whatis42@ds153093.mlab.com:53093/crowdy" //place the URI of your mongo database here.
    },
    internationalshowtimes:{
        key: "YGKevY9psgmImaMhv4YZGoZoXYo8KKwF"
    },
    gainesville : {
      "id":"22777",
      "name":"Gainesville",
      "slug":"gainesville-fl",
      "lat":29.6516344,
      "lon":-82.32482619999999,
      "country":"US"
    },
    port: 8080,
    companies : ["regmovies"]
  };
