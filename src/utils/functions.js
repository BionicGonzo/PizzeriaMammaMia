// Función para darle formato al precio (poner punto para definir miles, millones, o coma para decimales). Se llama en el componente Card.vue

const formatNumber  = (price) => {
    return price.toLocaleString("de-DE");
};

export default {formatNumber};