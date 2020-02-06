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
    var query = 'Fight club';
    $.ajax(
      {
        url : 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data : {
          api_key: '9870f35e71374469c3af0707aac57353',
          query: query,
          language : 'it-IT'
        },
        success : function (data) {
          var films = data.results;
          printFilm(films); // è un array che contiene oggetti/film

        },
        error: function (request, staoriginal_languagete, errors) {
          console.log('Errore' + errors);
        }
      }
      );
  });

  function printFilm(films) {
    var source = $('#film-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < films.length; i++) {
       var film = films[i];
       var context = {
         title : film.title,
         original_title : film.original_title,
         original_language : film.original_language,
         vote_average : film.vote_average
       }
       var html = template(context);
       $('.cover-films').append(html);
    }
  }
});
