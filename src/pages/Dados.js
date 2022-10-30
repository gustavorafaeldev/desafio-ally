import imagem from '../assets/journey-g5441a6277_1280.jpg';


const Dados = ({object, sub}) => {

    return(
        <div className="card">
            <img src={imagem} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Nome: {object.nome}</h5>
                <p>CPF: {object.cpf}</p>
                <p>Email: {object.email}</p>
                <p>Telefone: {object.telefone}</p>
                <h5>Países Destino</h5>
                <ul className="list-group">
                    {
                        object.paises.map((e, indice) => (<li className="list-group-item" key={indice}>{e.name}</li>))
                    }
                </ul>
                <hr></hr>
                <h5>Cidades Destino</h5>
                <ul className="list-group">
                    {
                        object.cidades.map((e, indice) => (<li className="list-group-item" key={indice}>{e.name_ptbr}</li>))
                    }
                </ul>
                <button onClick={() => sub()} className="btn btn-primary mt-3">Voltar</button>
             </div>
        </div>
    );
}

export default Dados;