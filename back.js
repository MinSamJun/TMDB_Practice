const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDRmMDE1NzZkYjlmZDUxNTVmNGM0OTM5Mjk4YmUzYiIsInN1YiI6IjY0NzQzODg2YmUyZDQ5MDBiZjllNmRjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._vFLIvNHHBPhV-LxwpQzO6HAXWX0XNX9tHq-5lMBte4'
    }
};

// API에 포스터가 없는 경우도 있다. 그럴때를 위한 함수.
const poster_error = "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";



// const poster00 = "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";
fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1', options)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        // id 값으로 저장하기
        const container = document.getElementById('movieData'); // class 가 아니라 id 로 저장된다.
        // const container = document.getElementsByClassName('movieData'); // 이유는 모르겠는데 안된다... class로 했는데도 id값을 만들고 앉아있다.
        container.classList.add('movieData') // id랑 class를 동시에 가져도 문제 될 것이 없기때문에 그냥 class를 추가한다.

        //  필수조건 forEach사용하기
        movies.forEach(movie => {
            const card = makeCards(movie)
            container.appendChild(card);
        });
    })
    .catch(err => console.error(err));


function handleSearch(event, type) {
    event.preventDefault(); // 기본 제출 동작 방지

    const searchInput = document.getElementById('search_input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    // .trim() 공백제거 .toLowerCase() 알파벳 검색을 위해 모두 소문자로 만들기.

    let typeBTN = document.getElementById("search_btn").textContent;
    console.log(typeBTN)

    if (typeBTN === '결과 내 검색') {
        console.log('1111111111111111')
        if (searchTerm !== '') {
            var container = document.getElementById('movieData');
            var cards = container.getElementsByClassName('card');

            Array.from(cards).forEach(function (card) {
                var title = card.textContent.toLowerCase(); //영어 검색의 경우 대소문자 구분을 없애기 위해 전부 소문자 처리한다.

                // 검색결과에 따라서 스타일을 추가한다.
                if (title.includes(searchTerm)) {
                    card.style.display = 'block'; //일치하는 카드를 보여주게 설정
                } else {
                    card.style.display = 'none'; //일치하지 않는 카드를 가리게 설정
                }
            });
        }
    } else {
        console.log('222222222222')
        if (searchTerm !== '') { //검색 내용이 공백이 아닐경우에만 실행
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDRmMDE1NzZkYjlmZDUxNTVmNGM0OTM5Mjk4YmUzYiIsInN1YiI6IjY0NzQzODg2YmUyZDQ5MDBiZjllNmRjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._vFLIvNHHBPhV-LxwpQzO6HAXWX0XNX9tHq-5lMBte4'
                }
            };
            //굳이 성인검색을 끌 필요는 없다고 판단함,                          encodeURIComponent(searchTerm) 는 한글주소로 변환하는 것
            const url = 'https://api.themoviedb.org/3/search/movie?query=' + encodeURIComponent(searchTerm) + '&language=ko&page=1';
            // api를 통해서 검색할때는 영문 대소문자를 구분하지 않고 검색해주므로 별도의 변환이 필요 없다.


            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    const movies = data.results;
                    const container = document.getElementById('movieData');
                    container.innerHTML = ''; // 기존 카드 모두 제거

                    movies.forEach(movie => {
                        const card = makeCards(movie)
                        container.appendChild(card);
                    });
                })
                .catch(err => console.error(err));
        }
    }
}

function makeCards(movie) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const title = document.createElement('h2');
    title.textContent = movie.title + ' (' + movie.vote_average + ')';
    title.classList.add('rate');
  
    const overview = document.createElement('p');
    overview.textContent = movie.overview;
  
    const poster_front = movie.poster_path;
    const full = x => {
      if (typeof x !== 'string') {
        return poster_error;
      } else {
        return "https://image.tmdb.org/t/p/w500" + x;
      }
    }
  
    const poster = document.createElement('img');
    poster.src = full(poster_front);
    poster.classList.add('poster');
  
    card.appendChild(title);
    card.appendChild(overview);
    card.appendChild(poster);
  
    return card;
  }






// document.write('<script src="/0.js"></script>');
//     "https://image.tmdb.org/t/p/w500"