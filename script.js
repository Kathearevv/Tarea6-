// ==========================================
// TAREA 6: GESTIÓN Y ANÁLISIS DE GASTOS
// ==========================================

// Datos de entrada originales: Array de gastos (Hogar, Tecnología, Mascotas, Salud)
const gastos = [
  { descripcion: 'Visita de emergencia al veterinario', monto: 135.00, categoria: 'mascotas' },
  { descripcion: 'Mantenimiento preventivo de aire acondicionado', monto: 90.50, categoria: 'hogar' },
  { descripcion: 'Compra de medicamentos recetados', monto: 38.20, categoria: 'salud' },
  { descripcion: 'Renovación de licencia de software antivirus', monto: 29.99, categoria: 'tecnologia' },
  { descripcion: 'Reparación de tubería de cocina', monto: 75.00, categoria: 'hogar' },
  { descripcion: 'Adquisición de monitor ergonómico para oficina', monto: 180.00, categoria: 'tecnologia' }
];

// Función flecha auxiliar para verificar si un valor es un número válido
const esNumeroValido = (valor) => typeof valor === 'number' && !isNaN(valor);

// ==========================================
// FUNCIONES REQUERIDAS
// ==========================================

function calcularTotal(listaGastos) {
  let total = 0;
  for (let i = 0; i < listaGastos.length; i++) {
    const gasto = listaGastos[i];
    if (!esNumeroValido(gasto.monto)) {
      throw new Error(`El gasto "${gasto.descripcion}" contiene un monto no numérico.`);
    }
    total += gasto.monto;
  }
  return total;
}

function calcularPromedio(listaGastos) {
  if (!listaGastos || listaGastos.length === 0) {
    throw new Error('El array de gastos está vacío, no se puede calcular el promedio.');
  }
  const total = calcularTotal(listaGastos);
  return total / listaGastos.length;
}

function filtrarPorCategoria(listaGastos, categoriaBuscada) {
  const resultado = [];
  for (let i = 0; i < listaGastos.length; i++) {
    if (listaGastos[i].categoria.toLowerCase() === categoriaBuscada.toLowerCase()) {
      resultado[resultado.length] = listaGastos[i];
    }
  }
  return resultado;
}

function obtenerMayorGasto(listaGastos) {
  if (!listaGastos || listaGastos.length === 0) {
    return null;
  }
  let mayor = listaGastos[0];
  for (let i = 1; i < listaGastos.length; i++) {
    if (listaGastos[i].monto > mayor.monto) {
      mayor = listaGastos[i];
    }
  }
  return mayor;
}

function clasificarGasto(monto) {
  if (monto >= 100) {
    return 'Alto';
  } else if (monto >= 50 && monto < 100) {
    return 'Medio';
  } else {
    return 'Bajo';
  }
}

function describirCategoria(categoria) {
  switch (categoria.toLowerCase()) {
    case 'hogar':
      return 'Gastos orientados a reparaciones y mejoras en la vivienda.';
    case 'tecnologia':
      return 'Inversión en dispositivos, software y herramientas digitales.';
    case 'mascotas':
      return 'Gastos dedicados al cuidado, salud y bienestar animal.';
    case 'salud':
      return 'Gastos asociados a consultas médicas, farmacia y bienestar personal.';
    default:
      return 'Categoría general no especificada.';
  }
}

function crearContadorDeAltos() {
  let contadorAltos = 0;
  return function() {
    contadorAltos++;
    return contadorAltos;
  };
}

// ==========================================
// FLUJO PRINCIPAL Y SALIDA EN CONSOLA
// ==========================================
try {
  console.log('=== INICIO DEL SISTEMA DE GESTIÓN DE GASTOS ===\n');

  const gastosClasificados = [];
  const incrementarContadorAlto = crearContadorDeAltos();
  let totalAltosRegistrados = 0;

  for (let i = 0; i < gastos.length; i++) {
    const item = gastos[i];
    const nivelClasificacion = clasificarGasto(item.monto);
    const descripcionCat = describirCategoria(item.categoria);

    gastosClasificados[gastosClasificados.length] = {
      descripcion: item.descripcion,
      monto: item.monto,
      categoria: item.categoria,
      nivel: nivelClasificacion,
      descripcionCategoria: descripcionCat
    };

    if (nivelClasificacion === 'Alto') {
      totalAltosRegistrados = incrementarContadorAlto();
    }
  }

  console.log('--- TABLA DETALLADA DE GASTOS CLASIFICADOS ---');
  console.table(gastosClasificados);

  const totalGastos = calcularTotal(gastos);
  const promedioGastos = calcularPromedio(gastos);
  console.log('--- RESUMEN FINANCIERO GENERAL ---');
  console.log(`Monto total gastado: $${totalGastos.toFixed(2)}`);
  console.log(`Gasto promedio por ítem: $${promedioGastos.toFixed(2)}\n`);

  const mayorGasto = obtenerMayorGasto(gastos);
  console.log('--- GASTO MÁS ALTO REGISTRADO ---');
  console.log(`Descripción: ${mayorGasto.descripcion}`);
  console.log(`Monto: $${mayorGasto.monto.toFixed(2)}`);
  console.log(`Categoría: ${mayorGasto.categoria}\n`);

  console.log('--- CONTEO DE GASTOS ALTOS ---');
  console.log(`Cantidad de gastos con nivel 'Alto': ${totalAltosRegistrados}\n`);

  const categoriaElegida = 'hogar';
  const gastosFiltrados = filtrarPorCategoria(gastos, categoriaElegida);
  console.log(`--- FILTRADO POR CATEGORÍA: "${categoriaElegida.toUpperCase()}" ---`);
  console.log(gastosFiltrados);
  console.log('');

  const resumenPorCategoria = {};
  for (let i = 0; i < gastos.length; i++) {
    const cat = gastos[i].categoria;
    const montoGasto = gastos[i].monto;
    if (resumenPorCategoria[cat] === undefined) {
      resumenPorCategoria[cat] = 0;
    }
    resumenPorCategoria[cat] += montoGasto;
  }

  const informe = {
    total: Number(totalGastos.toFixed(2)),
    promedio: Number(promedioGastos.toFixed(2)),
    cantidadAltos: totalAltosRegistrados,
    mayorGasto: {
      descripcion: mayorGasto.descripcion,
      monto: mayorGasto.monto,
      categoria: mayorGasto.categoria
    },
    resumenPorCategoria: resumenPorCategoria
  };

  console.log('--- INFORME FINAL (JSON) ---');
  console.log(JSON.stringify(informe, null, 2));

  console.log('\n=== FIN DEL PROGRAMA PRINCIPAL ===');

} catch (error) {
  console.error('Error detectado en el flujo principal:', error.message);
}

// ==========================================
// MANEJO DE ERRORES: PRUEBA CONTROLADA
// ==========================================
console.log('\n=== PRUEBA CONTROLADA DE MANEJO DE ERRORES ===');
try {
  console.log('Intentando calcular el promedio de un array vacío...');
  calcularPromedio([]);
} catch (errorControlado) {
  console.error('Mensaje del error capturado exitosamente:', errorControlado.message);
}