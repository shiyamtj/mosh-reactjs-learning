import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '7d175225468045fbabdfe07692c1392c',
  },
})
