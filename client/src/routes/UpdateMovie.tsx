import React, { useEffect, useState } from 'react';
import {
  Col,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  Spinner,
} from 'reactstrap';
import { useMutation } from '@apollo/react-components';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UPDATE_MOVIE from '../graphql/mutation/updateMovie';
import { useQuery } from '@apollo/react-hooks';
import GET_MOVIE from '../graphql/query/movie';

interface ParamTypes {
  id: string;
}

const UpdateMovie = () => {
  const [updateMovie] = useMutation(UPDATE_MOVIE);
  const [form, setForm] = useState({
    name: '',
    description: '',
  });
  const history = useHistory();
  const { id } = useParams<ParamTypes>();
  const { loading, data, error } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  useEffect(() => {
    if (!loading && data) {
      const { name, description } = data.movie;
      setForm({ name, description });
    }
  }, [loading, data]);

  const handleChange = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (updateMovie: any, event: any) => {
    try {
      event.preventDefault();
      await updateMovie({
        variables: {
          movieId: id,
          movieInput: { ...form },
        },
      });
      toast.success(`Le film ${form.name} a bien été modifié`);
      history.push('/');
    } catch (error) {
      toast.error('Check your connection');
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Modification du film {data.name}</h1>
          <Col>
            <Form onSubmit={(event) => handleSubmit(updateMovie, event)}>
              <FormGroup>
                <Label for="name">
                  Nom du film <sup>*</sup>
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name || ''}
                  onChange={handleChange}
                  placeholder="Nom du film"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="name">Description du film</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  value={form.description || ''}
                  onChange={handleChange}
                  placeholder="Description du film"
                />
              </FormGroup>
              <FormGroup>
                <Button type="submit">Valider</Button>
              </FormGroup>
            </Form>
          </Col>
        </>
      )}
    </>
  );
};

export default UpdateMovie;
