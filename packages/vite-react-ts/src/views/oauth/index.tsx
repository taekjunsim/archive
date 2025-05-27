import axios from "axios";
import React from "react";
const REDIRECT_URI = "http://localhost:3000/test";
const RESPONSE_TYPE = "code";

function Oauth() {
  const GOOGLE_CLIENT_ID =
    "323590950809-cgoq3nkealf3nl2ak58nv5rlq50ts8os.apps.googleusercontent.com";

  return (
    <div>
      Google
      <a
        href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=openid email`}
        // TODO: check, scope가 openid profile email도 되는건가?
      >
        로그인
      </a>
    </div>
  );
}

// https://developers.naver.com/docs/login/api/api.md#2--api-%EA%B8%B0%EB%B3%B8-%EC%A0%95%EB%B3%B4
function Naver() {
  const NAVER_CLIENT_ID = "WUNnhb8fyw_ESppp5ogx";
  return (
    <div>
      Oauth
      <a
        href={`https://nid.naver.com/oauth2.0/authorize?response_type=${RESPONSE_TYPE}&client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}
      >
        로그인
      </a>
    </div>
  );
}

// https://developers.kakao.com/console/app/1100492/config/appKey
function Kakao() {
  const KAKAO_REST_API_KEY = "f4fe9573e1fa246a66a666f37da7423a";

  return (
    <div>
      Oauth
      <a
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=
${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
      >
        로그인
      </a>
    </div>
  );
}

export default Oauth;
