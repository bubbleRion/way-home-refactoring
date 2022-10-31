const template = {
  boardTemp : (login, write, data) =>{
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
createTemp : (count) =>{
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
detailTemp : (login, img, userId, result, seq, commentTextBox, commentInputBox) =>{
  `<!DOCTYPE html>
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
                      ${userId == item.userID ? `<div>
                      <form action="/update" method="post">
                      <input type="hidden" name="seq" value="${seq}">
                      <input type="submit" value="글 수정" class="update">
                      </form>
                    </div>
                    <div>
                      <form action="/delete" method="post">
                      <input type="hidden" name="seq" value="${seq}">
                      <input type="submit" value="글 삭제" class="delete">
                      </form>
                    </div>` : ""}
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
}
}

module.exports = template