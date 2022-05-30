const { menu, input, pausa, listarLugares } = require('./menu/menu');
const Buscar = require('./models/buscar');

const main = async () => {

    const buscar = new Buscar();
    let opcion = Number;
    do {

        opcion = await menu();
        // console.log({opcion});
        switch (opcion) {
            case 1:
                const busqueda = await input('Ciudad:', );
                // console.log(busqueda);
                const lugares = await buscar.solicitudCiudad(busqueda);
                
                const id = await listarLugares( lugares )
                if (id === 0) continue;
                const lugarSeleccionado = lugares.find( lugar => lugar.id === id)
                const clima = await buscar.solicitudClima( lugarSeleccionado.lat, lugarSeleccionado.lng )
                
                console.clear();
                console.log('\nInformacion de la ciudad\n'.magenta);
                console.log('Ciudad:', lugarSeleccionado.nombre.magenta);
                console.log('Lat:', lugarSeleccionado.lat);
                console.log('Lng:', lugarSeleccionado.lng);
                console.log('Temperatura Actual:', clima.temp);
                console.log('Temperatura Minima:', clima.min);
                console.log('Temperatura Maxima:', clima.max);
                console.log('El clima se encuentra', clima.descripcion);


                break
            case 2:
                return
        }
        if (opcion !== 0 ) await pausa();
    } while (opcion !== 0);
}

main();