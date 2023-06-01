// TMDB API를 사용하기 위한 기초공사
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDRmMDE1NzZkYjlmZDUxNTVmNGM0OTM5Mjk4YmUzYiIsInN1YiI6IjY0NzQzODg2YmUyZDQ5MDBiZjllNmRjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._vFLIvNHHBPhV-LxwpQzO6HAXWX0XNX9tHq-5lMBte4'
    }
};

// API에 포스터가 없는 경우도 있다. 그럴 때를 위해서, TMDB의 로고 주소를 넣어놨다.
const poster_error = "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";


// API에 요청을 보낸다.
// API의 기본값은 en-us 이며 이것은 ISO 639-1를 따른 다고 되어있다. 표에 따라서 ko를 넣어보니 한국어로 정보를 불러왔다.
fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1', options)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        // id 값으로 저장하기
        const container = document.getElementById('movieData'); // class 가 아니라 id 로 저장된다.
        // const container = document.getElementsByClassName('movieData'); // 이유는 모르겠는데 안된다... class로 했는데도 id값을 만들고 앉아있다.
        
        container.classList.add('movieData') // id랑 class를 동시에 가져도 문제 될 것이 없기때문에 그냥 class를 추가한다.

        //  필수조건 forEach사용하기
        // 과제에서 필수조건으로 제시하지 않았더라도, 정보를 가공하는데는 반복 실행이 필요하다.
        //사람이 컴퓨터에게 일을 시키는 이유가 같은걸 반복시키기 위함임을 생각하면 가장 중요한 기능인것 같다.
        movies.forEach(movie => {
            // 카드 만들기는 별도의 함수로 만들었다.
            const card = makeCards(movie)
            container.appendChild(card);
        });
    })
    //에러 띄우기, 실제로 동작하는 걸 본것은 엑스박스를 해결하기 위해 코드를 수정하던 때 밖에 없다.
    //아마 잘만들어진 api라서 에러가 뜰 일이 없는 것 같다.
    .catch(err => console.error(err));

// 클라이언트에서 검색 버튼을 눌렀을때 작동하는 함수
function handleSearch(event) {
    event.preventDefault(); // 기본 제출 동작 = 새로고침 방지

    const searchInput = document.getElementById('search_input');

    // .trim() 공백제거 .toLowerCase() 영어 알파벳 검색을 위해 모두 소문자로 만들기.
    const searchTerm = searchInput.value.trim().toLowerCase();

    // 검색 버튼을 두 개 만들어 놨기 때문에 어느 버튼을 눌렀는지 판단해야한다.
    // 판단하는 방법은, ID 값이 search_btn 인 곳의 텍스트 값을 읽어 들이는 것이다.
    // 두 번째 버튼에는 id값이 기본적으로 할당되어있고, 첫 번째 버튼은 누를때 id값이 할당된다.
    // 왜냐하면 같은 id값이 여러 군데에 할당되어 있다면 첫 번째 버튼의 값만 보기 때문이다.
    // 두 번째 버튼을 누르면 첫 번째 버튼의 id값을 없애도록 만들어 뒀기 때문에, 내가 어느 버튼을 눌렀는지 구분 할 수 있다.
    let typeBTN = document.getElementById("search_btn").textContent;
    
    // console.log(typeBTN)

    if (typeBTN === '결과 내 검색') {
        // console.log('1111111111111111')
        if (searchTerm !== '') { // 검색어가 없는 경우에는 작동하지 않는다.
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
        // console.log('222222222222')
        if (searchTerm !== '') { //검색 내용이 공백이 아닐경우에만 실행
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDRmMDE1NzZkYjlmZDUxNTVmNGM0OTM5Mjk4YmUzYiIsInN1YiI6IjY0NzQzODg2YmUyZDQ5MDBiZjllNmRjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._vFLIvNHHBPhV-LxwpQzO6HAXWX0XNX9tHq-5lMBte4'
                }
            };
            //굳이 성인검색을 끌 필요는 없다고 판단함,                          encodeURIComponent(searchTerm) 는 인터넷 주소에 한글을 넣을 수 있게 변환하는 과정이다.
            const url = 'https://api.themoviedb.org/3/search/movie?query=' + encodeURIComponent(searchTerm) + '&language=ko&page=1';
            // api를 통해서 검색할때는 영문 대소문자를 구분하지 않고 검색해주므로 별도의 변환이 필요 없다.


            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    const movies = data.results;
                    // 만든 카드를 프론트 엔드로 보낼 준비를 한다.
                    const container = document.getElementById('movieData');
                    // container = id 가 movieData 인 html의 내용물을 바꾸는 기능을 한다.
                    container.innerHTML = '';

                    movies.forEach(movie => {
                        const card = makeCards(movie)
                        container.appendChild(card);
                    });
                })
                .catch(err => console.error(err));
        }
    }
}

// 카드를 만드는 함수
// 원래는 api에서 기본으로 가져올 때, api를 사용해서 검색을 할때 모두 중복되는 부분이었다.
// 코드의 유지, 보수를 쉽게 하기 위해서 별도의 펑션으로 만들었다.
// 만드는 중의 시행착오로는 forEach부분 부터 함수로 만드니까 작동이 안됐고, 그 안의 내용물만 함수로 만드니 작동이 잘 되었다.
// 이유는 아직 잘 모르겠다. forEach는 반복을돌릴대상.forEach() 형태로 되어있어서 함수의 맨처음에는 올 수 없는 것일까?
function makeCards(movie) {
    const card = document.createElement('div'); // 카드들은 div 에 담는다.
    card.classList.add('card'); // class 명은 card 다
  
    // 영화 제목은 h2 태그를 사용한다. h 태그는 단순히 크고 굵은 것이 아니라 정말로 제목이라는 의미이기 때문에 이것이 검색등에 중요한 역할을 한다.
    const title = document.createElement('h2'); 
    // 영화 제목과 평점이 같은 줄에 있어야 보기 편하기 때문에 평점도 같이 넣는다. 이때 제목과 평점의 구분을 편하게 하기 위해서 공백과 괄호를 넣는다.
    // 또한 api로 검색하면 소숫점 셋 째 자리까지 보여주기 때문에 .toFixed(1)로 소숫점 첫째자리와 가장 비슷한 숫자(str 타입)으로 변환한다.
    title.textContent = movie.title + ' (' + movie.vote_average.toFixed(1) + ')'; 
    title.classList.add('rate');
  
    // 영화 개요는 단순히 텍스드들이 때문에 p 태그를 사용한다.
    const overview = document.createElement('p'); 
    overview.textContent = movie.overview;
  
    //  필수조건 화살표 함수 사용하기
    // 포스터의 경우 크게 두가지 경우가 있다.
    // 1. 포스터 주소의 뒷부분(/고유값.jp)이 있는 경우
    // 2. 포스터가 없어서 null 값이 있는 경우
    // null 값은 object 타입, 평범한 포스터들의 값은 string 타입이다.
    // string 타입이 아닌경우 위에서 선언해둔 TMDB의 로고 주소를 넣고,
    // 아닌 경우에는 w500 짜리 주소와 "조립" 한다.
    const poster_front = movie.poster_path; 
    const full = x => {
      if (typeof x !== 'string') {
        return poster_error;
      } else {
        return "https://image.tmdb.org/t/p/w500" + x;
      }
    }
    
    //상기의 화살표 함수를 이용하여 포스터 주소를 불러온다.
    const poster = document.createElement('img');
    poster.src = full(poster_front);
    poster.classList.add('poster');
  
    //위에서 만든 요소들을 카드에 추가한다.
    card.appendChild(title);
    card.appendChild(overview);
    card.appendChild(poster);
    
    //만들어낸 카드를 내보낸다.
    return card;
  }






// document.write('<script src="/0.js"></script>');
//     "https://image.tmdb.org/t/p/w500"