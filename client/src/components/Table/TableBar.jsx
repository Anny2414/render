import React from 'react'
import { useLocation } from 'react-router-dom'

export function TableBar(props) {
    // SEGUN LA URL DIRA EL TEXTO QUE SE MUESTRE EN EL BOTON Y SI SE DEBE MOSTRAR EL DE ADMINISTRAR O EL DE PDF
    const { showPdfButton, showAdminButton } = props;
    const url = useLocation()
    let buttonsText = "None"

    if (url.pathname === "/users") {
        buttonsText = 'usuario'
    } else if (url.pathname === "/roles") {
        buttonsText = 'rol'
    }

    // 
    return (
        <div className='columns is-centered'>
            <div className='column'>
                <button className='button is-success is-fullwidth'>Crear {buttonsText} +</button>
            </div>
            <div className='column is-9'>
                <div className='control has-icons-left'>
                    <input className='input' type='text' placeholder={'Buscar ' + buttonsText}></input>
                    <span className='icon is-small is-left'>
                        <i className='fa-solid fa-magnifying-glass'></i>
                    </span>
                </div>
            </div>
            {showAdminButton && (
                <div class="column is-narrow">
                    <a href="adminProductos.html" class="button is-primary is-fullwidth">Administrar Productos</a>
                </div>
            )}
            {showPdfButton && (
                <div className='column'>
                    <button className='button is-primary is-fullwidth' name='pdf'>Generar PDF</button>
                </div>
            )}
        </div>
    )
}