import React, { Component } from 'react';

import api from '../../services/api';

// import { Container } from './styles';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoNome = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoNome}`),
      api.get(`/repos/${repoNome}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      issues: issues.data,
      repository: repository.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;
    return (
      <>
        <ul>
          {issues.map(issue => (
            <li key={issue.title}>
              <small>{issue.title}</small>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
