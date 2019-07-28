import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssuesList, States, Button, Page } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repoNome: '',
    repository: {},
    issues: [],
    loading: true,
    estado: 'open',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { estado } = this.state;
    const repoNome = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoNome}`),
      api.get(`/repos/${repoNome}/issues`, {
        params: {
          state: estado,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      issues: issues.data,
      repository: repository.data,
      loading: false,
      page: 1,
      repoNome,
    });
  }

  issuesState = async state => {
    const { repoNome } = this.state;

    const issues = await api.get(`/repos/${repoNome}/issues`, {
      params: {
        state,
        per_page: 5,
      },
    });

    this.setState({
      issues: issues.data,
      page: 1,
      estado: state,
    });
  };

  issuesPage = async page => {
    const { repoNome, estado } = this.state;

    const issues = await api.get(`/repos/${repoNome}/issues`, {
      params: {
        state: estado,
        page,
        per_page: 5,
      },
    });

    this.setState({
      issues: issues.data,
      page,
    });
  };

  render() {
    const { repository, issues, loading, estado, page } = this.state;
    const states = [
      { legenda: 'ABERTOS', estado: 'open' },
      { legenda: 'FECHADOS', estado: 'closed' },
      { legenda: 'TODOS', estado: 'all' },
    ];
    const buttons = ['ANTERIOR', 'PROXIMA'];

    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <States>
          {states.map(state => (
            <Button
              type="button"
              onClick={() => this.issuesState(state.estado)}
              ativo={estado === state.estado}
            >
              {state.legenda}
            </Button>
          ))}
        </States>
        <IssuesList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>
        <Page>
          {buttons.map(b => (
            <Button
              type="button"
              onClick={() =>
                this.issuesPage(b === 'PROXIMA' ? page + 1 : page - 1)
              }
              visivel={b === 'ANTERIOR' && page === 1}
            >
              {b}
            </Button>
          ))}
        </Page>
      </Container>
    );
  }
}
