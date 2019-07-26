import React, { Component } from 'react';
import lowerCase from 'lower-case';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, List, Input } from './styles';

export default class Main extends Component {
  state = {
    newRepository: '',
    repositories: [],
    loading: false,
    erro: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (repositories !== prevState.repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = env => {
    this.setState({ newRepository: env.target.value });
  };

  handleSubmit = async env => {
    env.preventDefault();

    this.setState({ loading: true, erro: false });

    const { newRepository, repositories } = this.state;

    try {
      if (newRepository === '') throw new Error('Favor informar o repositório');

      if (
        repositories.find(
          rep => lowerCase(rep.name) === lowerCase(newRepository)
        )
      )
        throw new Error('Repositório duplicado');

      const response = await api.get(`/repos/${newRepository}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepository: '',
        loading: false,
      });
    } catch (error) {
      this.setState({ erro: true });
      alert(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepository, loading, repositories, erro } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositorios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepository}
            onChange={this.handleInputChange}
            erro={erro}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <small>{repository.name}</small>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhe
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
