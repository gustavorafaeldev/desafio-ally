import { Form, Formik } from 'formik';
import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

import { TextField } from '../components/TextField';


const validationSchema = yup.object().shape({
    email: yup
    .string()
    .email('Informe um email válido')
    .required('Email obrigatório'),

    nome: yup
    .string()
    .min(3, 'Você deve digitar no mínimo 3 caracteres')
    .max(50, 'Você deve digitar no máximo 50 caracteres')
    .required('Nome obrigatório'),

    telefone: yup
    .string()
    .required('Telefone obrigatório'),

    cpf: yup
    .string()
    .required('CPF obrigatório'),

    pais: yup
    .array().min(1, 'Selecione um país')

})

function Formulario({cities, countries, sub, guardarDados}) {

    const [cidadeSelecionadas, setCidadeSelecionada] = useState([]);
    const [paisesSelecionados, setPaisesSelecionados] = useState([]);
    const [cidadesFiltradas, setCidadesFiltradas] = useState([]);

    const cit = []
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');


    useEffect(() => {
        verificarCampos()
    })

    let objectForm = {
        nome:nome,
        email:email,
        telefone:telefone,
        cpf:cpf,
        paises: [],
        cidades:[]
    }
 
    const filtrarCidades = (pais) => {             
        pais.map((pais) => {
            cities.filter((cidade) => pais.code === cidade.country_code && cidade.name_ptbr != null).map((city) => cit.push(city))
        })
    }


    const verificarCampos = () => {
        if (objectForm.nome === "" ||
            objectForm.email === "" ||
            objectForm.telefone === "" ||
            objectForm.cpf === "" ||
            paisesSelecionados.length === 0 ||
            cidadeSelecionadas.length === 0
            ) {
                document.getElementById('botao').disabled=true
            } else {
                document.getElementById('botao').disabled=false
            }
    }

    const handleSubmit = () => {
        objectForm.paises = paisesSelecionados
        objectForm.cidades = cidadeSelecionadas
        sub();
        guardarDados(objectForm)
    }

    return(
        <Formik 
        initialValues={{
            nome:'',
            email:'',
            telefone:'',
            cpf:''
        }}

        validationSchema={validationSchema}
        >
            
        {formik => (

            <div>
                <h1 className='my-4 font-weight-bold-display-4'>Informe seus dados</h1>
            
                <Form>
                    <TextField label='Nome' 
                    name='nome' type='text' 
                    placeholder='Informe seu nome' 
                    onSelect={(e) => {
                        setNome(e.target.value)
                    }}/>

                    <TextField label='Email' 
                    name='email' type='string' 
                    placeholder='Informe seu email' 
                    onSelect={(e) => {
                        setEmail(e.target.value)
                    }}/>

                    <TextField label='Telefone' 
                    name='telefone' type='string' 
                    placeholder='Informe seu telefone' 
                    onSelect={(e) => {
                        setTelefone(e.target.value)
                    }}/>

                    <TextField label='CPF' 
                    name='cpf' type='string' 
                    placeholder='Informe seu cpf' 
                    onSelect={(e) => {
                        setCpf(e.target.value)
                    }}
                    />

                    <h1 className='my-4 font-weight-bold-display-4'>Selecione seus destinos</h1>
                    <label htmlFor='pais'>País</label>
                    <Multiselect id='pais'
                        name='pais' 
                        options={countries} 
                        displayValue="name_ptbr" 
                        placeholder='Países'
                        
                        onSelect={(pais) => {
                            setPaisesSelecionados(pais)
                            filtrarCidades(pais)
                            setCidadesFiltradas(cit)
                        }}
                        
                        onRemove={(pais) => {
                            filtrarCidades(pais)
                            setCidadesFiltradas(cit)
                        }}
                    />

                    <label htmlFor='cidade'>Cidade</label>
                    <Multiselect id='cidade'
                        name='cidade'
                        options={cidadesFiltradas} displayValue="name_ptbr"
                        emptyRecordMsg='Lista vazia...'
                        placeholder='Cidades'
                        
                        onSelect={(cidade) => {
                            setCidadeSelecionada(cidade)
                            verificarCampos()
                        }}

                        onRemove={(cidade) => {
                            setCidadeSelecionada(cidade)
                            verificarCampos()
                        }}
                    />   
                </Form>        
                <button id='botao' onClick={handleSubmit} className='btn btn-success mt-4' >Enviar</button>
            </div> 
        )}
        </Formik>
    );
}

export default Formulario;