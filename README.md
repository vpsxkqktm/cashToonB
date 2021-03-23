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

### create Database

pgAdmin4 v5를 설치할 때 사용할 패스워드를 묻습니다. 이때 입력한 패스워드가 DB 서버를 켤 때 필요한 패스워드가 됩니다. 패스워드를 입력한 뒤 browser에서 PostgreSQL 13를 누르면 또 한 번 패스워드를 물은 뒤, postgreSQL 서버가 켜집니다. (PORT: 5432)

초기 설정 기준으로 다음과 같이 카데고리가 이어집니다.

- Server
  - PostgreSQL 13
    - DataBase
      - postgres

특별한 설정없이 사용하기 위해서 DataBase 우클릭 ㅡ> Create ㅡ> Database... 에 진입하여 Database 이름을 정하고 Save 합니다. create된 Database를 클릭하면 Database가 켜집니다.

### create .env File

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

**npx prisma migrate reset --preview-feature**를 입력하면 모든 데이터 삭제된다고 겁을 줍니다. DB에 있는 내용들을 지우는 것이니 초기 셋업 단계에서는 상관 없습니다.

**npx prisma migrate dev --preview-feature**를 입력하면 migration name을 묻습니다. git의 commit 기능에서 메모를 남기는 것과 같습니다. (-m "")

여기까지 성공하면 node_modules 폴더에 @prisma\client가 생성되면서 이제 서버와 클라이언트를 컨트롤 할 수 있게 됩니다.

---

> 해당 프로젝트는 typescript를 사용할 것을 권장하지만, 제 지식 부족으로 인해 ㅡㅡ.. 일단은 파일명만 ts이고 내용은 js 기반으로 작성되어 있습니다.

# Welcome to Server!

이제부터 graphql과 prisma를 통해 서버를 개발할 수 있게 되었습니다. 이제 prisma, apollo 공식 문서를 읽읍시다.

https://www.prisma.io/docs/

https://www.apollographql.com/docs/apollo-server/

### Start Server

pgAdmin으로 DB 서버를 켠 뒤 터미널 창에 다음과 같이 입력합니다.

```
npm run dev
```

이제 크롬을 열어서 http://localhost:4000/ 에 진입하면 playground라는 graphql의 Query 테스트 페이지가 열립니다. 이제 서버 개발을 본격적으로 진행할 수 있습니다.

### GraphQL

서버는 이제 typeDefs에 정의되어 있는 문제를 resolvers를 참고하여 정답을 찾아 요청에 응답합니다.

서버는 쿼리 언어인 graphql을 통해 개발하고 DB와 backend가 연동되어야 하는 부분이 있을 경우에 schema.prisma에 정의하여 DB와 backend의 객체 관계를 prisma가 자동으로 매핑하도록 합니다.

**이제 graphql과 prisma 어떻게 사용하는지 createAccount를 통해 알아봅시다.**

```javascript
// createAccount.typeDefs.ts

import { gql } from "apollo-server";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      password: String!
      email: String!
    ): CreateAccountResult!
  }
`;
```

민감한 서버를 위한 언어답게 컴파일러가 객체 추론을 하지 않습니다. 개발자가 type을 만들어서 직접 객체 타입을 지정해줘야 합니다.

- type Mutation: **클라이언트에서 데이터를 서버로 보내줘야할 때 사용합니다.** 예시로 들고 있는 계정 생성(createAccount)의 경우 유저의 정보를 클라이언트에서 입력받아 서버로 보내줘야하기 때문에 Mutation을 사용합니다.

- type Query: 서버에 있는 데이터를 **가져오기만** 합니다. 열람, 조회 등의 작업을 해야할 때 사용합니다. seeProfile.typeDefs.ts 파일을 참고하세요.

따라서 type Mutation {createAccount(...)}는 계정 생성을 위해 유저에게 받아야하는 데이터 목록들의 타입을 지정하는 코드입니다.

이후 쓰여있는 :CreateAccountResult는 type Mutation의 요청 결과를 어떻게 반환(응답)할 것인가를 정의한 것으로, 풀어서 말하면 "type Mutation {createAccount(...)}의 결과는 CreateAccountResult의 형태에 따라 알려주십시오"가 됩니다.

그래서 CreateAccountResult는 요청 응답에 성공하였는지를 true, false로 체크하는 'ok' 그리고 요청 응답에 실패할 경우 발생하는 error를 정의하였습니다.

- 자료형 뒤에 붙는 **!**은 반드시 포함해야하는 데이터를 말합니다. CreateAccountResult를 예시로 들자면, 서버 응답 성공 여부를 반환하는 ok는 반드시 사용되어야 하지만 error는 발생하는 경우에만 사용되기 때문에 **!**가 붙지 않습니다.

### GraphQL with. Prisma

**여기 있는 내용을 사용합니다. https://www.prisma.io/docs/reference/api-reference/prisma-client-reference**

이제 정의한 내용을 바탕으로 서버 응답을 만들어보겠습니다.

```javascript
// createAccount.resolvers.ts

import * as bcrypt from "bcrypt";

import client from "../../client";

export default {
  Mutation: {
    createAccount: async (_, { username, email, password }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username or email is already");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username: username,
            email: email,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Failed create account.",
        };
      }
    },
  },
};
```

graphql의 매서드는 다음과 같습니다.

function(root, args, context, info) 서버에서 **\_**은 무시하는 매서드(인자값)를 뜻합니다. graphql에서는 매서드 순서를 **반드시** 지키게 되어있습니다.

일반적으로 함수 매서드는 필요 없으면 그냥 넘기고 써버리면 됩니다.

```javascript
// 이런 listen 함수가 있을 때
listen(port: number, hostname: string, backlog: number, callback?: () => void): Server

listen(4000, 123) // 4000: port, 123: backlog
// hostname이 number가 아니라 string이기 때문에 컴파일러가 추론하여 알아서 매서드를 넘겨줌
```

하지만 graphql(서버)에서는 이렇게 됩니다.

```javascript
listen(4000, 123); // 4000: port, 123: hostname
// 무조건 순서 지켜서 매서드 넣어버림. 에러 발생
```

즉 자기가 쓰지 않을 매서드는 **\_**을 사용하여 무시 처리를 직접해줘야 합니다.

createAccount에서 무시된 root는 이전 resolver에서 받은 값을 말하는데, createAccount는 이전 resolver가 없기 때문에 root를 무시해줘야 합니다.

이후에 나오는 args는 { username, email, password }
즉, typeDefs에서 정의했던 계정 생성을 위해 유저에게 받아야하는 데이터들이죠.

다행히 매서드를 더 작성하지 않으면 **\_**가 자동으로 완성되기 때문에

```javascript
createAccount: async(_, { username, email, password }, _, _); // 이렇게 할 필요는 없습니다.
```

### using Prisma

이제 본격적으로 Prisma의 기능이 사용됩니다. **existingUser**는 생성하려는 계정 정보가 이미 사용되었는지를 체크합니다.

```javascript
const existingUser = await client.user.findFirst({
  where: {
    OR: [
      {
        username,
      },
      {
        email,
      },
    ],
  },
});
```

> npx prisma migrate dev --preview-feature

아까 위 명령어로 client를 만들었습니다. 이제 이 클라이언트를 활용하면 DB에 접근이 가능합니다. client에서 생성했었던 user 모델에 접근해봅시다.

```javascript
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

아직 prisma가 스키마까지 완전 자동으로 만들어주진 않습니다. 그래서 schema.prisma에서 개발자가 직접 관계 매핑을 어떻게 할 것인지 정해줘야 합니다.

user.typeDefs.ts에 적힌 내용을 바탕으로 만들었던 schema.prisma에서 user 모델을 확인해보면 username과 email가 **@unique**로 선언되었습니다. 이는 DB에서 중복을 허용하지 않는다는 말입니다. 따라서 email과 username은 필터링을 걸면 이미 존재하는지, 존재하지 않는지 알 수 있습니다.

- findFirst: DB 레코드에서 첫 번째로 일치하는 항목을 찾습니다.
- where: 필터링 조건을 선언합니다.
- OR: 논리연산자 ||와 동일합니다.

즉, user들 중에 args로 입력받은 아이디와, 이메일 중복이 있는지 확인하는 코드입니다.

- graphql 쿼리 언어와 달리 prisma는 **!** 키워드를 쓰지 않습니다. 대신 자료형 뒤에 아무것도 쓰지 않으면 반드시 포함해야하는 데이터로 간주합니다. 대신 prisma는 graphql과 반대로 필수적이지 않는 데이터 자료형에 **?**을 붙여줍니다.

```javascript
await client.user.create({
  data: {
    username: username,
    email: email,
    password: hashedPassword,
  },
});
```

중복 체크가 완료되면 user 모델에 유저를 create 합니다. 그 유저의 값(data)는 username = 입력받은 username, email = 입력받은 이메일 ...이 됩니다.

---

## Playground and prisma Studio

Playground에서 DOCS를 누르면 서버 코드에서 작성한 함수들을 한 눈에 볼 수 있으며 그 아래에 있는 SCHEMA에선 선언한 스키마들을 한 눈에 볼 수 있습니다.

한 번 작성했던 쿼리는 상단의 HISTORY를 통해 열람할 수 있고 불러와 쓸 수도 있습니다.

이제 서버에서 직접 쿼리 언어를 작성하여 계정 생성을 해보겠습니다. localhost:4000에서 열리는 playground에 다음과 같이 작성합니다.

```javascript
mutation {
  createAccount(username:"admin" email: "admin@gmail.com" password: "1234"){
    ok
    error
  }
}

```

재생 버튼을 눌러 실행을 하면 username이 admin이고 email이 admin@gmail.com인 유저가 생성됩니다. 눈으로 확인하기 위해서는 프로젝트 폴더에서 터미널 창을 하나 더 열고 다음과 같이 입력합니다.

```
npm run studio
```

그러면 DB GUI창이 뜨고 여기서 DB를 GUI 환경에서 확인하거나 생성, 수정, 삭제가 가능합니다.

---

## LOGIN Test

아직 소셜로그인이 미구현이기 때문에 개발 테스트를 위해 jwt를 이용한 자체 로그인이 구현되어 있습니다. mutation{login()}을 playground에서 실행하면 token이 발급됩니다. 이 token을 playground 하단에 있는 **HTTP HEADERS**에 다음과 같이 작성합니다.

```
{"authorization": "발급받은 토큰"}
```

이러면 로그인된 상태

---

## Connent AWS
