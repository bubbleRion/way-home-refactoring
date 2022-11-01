const template = {
  // pwFind의 스타일
  findStyleTemp : `<style>
  *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }

  #root{
      width: 1920px;
      height: 1080px;
      background-color: #FFFFF0;
  }

  #root > header{
      width: inherit;
      height: 8vh;
      background-color: rgba(210, 105, 30, 0.6);
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  #root > header > .logo{
      color: white;
      font-size: 48px;
      margin-left: 20px;
      text-decoration: none;
  }

  #root > header > .sign{
      display: flex;
      flex-direction: row;
  }
  #root > header > .sign > a{
      margin-right: 20px;
      text-decoration: none;
      color: #000;
  }
  #root > header > .sign > a > div{
      width: 130px;
      height: 50px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50px;
  }
  #root> main {
      width: inherit;
      height: 92vh;
      display: flex;
      
  }
  #root> main > div{
      width: 50vw;
      height: 92vh;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  #root > main > .text-box > .form-box{
      display: flex;
      flex-direction: column;
  }

  #root > main > .text-box > .form-box > .text-name{
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #CCC;
      width: 600px;
      height: 50px;
      margin-top: 50px;
      font-size: 24px;
  }

  #root > main > .text-box > .form-box > .text-id{
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #CCC;
      width: 600px;
      height: 50px;
      margin-top: 50px;
      font-size: 24px;
  }

  #root > main > .text-box > .form-box > .text-email{
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #CCC;
      width: 600px;
      height: 50px;
      margin-top: 50px;
      font-size: 24px;
  }

  #root > main > .text-box > .form-box > .sbm{
      all : unset;
      margin-top: 150px;
      display: flex;
      justify-content: center;
      width: 600px;
      height: 100px;
      border: 1px solid #000;
      border-radius: 50px;
      background-color: #fff;
  }
  #root > main > .text-box > .form-box > a{
      all : unset;
      margin-top: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 600px;
      height: 100px;
      border: 1px solid #000;
      border-radius: 50px;
      background-color: #fff;
  }
  #root > main > .img-box > img{
      width: 700px;
      height: 800px;
  }
</style>`,

//  실종동물 게시판의 템플릿
  boardTemp : (login, write, data) =>{
    return `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="board.css">
  </head>
    
    <body>
      <div id="root">
        <header>
          <!-- 맨위에 긴박스 -->
          <a href="/">Way Home</a>
          <div>
            ${login}
          </div>
          <div>
            <a href="signup">회원가입</a>
          </div>
        </header>
        <div>실종 동물 페이지</div>
        <div>
        <a href="/lostBoard">유기동물</a>
        </div>
        <div>
        ${write}
        </div>
        <div>
          <form action="/searchPage" method="get">
            <input class="search-txt" type="text" name="result" placeholder="검색어를 입력해 주세요">
          </form>
        </div>
        <main>
        <!-- 가운데 10개 박스감싸는 박스 -->
          ${data}
        </main>
        <div class="left">
          <img src="../../public/board/화살표 (2).png" alt="">
        </div>
        <div class="right">
          <img src="../../public/board/화살표 (2).png" alt="">
        </div>
      </div>
    </body>
    </html>`   
},
// 글작성 페이지의 템플릿
createTemp : (count) =>{
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="createboard.css">
    <title>Document</title>
  </head>
  <body>
    <div id="root">
      <!--? 각 모든 페이지가 공유하는 헤더 몇몇 필요없는 부분의 버튼을 제거하는것을 제외하고 값이 동일하다-->
      <header>
        <div class="logo"><a href="/">Way Home</a></div>
      </header>
      <main>
        <!--? 정보 작성 공간 form태그로 input테그에서 작성된 정보를 전송 DB에 저장하는 역할을 진행한다. 드래그인 드롭으로 이미지를 삽입할 공간의 할당과 등록된 이미지의 이름을 출력할 장소 구현-->
        <form action="create" method="post" enctype="multipart/form-data">
          <section id="createImgSector">
            <div id="createImg">
              <div id="drag">이미지를 드래그하여 올려놓으십시오 (최대 3장)</div>
              <div id="imgText">그림 이름.jpg</div>
              <div id="imgText">그림 이름.jpg</div>
              <input type="file" name="image" placeholder="이미지 업로드"  style="width: 700px; height : 40px">
            </div>
          </section>
        <!--? 각 name은 DB에 저장된 데이터의 이름이고 placeholder을 통해 어떤 정보를 적고 어떤 데이터 안에 저장될지 알 수 있다.-->
          <div id="createTextSector">
            <div id="createText">
              <input type="text" name="name" class="infoA" placeholder="이름">
              <input type="text" name="gender" class="infoA" placeholder="성별">
              <input type="text" name="breed" class="infoA" placeholder="견종">
              <input type="text" name="age" class="infoA" placeholder="나이">
              <input type="text" name="isNeutering" class="infoA" placeholder="중성화 유무">
              <input type="text" name="location" class="infoA" placeholder="잃어버린 곳">
              <input type="text" name="uniqueness" class="infoB" placeholder="특이사항">
              <input type="submit" id="submit" value="작성하기"></input>
              <input type="hidden" value="${count}">
            </div>
          </div>
        </form>
      </main>
    </div>
  </body>
  </html>`
},
// 메인 페이지의 템플릿
indexTemp : (login) =>{
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="mainPage.css">
    <title>Document</title>
  </head>
  <body>
    <div id="root">
      <header>
        <a href="/" class="logo">Way Home</a>
        <div class="sign">
            ${login}
            <a href="/signup" class="sign-up"><div>회원가입</div></a>
        </div>
    </header>
      <main>
        <div id="pageSector">
          <a href="/lostBoard" id="selectPage">
            <img src="images/pngegg (3).png" alt="" id="mainImg">
            <div id="abandonment">유기 동물</div>
          </a>
          <a href="/board" id="selectPage">
            <img src="images/pngegg (3).png" alt="" id="mainImg">
            <div id="missing">실종 동물</div>
          </a>
        </div>
        <div id="introduce">
          저희 사이트는 아프고 안타까운 동물들을 보호하고<br>
          새로운 인연을 맺어주기 위해 만들어졌으며<br>
          잃어버린 소중한 반려동물을 찾기위해 만들어졌습니다.<br>
        </div>
      </main>
    </div>
  </body>
  </html>`
},
// 실종동물 세부 페이지의 템플릿
detailTemp : (login, img, isLogin, result, commentTextBox, commentInputBox) =>{
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
  </head>
    <link rel="stylesheet" href="./write.css">
    
    <body>
      <div id="root">
        <header>
          <div class="logo"><a href="/">Way Home</a></div>
          <div class="sign">
            ${login}
            <a href="/signup" class="sign-up">
              <div>회원가입</div>
            </a>
          </div>
        </header>
        <main>
          <section>
            <div>
            <img src="${img}" alt=""/>
            
            </div>
            <div>
              ${isLogin}
            </div>
            <div>
              <img src="images/right-arrow.png" alt="">
            </div>
            <div>
              <img src="images/right-arrow.png" alt="">
            </div>
          </section>
          <article>
            ${result}
            <div class="scroll">
              <div class="comment">
                  ${commentTextBox}
              </div>
            </div>
            ${commentInputBox}
          </article>
        </main>
      </div>
    </body>
    
    </html>`
},
// 유기동물 페이지의 템플릿
lostBoardTemp : (login, images) =>{
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="board2.css">
  </head>

<body>
  <div id="root">
    <header>
      <!-- 맨위에 긴박스 -->
      <a href="/">Way Home</a>
      <div>
        ${login}
      </div>
      <div>
        <a href="/signup">회원가입</a>
      </div>
    </header>
    <div>유기 동물 페이지</div>
    <div>
    <a href="/board">실종동물</a>
    </div>
    <div>
      <form action="/lostSearchPage" method="get">
        <input class="search-txt" type="text" name="result" placeholder="검색어를 입력해 주세요">
      </form>
    </div>
    <main>
    <!-- 가운데 10개 박스감싸는 박스 -->
      ${images}
    </main>
    <div class="left">
      <img src="../../public/board/화살표 (2).png" alt="">
    </div>
    <div class="right">
      <img src="../../public/board/화살표 (2).png" alt="">
    </div>
  </div>
</body>
</html>`
},
// 유기동물의 세부 페이지의 템플릿
lostDetailTemp : (login, images, result, commentInput) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <link rel="stylesheet" href="./write.css">
  <body>
    <div id="root">
      <header>
        <div class="logo"><a href="/">Way Home</a></div>
        <div class="sign">
          ${login}
          <a href="/signup" class="sign-up">
            <div>회원가입</div>
          </a>
        </div>
      </header>
      <main>
        <section>
          <div>
          ${images}
          </div>
          <div>
          </div>
          <div>
            <img src="images/right-arrow.png" alt="">
          </div>
          <div>
            <img src="images/right-arrow.png" alt="">
          </div>
        </section>
        <article>
          ${result}
          
          ${commentInput}
        </article>
      </main>
    </div>
  </body>
  
  </html>`
},
// 유기동물 검색 페이지의 템플릿
lostSearchTemp : (login, images) =>{
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="board2.css">
  </head>
  
  <body>
    <div id="root">
      <header>
        <!-- 맨위에 긴박스 -->
        <a href="/">Way Home</a>
        <div>
          ${login}
        </div>
        <div>
          <a href="/signup">회원가입</a>
        </div>
      </header>
      <div>유기 동물 페이지</div>
      <div>
      <a href="/board">실종동물</a>
      </div>
      <div>
          <form action="/lostSearchPage" method="get">
              <input class="search-txt" type="text" name="result" placeholder="검색어를 입력해 주세요">
          </form>
      </div>
      <main>
      <!-- 가운데 10개 박스감싸는 박스 -->
        ${images === "" ? "<h1>검색결과 없네요!</h1>" : images}
      </main>
      <div class="left">
        <img src="../../public/board/화살표 (2).png" alt="">
      </div>
      <div class="right">
        <img src="../../public/board/화살표 (2).png" alt="">
      </div>
    </div>
  </body>
  </html>`
},
// 비밀번호 찾기의 템플릿
pwFindTemp : (login)=>{
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${this.findStyleTemp}
      <title>Document</title>
  </head>
  <body>
      <div id="root">
          <header>
              <a href="/" class="logo">Way Home</a>
              <div class="sign">
                  ${login}
                  <a href="/signup" class="sign-up"><div>회원가입</div></a>
              </div>
          </header>
          <main>
              <div class="img-box">
                  <img src="images/istockphoto-508423060-170667a.jpg" alt="" class="main-img">
              </div>
              <div class="text-box">
                  <form action="/pwFind" method="post" class="form-box">
                      <input type="text" name="name" placeholder="이름" class="text-name">
                      <input type="text" name="id" placeholder="아이디" class="text-id">
                      <input type="text" name="email" placeholder="이메일 주소" class="text-email">
                      <input type="submit" value="비밀번호 찾기" class="sbm">
                      <a href="/idFind">아이디 찾기 페이지</a>
                  </form>
              </div>
          </main>
      </div>
  </body>
  </html>`
},
// 실종 동물 검색 페이지의 템플릿
searchTemp : (login, write, result)=>{
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <link rel="stylesheet" href="board.css">
  <body>
    <div id="root">
      <header>
        <!-- 맨위에 긴박스 -->
        <a href="/">Way Home</a>
        <div>
          ${login}
        </div>
        <div>
          <a href="/signup">회원가입</a>
        </div>
      </header>
      <div>실종 동물 페이지</div>
      <div>
      <a href="/lostBoard">유기동물</a>
      </div>
      <div>
      ${write}
      </div>
      <div>
        <form action="/searchPage" method="get">
          <input class="search-txt" type="text" name="result" placeholder="검색어를 입력해 주세요">
        </form>
      </div>
      <main>
      <!-- 가운데 10개 박스감싸는 박스 -->
        ${result === "" ? "<h1>검색결과 없네요!</h1>" : result}
      </main>
      <div class="left">
        <img src="../../public/board/화살표 (2).png" alt="">
      </div>
      <div class="right">
        <img src="../../public/board/화살표 (2).png" alt="">
      </div>
    </div>
  </body>
  </html>`
},
// 글 수정 페이지의 템플릿
updateTemp1 : (seq, userID, name, gender, breed, age, isNeutering, location, uniqueness)=>{
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./createboard.css">
    <title>Document</title>
  </head>
  <body>
    <div id="root">
      <!--? 각 모든 페이지가 공유하는 헤더 몇몇 필요없는 부분의 버튼을 제거하는것을 제외하고 값이 동일하다-->
      <header>
        <div class="logo">Way Home</div>
      </header>
      <main>
        <!--? 정보 작성 공간 form태그로 input테그에서 작성된 정보를 전송 DB에 저장하는 역할을 진행한다. 드래그인 드롭으로 이미지를 삽입할 공간의 할당과 등록된 이미지의 이름을 출력할 장소 구현-->
        <form action="/update2" method="post">
          <section id="createImgSector">
            <div id="createImg">
              <div id="drag">이미지를 드래그하여 올려놓으십시오 (최대 3장)</div>
              <div id="imgText">그림 이름.jpg</div>
              <div id="imgText">그림 이름.jpg</div>
              
            </div>
          </section>
        <!--? 각 name은 DB에 저장된 데이터의 이름이고 placeholder을 통해 어떤 정보를 적고 어떤 데이터 안에 저장될지 알 수 있다.-->
          <div id="createTextSector">
            <div id="createText">
              <input type="hidden" name="seq" value="${seq}">
              <input type="hidden" name="userID" value="${userID}">
              <input type="text" name="name" value="${name}" class="infoA" placeholder="이름">
              <input type="text" name="gender" value="${gender}" class="infoA" placeholder="성별">
              <input type="text" name="breed" value="${breed}" class="infoA" placeholder="견종">
              <input type="text" name="age" value="${age}" class="infoA" placeholder="나이">
              <input type="text" name="isNeutering" value="${isNeutering}" class="infoA" placeholder="중성화 유무">
              <input type="text" name="location" value="${location}" class="infoA" placeholder="잃어버린 곳">
              <input type="text" name="uniqueness" value="${uniqueness}" class="infoB" placeholder="특이사항">
              <input type="submit" id="submit" value="작성하기"></input>
            </div>
          </div>
        </form>
      </main>
    </div>
  </body>
  </html>`
}
}

module.exports = template