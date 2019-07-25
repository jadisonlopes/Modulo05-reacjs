import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

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

    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        {/* <ul>
          {issues.map(issue => (
            <li key={issue.title}>
              <small>{issue.title}</small>
            </li>
          ))}
        </ul> */}
      </Container>
    );
  }
}
