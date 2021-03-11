# 캐시툰 Backend Project

영어로 쓰고 싶지만 영어 못해서 한국어로 씁니다. postgreSQL branch는 postgreSQL DB를 이용하여 DB를 직접 구현하는 프로젝트 입니다. Firebase 기반 백엔드는 firebase branch에서 구현할 생각이지만 이 프로젝트가 성공하면 firebase 프로젝트는 진행되지 않습니다.

## Tech Stack

기반 언어: TypeScript, JavaScript, GraphQL
DB: postgreSQL
ORM: Prisma

## Requirements

- node (version 12 ~ )
- npx

1. postgreSQL 13 설치 https://www.postgresql.org/download/
2. pgAdmin4 v5 설치 https://www.pgadmin.org/download/pgadmin-4-windows/
3. git clone
4. npm install

**postgreSQL 설치 중에 pgAdmin4 설치 여부를 묻습니다. 이때 반드시 체크 박스를 해제하고 pgAdmin4는 따로 설치합니다.**

## DB connect with server

#### create Database

pgAdmin4 v5를 설치할 때 사용할 패스워드를 묻습니다. 이때 입력한 패스워드가 DB 서버를 켤 때 필요한 패스워드가 됩니다. 패스워드를 입력한 뒤 browser에서 PostgreSQL 13를 누르면 또 한 번 패스워드를 물은 뒤, postgreSQL 서버가 켜집니다. (PORT: 5432)

초기 설정 기준으로 다음과 같이 카데고리가 이어집니다.

- Server
  - PostgreSQL 13
    - DataBase
      - postgres

특별한 설정없이 사용하기 위해서 DataBase 우클릭 ㅡ> Create ㅡ> Database... 에 진입하여 Database 이름을 정하고 Save 합니다. create된 Database를 클릭하면 Database가 켜집니다.

#### create .env File

prisma는 .env 파일을 읽어서 postgresql DB와 연결됩니다. 먼저 프로젝트 루트에 .env 파일을 생성합니다. 그리고 다음과 같이 작성합니다.

```
DATABASE_URL="postgresql://사용자이름:DB비밀번호@localhost:5432/DB이름?schema=public"
```

- 사용자 이름: DB Owner를 씁니다. default - postgres
- DB 비밀번호: pgAdmin을 킬 때 입력했던 비밀번호
- DB 이름: Database를 create할 때 정했던 이름

.env 파일을 저장하고 터미널에서 다음과 같이 입력합니다.

```
npx prisma migrate reset --preview-feature
npx prisma migrate dev --preview-feature
```

**npx prisma migrate reset --preview-feature**를 입력하면 모든 데이터 삭제된다고 겁을 줍니다. DB에 있는 내용들을 지우는 것이니 상관없습니다.

**npx prisma migrate dev --preview-feature**를 입력하면 migration name을 묻습니다. git의 commit 기능에서 메모를 남기는 것과 같습니다. (-m "")

여기까지 성공하면 node_modules 폴더에 @prisma\client가 생성되면서 이제 서버와 클라이언트를 컨트롤 할 수 있게 됩니다.

====

# Welcome to Server!

이제부터 graphql과 prisma를 통해 서버를 개발할 수 있게 되었습니다. 이제 prisma, apollo 공식 문서를 읽읍시다.

https://www.prisma.io/docs/
https://www.apollographql.com/docs/apollo-server/
