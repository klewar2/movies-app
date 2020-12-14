import React, { useState } from 'react';
import { Col, Form, Input, FormGroup, Label, Button } from 'reactstrap';
import { Mutation } from '@apollo/react-components';
import CREATE_MOVIE from '../graphql/mutation/createMovie';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddMovie = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
  });
  const history = useHistory();
  const handleChange = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (createMovie: any, event: any) => {
    try {
      event.preventDefault();
      await createMovie({
        variables: {
          movieInput: { ...form },
        },
      });
      toast.success(`Le film ${form.name} a bien été ajouté`);
      history.push('/');
    } catch (error) {
      toast.error('Check your connection');
    }
  };

  return (
    <>
      <h1>Ajout d'un nouveau film</h1>
      <Col>
        <Mutation mutation={CREATE_MOVIE}>
          {(createMovie: any) => (
            <Form onSubmit={(event) => handleSubmit(createMovie, event)}>
              <FormGroup>
                <Label for="name">
                  Nom du film <sup>*</sup>
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
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
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description du film"
                />
              </FormGroup>
              <FormGroup>
                <Button type="submit">Valider</Button>
              </FormGroup>
            </Form>
          )}
        </Mutation>
      </Col>
    </>
  );
};

export default AddMovie;
