const { App } = require("@slack/bolt");
const core = require("@actions/core");
const axios = require("axios");

const token = process.env.SLACK_TOKEN;
const signingSecret = process.env.SINGING_SECRET;

const app = new App({
  token,
  signingSecret,
}); // TODO: test, 여기서 token을 입력하고 app을 생성하는데 왜 메소드를 사용할 때 또 token을 입력해야하는거지?

const sendNotiToPublicChannel = async (params) => {
  try {
    const slackWebhookURL = process.env.SLACK_WEBHOOK_URL;

    const result = await axios.post(slackWebhookURL, JSON.stringify(params), {
      headers: { "Content-Type": "application/json" },
    });

    return result;
  } catch (error) {
    core.setFailed(error.message);
  }
};

const getUserList = async () => {
  const { members: userList } = await app.client.users.list({
    token,
  });

  return userList;
};

const matchSlackId = (userList, matchingName) => {
  const matchedSlackUser = userList.find(
    (slackUser) => slackUser.real_name === matchingName
  );

  return matchedSlackUser?.id;
};

/**
 *
 * @param {string} slackId 콤마(,)로 여러 ID를 연결하는 경우, 그룹채팅방(DM)이 개설된다.
 */
const getChannelInfo = async (slackId) => {
  const channelInfo = await app.client.conversations.open({
    token,
    users: slackId,
  });

  return channelInfo;
};

const sendDirectMessage = async (channelId, blocks) => {
  await app.client.chat.postMessage({
    token,
    channel: channelId,
    blocks: JSON.stringify(blocks),
  });
};

export const slack = {
  sendNotiToPublicChannel,
  getUserList,
  matchSlackId,
  getChannelInfo,
  sendDirectMessage,
};
