// 9870f35e71374469c3af0707aac57353 -API key-
// https://api.themoviedb.org/3/search/movie?api_key=9870f35e71374469c3af0707aac57353&query=fight club&language=it-IT -chiamata completa-

// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto
$(document).ready(function () {
  $('.btn').click(function () {
   research();

  });
  $('.input').keypress(function (event) {
    if(event.which == 13) {
      research();
    }
  });

// Functions

  function research() {
    var query = $('.input').val();
    resetSearch();
    getMovies(query);
  };

  function getMovies(string) {
      var url = 'https://api.themoviedb.org/3/search/movie';
      var api = '9870f35e71374469c3af0707aac57353';
      var urlSerie = 'https://api.themoviedb.org/3/search/tv';

      $.ajax(
      {
        url : url,
        method: 'GET',
        data : {
          api_key: api,
          query: string,
          language : 'it-IT'
        },
        success : function (data) {
          $('.results').removeClass('active');
          $('.results').addClass('active');
          $('.genre').removeClass('active');
          $('.genre').addClass('active');

          var films = data.results;
          if (data.total_results > 0) {
          printFilm(films);
          }
          else {
          messageNotFound();
          };

        },
        error: function (request, state, errors) {
          console.log('Errore' + errors);
        }
      }
      );
      $.ajax(
      {
        url : urlSerie,
        method: 'GET',
        data : {
          api_key: api,
          query: string,
          language : 'it-IT'
        },
        success : function (data) {
          $('.results').removeClass('active');
          $('.results').addClass('active');
          $('.genre').removeClass('active');
          $('.genre').addClass('active');

          var serie = data.results;
          if (data.total_results > 0) {
          printSerieTv(serie);
          }
          else {
          messageNotFound();
          };

        },
        error: function (request, state, errors) {
          console.log('Errore' + errors);
        }
      }
      );
  }
  function resetSearch() {
    $('.cover-films').html('');
    $('.cover-serie').html('');
    $('.input').val('');
  };

  function printFilm(films) {

    var source = $('#film-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < films.length; i++) {
       var film = films[i];
       var voto = film.vote_average;
       var flag = film.original_language;
       var image = film.poster_path;

       var context = {
         title : film.title,
         original_title : film.original_title,
         original_language : printFlag(flag),
         vote_average : printStars(voto),
         poster_path :  printImage(image)
       }
       var html = template(context);
       $('.cover-films').append(html);
    }
  };

  function printSerieTv(serie) {

    var source = $('#serie-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < serie.length; i++) {
       var serie = serie[i];
       var voto = serie.vote_average;
       var flag = serie.original_language;
       var image = serie.poster_path;

       var context = {
         name : serie.name,
         original_name : serie.original_name,
         original_language : printFlag(flag),
         vote_average : printStars(voto),
         poster_path : printImage(image)
       }
       var html = template(context);
       $('.cover-serie').append(html);
    }
  };

    function printStars(vote) {
      var vote = Math.round(vote / 2);
      var stars = '';
      for (var i = 1; i <= 5 ; i++) {
        if (i <= vote) {
          var simpleStar = '<i class="fas fa-star stars"></i>';
        } else {
          var simpleStar = '<i class="far fa-star stars"></i>';
        }
        stars += simpleStar;
      }
      return stars
    };

    function messageNotFound() {
      var source = $('#noresults-template').html();
      var template = Handlebars.compile(source);
      var html = template();
      $('.cover-films').append(html);
    };

    function printFlag(string) {
      var flags = [
    'en',
    'it',
    'de',
    'es',
    'fr',
    'ru',
    'zh'
  ];

  if(flags.includes(string)) {
    string = '<img class="flag" src="img/' + string + '.png" alt="language">';
  }

  return string;
    }

    function printImage(poster) {
      var url = 'https://image.tmdb.org/t/p/w185';
      if (poster != null) {
         url += poster;
      } else {
         url = 'img/poster-default.png'
      }
      return url;
  }


});
