const core = require("@actions/core");
const { context, getOctokit } = require("@actions/github");
const { slack } = require("./modules/slack");
const { github } = require("./modules/github");

// TODO: update, 빌드 시 각 조건에 맞는 빌드 파일을 생성하도록 추후에 빌드 수정하기
(async () => {
  try {
    // const octokit = github.getOctokit(greet);

    const { payload } = context;
    const eventActivityType = payload.action;
    const pullRequest = payload.pull_request;
    const pullRequestReview = payload.pull_request_review;

    const userData = core.getInput("user-data");
    const userMappingObj = JSON.parse(userData);
    const userList = await slack.getUserList();

    const incorrectMappingList = [];
    const notInSlackUserList = [];

    const isNotificationToReviewer = // isReviewRequested
      eventActivityType === "review_requested" ||
      eventActivityType === "synchronize";

    // reviewer에게 noti
    if (isNotificationToReviewer) {
      const { revieweeName, reviewerNameList } = github.getName(pullRequest);

      const reviewerSlackIdList = ["U0698LY5PPY", "U069AKLFU5B"];
      // const reviewerSlackIdList = reviewerNameList.map((reviewerName) => {
      //   const reviewerSlackName = userMappingObj[reviewerName];
      //   if (!reviewerSlackName) {
      //     incorrectMappingList.push(reviewerName);
      //   } else if (!slack.matchSlackId(userList, reviewerSlackName)) {
      //     notInSlackUserList.push(reviewerSlackName);
      //   } else {
      //     return slack.matchSlackId(userList, reviewerSlackName);
      //   }
      // });

      const revieweeSlackName = userMappingObj[revieweeName];
      if (!revieweeSlackName) {
        incorrectMappingList.push(revieweeName);
      } else if (!slack.matchSlackId(userList, revieweeSlackName)) {
        notInSlackUserList.push(revieweeSlackName);
      }
      const revieweeSlackId = slack.matchSlackId(userList, revieweeSlackName); // mention

      if (incorrectMappingList.length) {
        // noti: '실제 아이디'의 github name이 잘못 입력되었습니다.
      }

      if (notInSlackUserList.length) {
        // noti: slack의 user list에 '잘못 입력된 슬랙 네임'과 일치하는 user가 없습니다.
      }

      const channelIdList = [];

      while (reviewerSlackIdList.length) {
        const { channel } = await slack.getChannelInfo(reviewerSlackIdList[0]);

        channelIdList.push(channel.id);
        reviewerSlackIdList.shift();
      }

      // 1. pr url 링크 연결
      // 2. pr approve 버튼에 github approve api 연결(Octokit, github token)
      //  이 때 필요한 token이 계정 토큰인지 아니면 레포의 token인지 확인하기
      const blocks = [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "<@revieweeSlackId>가 review를 요청했습니다.", // pr url,
          },
        }, // github api를 이용해서 approve도 할 수 있나?
      ];

      channelIdList.forEach(async (channelId) => {
        await slack.sendDirectMessage(channelId, blocks);
      });
    }

    const isNotificationToReviewee = eventActivityType === "submitted"; // isReviewSubmitted
    // reviewee에게 noti
    if (isNotificationToReviewee) {
      const revieweeSlackName = userMappingObj[revieweeName];
      if (!revieweeSlackName) {
        incorrectMappingList.push(revieweeName);
      } else if (!slack.matchSlackId(userList, revieweeSlackName)) {
        notInSlackUserList.push(revieweeSlackName);
      }
      const revieweeSlackId = slack.matchSlackId(userList, revieweeSlackName); // mention
      // pullRequestReview
      // return
    }

    const isNotificationToAll =
      eventActivityType === "closed" && pullRequest.merged === true;
    // 신플 채널에 있는 팀원 모두에게 noti
    if (isNotificationToAll) {
      // const params = {
      //   blocks: [
      //     {
      //       type: "section",
      //       text: {
      //         type: "mrkdwn",
      //         text: "Hey <@U069AKLFU5B>, thanks for submitting your report!",
      //       },
      //     },
      //   ],
      // };
      // slack.sendNotiToPublicChannel(params)
      // return
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();

/* 
  todo:
    0. token 필요한지 확인하기: api에 접근할 때 token이 필요 ex. user id api 호출
    1. user-data에 githubID와 slackID 입력
    2. payload를 slack의 incoming webhook 포맷으로 전환
    3. UI를 
    4. axios로 webhook url에 post 날리기
      ex. const results = await axios.post(
            process.env.SLACK_WEBHOOK_URL, 
            JSON.stringify(params), 
            {
              headers: { 
                "Content-Type": "application/json" 
              },
            }
          )      
    done.

    1. 어떤 이벤트에서 메세지를 날린 것인지 정하기: merge (공통, main과 release 브랜치만), pr request (당사자, open과 close는 noti x)
    2. 이벤트 별로 어떤 데이터가 전달되어야 하는지 정하기
      ex. PR request는 * request를 요청받은 사람에게 DM으로 전송 *하되, *request를 요청한 사람을 멘션*할 것. 
          * 해당 PR로 이동할 링크 *, * 메세지 문구 *, 

  * user token을 사용하면 DM 채널로 전달이 되는건가?! 그러면 request 당사자에게만 메세지를 전달할 수도 있겠네??
*/

/* 
        1. github, get reviewer's name and reviewee's name in github
          ex) const reviewerList = getRequestReviewerName(pullRequest);
          ex) const revieweeList = ~~~~ (pullRequest.user.login)
        2. slack, get user list in slack
          ex) const memberList = await app.client.users.list({
                token,
              }); 
        3. input, match slack nickname and github name(reviewer and reviewee) in slack user list
          ex) const list = memberList.filter(el => reviewerList.includes(el.real_name))
          ex) const list = memberList.filter(el => revieweeList.includes(el.real_name))
        4. slack, get reviewer's slack ID
          ex) const slackIdList = list.map(el => el.id) // id의 key 확인하기
        5. slack, open conversation (direct message) with slack ID
          ex) const channelInfo = await app.client.conversations.open({
                token,
                users: slackIdList.join(','), // array가 가능한지, 아니면 string만 가능한지 확인하기
              }); // TODO: check, 여러명에게 메세지를 전송할 때 그룹채팅방이 개설되는지, 개별로 DM이 날라가는지 체크하기
        6. slack, get channel ID
          ex) const channelId = channelInfo.channel.id
        7. slack, post direct message to reviewer
          ex) const check = await app.client.chat.postMessage({
                token,
                channel: channelIdList.channel.id,
                  blocks: [
                    {
                      type: "section",
                      text: {
                        type: "mrkdwn",
                        text: <@reviewee의 slack id>가 review를 요청했습니다. // pr url, 
                      },
                    }, // github api를 이용해서 approve도 할 수 있나?
                  ],
              });
      */
