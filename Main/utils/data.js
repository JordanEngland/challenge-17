const initialUsers = [
  {
    username: 'john_doe',
    email: 'john@example.com',
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
  },
];

const initialThoughts = [
  {
    thoughtText: 'This is a sample thought by john_doe.',
    username: 'john_doe',
  },
  {
    thoughtText: 'Hello from jane_smith!',
    username: 'jane_smith',
  },
];

module.exports = { initialUsers, initialThoughts };
