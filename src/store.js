export default {
  state: {
    user: {},
    repos: [],
    query: {}
  },
  getters: {
    user (state) {
      return state.user
    },
    repos (state) {
      return state.repos
    },
    filteredRepos (state) {
      return state.repos.filter((repo) => {
        const keywords = (state.query.string || '').match(/\w+/g) || []
        const totalWords = (repo.name.match(/\w+/g) || []).concat((repo.description || '').match(/\w+/g) || [])
        const wordMatch = keywords.every((keyword) => totalWords.some((word) => word.toLowerCase() === keyword.toLowerCase()))
        if (!wordMatch) return false

        const languageMatch = (state.query.language == 'All') ? true : (repo.language === state.query.language)
        if (!languageMatch) return false

        switch (state.query.type) {
          case 'All':
            return true
          case 'Sources':
            return repo.fork === false
          case 'Forks':
            return repo.fork === true
          case 'Archived':
            return repo.archived
          case 'Mirror':
            return repo.mirror_url
          default:
            return true
        }
      })
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setRepos (state, repos) {
      state.repos = repos
    },
    filter (state, params) {
      state.repos = state.repos
      state.query = params
    }
  }
}
