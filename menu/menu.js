const inquirer = require('inquirer');
require('colors');

const menu = async () => {
    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: 'Que desea hacer?',
            choices: [
                {
                    value: 1,
                    name: `${'1.'.magenta} Buscar ciudad`,
                },
                {
                    value: 2,
                    name: `${'2.'.magenta} Historial`,
                },
                {
                    value: 0,
                    name: `${'0.'.magenta} Salir`,
                }
            ]
        }
    ]
    console.clear();
    console.log('========================='.green);
    console.log('Seleccione una opcion'.white);
    console.log('========================='.green);

    const { opcion } = await inquirer.prompt(preguntas)

    return opcion;
}
const pausa = async () => {
    const tecla = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presiones ${'ENTER'.magenta} para continuar`
        }
    ]
    console.log('\n')
    await inquirer.prompt(tecla)
}


const input = async (message) => {
    const pregunta = [
        {
            type: 'input',
            name: 'solicitud',
            message,
            validate( value ) {
                if( value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const { solicitud } = await inquirer.prompt( pregunta );
    return solicitud
}

const listarLugares = async (lugares = []) => {
    const opciones = lugares.map( (lugar, i) => {
        const idx = `${i+1}`.magenta;
        return {
            value: lugar.id,
            name: `${ idx } ${ lugar.nombre }`
        }
    })
    opciones.unshift({
        value: 0,
        name: '0.'.magenta + ' Cancelar'
    })
    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Seleccione un lugar:',
        choices: opciones
    }]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

module.exports = {
    menu,
    input,
    pausa,
    listarLugares
}