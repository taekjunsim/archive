const getName = (pullRequest) => {
  const revieweeName = pullRequest.user.login;
  const reviewerNameList = pullRequest.requested_reviewers.map((reviewer) => {
    return reviewer.login; // nickname of reviewer
  });

  return {
    revieweeName,
    reviewerNameList,
  };
};

const notifyToReviewer = () => {};

const notifyToReviewee = () => {};

export const github = {
  getName,
};
