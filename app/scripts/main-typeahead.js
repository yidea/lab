require(["config"], function () {

  require(["jquery.typeahead", "handlebars"], function ($, Handlebars) {
    $(function () {
      // Entry-point

      //local
//      var substringMatcher = function(strs) {
//        return function findMatches(q, cb) {
//          var matches, substringRegex;
//
//          // an array that will be populated with substring matches
//          matches = [];
//
//          // regex used to determine if a string contains the substring `q`
//          substrRegex = new RegExp(q, 'i');
//
//          // iterate through the pool of strings and for any string that
//          // contains the substring `q`, add it to the `matches` array
//          $.each(strs, function(i, str) {
//            if (substrRegex.test(str)) {
//              // the typeahead jQuery plugin expects suggestions to a
//              // JavaScript object, refer to typeahead docs for more info
//              matches.push({ value: str });
//            }
//          });
//
//          cb(matches);
//        };
//      };
//
//      var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
//        'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
//        'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
//        'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
//        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
//        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
//        'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
//        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
//        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
//      ];

      // remote data
      //avoid console error for long time jsonp response
      //Property 'typeaheadResult' of object [object Object] is not a function
      window.typeaheadResult = function() {};

      function _encodeQuery (query) {
        //e.g iphone 4 -> iphone_204
        return query.replace(/\./g, "%2E").replace(/'/g, "%27").replace(/\//g, "%2F").replace(/%/g, "_").toLowerCase();
      }

      var typeaheadEngine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 12,
        remote: {
          url: 'http://search-cdn.walmart.com/typeahead/v2/142487e83d0c/0/',

          replace:       function (url, uriEncodedQuery) {
            uriEncodedQuery = encodeURIComponent(uriEncodedQuery);
            console.log(uriEncodedQuery); //TODO:debug
            return url + _encodeQuery(uriEncodedQuery) + ".js?";
          },

          ajax: {
            dataType: "jsonp",
            timeout: 1000,
            jsonpCallback: "typeaheadResult"
          },
          rateLimitWait: 200,

          filter: function (parsedResponse) {
            // bloodhood expect object
            var results = parsedResponse.R;
            var datums = [];
            var i = 0, len = results.length;
            for (i = 0; i < len; i++) {
              if (i === 0 && $.isArray(results[i])) { //top search w cat
                var topResults = results[i];
                var j = 0, lenTopResults = topResults.length;

                for (j = 0; j < lenTopResults; j++) { //top results
                  if (j === 0) { //top search
                    datums.push({value: topResults[0]});

                  } else if (j === 1) { //category
                    var catResults = topResults[j];
                    var k = 0, lenCat = catResults.length;
                    for (k = 0; k < lenCat; k++) { //category result
                      datums.push({
                        //                      value: "in " + catResults[k][0],
                        value: topResults[0],
                        //                      query: topResults[0],
                        category: " in " + catResults[k][0],
                        categoryID: catResults[k][1]});
                    }
                  }
                }
              } else {
                datums.push({value: results[i]});
              }
            }

            return datums;
          }
        }
      });

      typeaheadEngine.initialize();

      $('.typeahead').typeahead({
          hint: false,
          highlight: true
        },
        {
          name: 'walmart',
//          displayKey: 'value',
          templates: {
            suggestion: Handlebars.compile("<a> {{#if category}}{{category}}{{else}}{{value}}{{/if}}</a>")
          },

          source: typeaheadEngine.ttAdapter()
        });
    });

  });
});
