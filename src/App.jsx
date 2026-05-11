import './App.css'
import axios from 'axios';
import { useState, useEffect } from 'react'

function App() {

  const url = 'http://localhost:3000/produto';
  
  const [id, setId] = useState('');
  const [produto, setProduto] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [foto, setFoto] = useState('');
  
  const [classInserir, setClassInserir] = useState('');
  const [classAlterar, setClassAlterar] = useState('sumir');
  const [data, setData] = useState([]);
  
  /** Carregar dados do banco */
  useEffect( () => {
    axios.get(url)
      .then( (res) => setData(res.data))
  }, [data, setData]);

  /** Inserir dados no banco */
  const Inserir = () => {
    axios.post(url, {
      produto, valor, quantidade, foto
    })
  }

  /** Cadastrando dados no banco */
  const Cadastrar = (e) => {
    e.preventDefault();

    if( produto === "") {
      alert('Por favor preencha o campo nome do produto');
    }else if( valor === "" ) {
      alert('Por favor preencha o campo valor do produto');
    }else if( quantidade === "" ) {
      alert('Por favor preencha o campo quantidade do produto');
    }else if( foto === "" ) {
      alert('Por favor preencha o campo foto do produto');
    }else{
      alert('Produto cadastrado com sucesso!');
      Inserir();
      setProduto('');
      setValor('');
      setQuantidade('');
      setFoto('');
    }
  }

    /** Removendo um registro*/
  const Remover = (id, produto) => {
const confirmacao = window.confirm( "Deseja remover:  " +" ( "+ produto +"?) ")
  if(!confirmacao) return;

 axios.delete(`${url}/${id}`);

  setData((prevData) => prevData.filter((item) => item.id !== id));
alert("Produto removido com sucesso!");

  }
  /** Carregando os valores nos campos*/

 const CarregarCampos = (id, produto, valor, quantidade, foto) => {
    setId(id);
    setProduto(produto);
    setValor(valor);
    setQuantidade(quantidade)
    setFoto(foto);
  
    setClassInserir('sumir')
    setClassAlterar('')
  }

  /** Atualizar */
  const Atualizar = (id, produto,quantidade, valor, foto) => {
    const confirm = window.confirm("Deseja atualizar ?" + produto)

    if(!confirm) return

    axios.put(`${url}/${id}` , {
      id,produto,valor,quantidade, foto
    })

    alert("Atualizado com sucesso!")
  }



  return (
    <div className='container'>
      <h1 className='mt-5 text-center'>Cadastro de Produtos</h1>

      <form className='mt-5 mb-5'>
      
        <div className="row mb-3">
          <div className="col">
              <input 
                type="text"
                value={produto}
                onChange={ (e) => setProduto(e.target.value) }
                placeholder='Nome do Produto'
                className='form-control'  
            />
          </div>
          <div className="col">
              <input 
                type="text"
                value={valor}
                onChange={ (e) => setValor(e.target.value) }
                placeholder='Valor'
                className='form-control'  
            />
          </div>
          <div className="col">
              <input 
                type="text"
                value={quantidade}
                onChange={ (e) => setQuantidade(e.target.value) }
                placeholder='Qtd'
                className='form-control'  
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
              <input 
                type="text"
                value={foto}
                className='form-control'  
                placeholder='Url da imagem'
                onChange={ (e) => setFoto(e.target.value) }
            />
          </div>
        </div>
          <button className={`btn btn-outline-success 
            ${classInserir}`} onClick={Cadastrar}
            >Inserir</button>
          <button className={`btn btn-outline-warning 
            ${classAlterar}`} onClick={ () => Atualizar(id,produto,quantidade,valor,foto)}
            >Atualizar
            </button>
        </form>

      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Nome do Produto</th>
            <th scope='col'>Valor</th>
            <th scope='col'>Qtd</th>
            <th scope='col'>Imagem</th>
            <th scope='col' className='text-center'>Ações</th>
          </tr>
        </thead>
        <tbody>
          
          { data.map(( item ) => (
            <tr key={item.id}>
            <th scope='row'>{item.id}</th>
            <td>{item.produto}</td>
            <td>{item.valor}</td>
            <td>{item.quantidade}</td>
            <td>
              <img width={17}  src={item.foto} alt="Produto X" /></td>
            <td>
              <button className='btn btn-outline-warning me-2' 
              onClick={() => CarregarCampos(item.id,item.produto,item.valor,item.quantidade,item.foto) }>
                  <i className='fa-solid fa-pen-to-square'></i>
              </button>
              <button className='btn btn-outline-danger' onClick={ () => Remover(item.id, item.produto) }>
                  <i className='fa-solid fa-trash'></i>
              </button>
            </td>
          </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default App
