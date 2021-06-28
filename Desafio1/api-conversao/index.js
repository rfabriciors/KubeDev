const express = require('express');
const os = require('os')
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

app.get('/fahrenheit/:valor/celsius', (req, res) => {

    let valor = req.params.valor;
    let celsius = (valor - 32) * 5 / 9;
    res.json({ "celsius": celsius, "maquina": os.hostname() });
});

app.get('/celsius/:valor/fahrenheit', (req, res) => {

    let valor = req.params.valor;
    let fahrenheit = (valor * 9 / 5) + 32;
    res.json({ "fahrenheit": fahrenheit, "maquina": os.hostname() });
});

app.get('/celsius/:valor/kelvin', (req, res) => {

    let valor = req.params.valor;
    let kelvin = Number(valor) + 273;
    res.json({ "Kelvin": kelvin, "maquina": os.hostname() });
});

app.get('/kelvin/:valor/celsius', (req, res) => {

    let valor = req.params.valor;
    let celsius = valor - 273;
    res.json({ "celsius": celsius, "maquina": os.hostname() });
});

app.get('/temperatura/fahrenheitparacelsius/:valor', (req, res) => {

    let valor = req.params.valor;
    let celsius = (valor - 32) * 5 / 9;
    res.json({ "celsius": celsius });
});


app.get('/temperatura/celsiusparafahrenheit/:valor', (req, res) => {

    let valor = req.params.valor;
    let fahrenheit = (valor * 9 / 5) + 32;
    res.json({ "fahrenheit": fahrenheit });
});

app.get('/temperatura/kelvinparacelsius/:valor', (req, res) => {

    let valor = req.params.valor;
    let celsius = valor - 273;
    res.json({ "celsius": celsius });
});

app.get('/temperatura/celsiusparakelvin/:valor', (req, res) => {

    let valor = req.params.valor;
    let kelvin = Number(valor) + 273;
    res.json({ "kelvin": kelvin });
});

app.get('/kelvin/:valor/fahrenheit', (req, res) => {

    let valor = req.params.valor;
    let fahrenheit = ((Number(valor) - 273) * 9 / 5) + 32;
    res.json({ "fahrenheit": fahrenheit, "maquina": os.hostname() });
});

app.get('/temperatura/kelvinparafahrenheit/:valor', (req, res) => {

    let valor = req.params.valor;
    let fahrenheit = ((Number(valor) - 273) * 9 / 5) + 32;
    res.json({ "fahrenheit": fahrenheit });
});

app.get('/fahrenheit/:valor/kelvin', (req, res) => {

    let valor = req.params.valor;
    let kelvin = ((valor - 32) * 5 / 9) + 273;
    res.json({ "kelvin": kelvin, "maquina": os.hostname() });
});

app.get('/temperatura/fahrenheitparakelvin/:valor', (req, res) => {

    let valor = req.params.valor;
    let kelvin = ((valor - 32) * 5 / 9) + 273;
    res.json({ "kelvin": kelvin });
});

app.listen(8060, () => {
    console.log("Servidor rodando na porta 8060");
});
