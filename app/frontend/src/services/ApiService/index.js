import axios from 'axios';

const Label = {
  all: () => {
    axios({
      url: 'http://localhost:4000/api',
      method: 'post',
      data: {
        query: `
          query labels {
            id,
            name
          }
        `,
      },
    }).then(results => results);
  },
};

export default { Label };
