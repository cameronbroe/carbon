import React from 'react'
import Router from 'next/router'

import IndexPage from './index'
import ApiContext from '../components/ApiContext'

import api from '../lib/api'

class IdPage extends React.PureComponent {
  static contextType = ApiContext
  static async getInitialProps({ res, query }) {
    console.log('***', query)
    const path = query.id
    const parameter = path && path.length >= 19 && path.indexOf('.') < 0 && path

    let snippet
    if (parameter) {
      snippet = await api.snippet.get(parameter)
      if (snippet) {
        return { snippet }
      }
    }

    if (res) {
      res.writeHead(302, {
        Location: '/'
      })
      res.end()
    } else {
      Router.push('/')
    }

    return {}
  }

  render() {
    return <IndexPage {...this.props} />
  }
}

export default IdPage
