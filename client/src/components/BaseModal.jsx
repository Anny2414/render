import React from 'react'

export function BaseModal() {
  return (
    <div className='modal modal-new'>
        <form className='form-new'>
            <div className='modal-background'></div>
            <div className='modal-card'>
                <header className='modal-card-head'>
                    <p className='modal-card-title'>Nuevo Usuario</p>
                    <button className='delete' aria-label='close' name='new' type='button'>

                    </button>
                </header>
                <section className='modal-card-body'>
                    <div className='container'>
                        <div className='columns is-centered'>
                            <div className='column is-half'>
                                <div className='field is-vertical'>
                                    <div className='field-label'>
                                        <label className='label has-text-centered'>Usuario:</label>
                                    </div>
                                    <div className='field-body'>
                                        <div className='field'>
                                            <p className='control has-icons-left'>
                                                <input className='input' type='text' name='usuario' />
                                                <span className='icon is-small is-left'>
                                                    <i className='fas fa-user'></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='field is-vertical'>
                                    <div className='field-label'>
                                        <label className='label has-text-centered'>Email:</label>
                                    </div>
                                    <div className='field-body'>
                                        <div className='field'>
                                            <p className='control has-icons-left'>
                                                <input className='input' type='email' name='email' />
                                                <span className='icon is-small is-left'>
                                                    <i className='fas fa-envelope'></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='field is-vertical'>
                                    <div className='field-label'>
                                        <label className='label has-text-centered'>Contraseña:</label>
                                    </div>
                                    <div className='field-body'>
                                        <div className='field'>
                                            <p className='control has-icons-left'>
                                                <input className='input' type='password' value='your' disabled />
                                                <span className='icon is-small is-left'>
                                                    <i className='fas fa-key'></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='field is-vertical'>
                                    <div className=' field-label'>
                                        <label className='label has-text-centered'>Rol:</label>
                                    </div>
                                    <div className='field-body'>
                                        <div className='select' style={{ minWidth: "100%" }}>
                                            <select style={{ minWidth: "100%" }}>
                                                <option>Administrador (0)</option>
                                                <option>Usuario (1)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className='modal-card-foot'>
                    <button className='button cancel is-primary' name='new' type='button'>Cancelar</button>
                    <button className='button is-success' type='submit'>Confirmar</button>
                </footer>
                <div className='notifications'></div>
            </div>
        </form>
    </div>
  )
}