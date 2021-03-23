export default {
  Comment: {
    isMine: ({ authorId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return authorId === loggedInUser.id;
    },
  },
};
