if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(() => {
        console.log('Service Worker registrado');
    })
    .catch(error => {
        console.log('Error:', error);
    });
}

document.getElementById('btn').addEventListener('click', () => {
    /*fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => res.json())
    .then(data => {
        document.getElementById('resultado').innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.body}</p>
        `;
    });*/

    fetch('/datos')
    .then(res => res.json())
    .then(data => {

        document.getElementById('resultado').innerHTML = `
            <h3>${data.nombre}</h3>
            <p>${data.carrera}</p>
        `;

    });
});

