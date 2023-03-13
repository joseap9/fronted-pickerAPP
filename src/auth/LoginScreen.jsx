import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { useAuthStore } from '../hooks/useAuthStore'
import { useForm } from '../hooks/useForm'

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const LoginScreen = () => {

    const [loading, setLoading] = useState(false);

    const { startLogin, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields );

    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
        setLoading(true);
        
    }

    useEffect(() => {
        if ( errorMessage !== undefined ) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage])
    

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Card style={{ width: "50rem" }}>
                <Card.Body>
                <Card.Title>Iniciar sesión</Card.Title>
                <Form onSubmit={ loginSubmit }>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control 
                        name="loginEmail" value={ loginEmail } 
                        onChange={ onLoginInputChange } 
                        type="text" 
                        className="form-control"
                        placeholder="Ingrese Email"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        name="loginPassword" 
                        value={ loginPassword } 
                        onChange={ onLoginInputChange }
                        type="password" 
                        className="form-control" 
                        placeholder="Password" />
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={ loginSubmit} 
                        disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Iniciar sesión'}
                    </Button>
                </Form>
                </Card.Body>
            </Card>
      </div>
    )
}

export default LoginScreen