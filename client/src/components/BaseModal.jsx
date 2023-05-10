import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function BaseModal(props) {
  const { fields, data } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const url = useLocation();
  let buttonsText = 'None';

  if (url.pathname === '/users') {
    buttonsText = 'usuario';
  } else if (url.pathname === '/roles') {
    buttonsText = 'rol';
  }

  return (
    <div className={`modal modal-new ${isModalOpen ? "is-active" : ""}`}>
      <form className='form-new'>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Nuevo {buttonsText}</p>
            <button
              className='delete'
              aria-label='close'
              name='new'
              type='button'
            ></button>
          </header>
          <section className='modal-card-body'>
            <div className='container'>
              <div className="columns is-centered">
                <div className="column is-full">
                  <div className="columns is-multiline">
                    {fields.map((field, index) => (
                      <div className={`column is-${field.col}`} key={`field-${index}`}>
                        <div className='field is-vertical'>
                          <div className='field-label'>
                            <label className='label has-text-centered'>
                              {field.title}:
                            </label>
                          </div>
                          <div className='field-body'>
                            <div className='field'>
                              <p className='control has-icons-left'>
                                {
                                  field.type == 'select' ? (
                                    <div className="select" style={{ minWidth: '100%' }}>
                                      <select style={{ minWidth: '100%' }}>
                                        {data.map((d) => (
                                          <option value={d.id} key={d.id}>{d.name} ({d.id})</option>
                                        ))}
                                      </select>
                                    </div>
                                  ) : (
                                    <input className='input' type={field.type} disabled={field.disabled} />
                                  )
                                }
                                <span className='icon is-small is-left'>
                                  <i className={`fas fa-${field.icon}`}></i>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </section>
          <footer className='modal-card-foot'>
            <button
              className='button cancel is-primary'
              name='new'
              type='button'
            >
              Cancelar
            </button>
            <button className='button is-success' type='submit'>
              Confirmar
            </button>
          </footer>
          <div className='notifications'></div>
        </div>
      </form>
    </div>
  );
}
