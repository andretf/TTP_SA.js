var times = ['ATL', 'NYM', 'PHI', 'MON', 'FLA', 'PIT', 'CIN', 'CHI', 'STL', 'MIL', 'HOU', 'COL', 'SF', 'SD', 'LA', 'ARI'];
var dataset = [
    [0, 745, 665, 929, 605, 521, 370, 587, 467, 670, 700, 1210, 2130, 1890, 1930, 1592],
    [745, 0, 80, 337, 1090, 315, 567, 712, 871, 741, 1420, 1630, 2560, 2430, 2440, 2144],
    [665, 80, 0, 380, 1020, 257, 501, 664, 808, 697, 1340, 1570, 2520, 2370, 2390, 2082],
    [929, 337, 380, 0, 1380, 408, 622, 646, 878, 732, 1520, 1530, 2430, 2360, 2360, 2194],
    [605, 1090, 1020, 1380, 0, 1010, 957, 1190, 1060, 1270, 966, 1720, 2590, 2270, 2330, 1982],
    [521, 315, 257, 408, 1010, 0, 253, 410, 557, 451, 1140, 1320, 2260, 2110, 2130, 1829],
    [370, 567, 501, 622, 957, 253, 0, 250, 311, 325, 897, 1090, 2040, 1870, 1890, 1580],
    [587, 712, 664, 646, 1190, 410, 250, 0, 260, 86, 939, 916, 1850, 1730, 1740, 1453],
    [467, 871, 808, 878, 1060, 557, 311, 260, 0, 328, 679, 794, 1740, 1560, 1590, 1272],
    [670, 741, 697, 732, 1270, 451, 325, 86, 328, 0, 1005, 905, 1846, 1731, 1784, 1458],
    [700, 1420, 1340, 1520, 966, 1140, 897, 939, 679, 1005, 0, 878, 1640, 1300, 1370, 1016],
    [1210, 1630, 1570, 1530, 1720, 1320, 1090, 916, 794, 905, 878, 0, 947, 832, 830, 586],
    [2130, 2560, 2520, 2430, 2590, 2260, 2040, 1850, 1740, 1846, 1640, 947, 0, 458, 347, 654],
    [1890, 2430, 2370, 2360, 2270, 2110, 1870, 1730, 1560, 1731, 1300, 832, 458, 0, 112, 299],
    [1930, 2440, 2390, 2360, 2330, 2130, 1890, 1740, 1590, 1784, 1370, 830, 347, 112, 0, 358],
    [1592, 2144, 2082, 2194, 1982, 1829, 1580, 1453, 1272, 1458, 1016, 586, 654, 299, 358, 0]
];

$(document).ready(function() {
    // Adiciona qtd times
    var options = '';
    times.forEach(function(val, i) {
        options += '<option value="' + (i + 1) + '">' + (i + 1) + '</option>';
    });
    $('#QtdTimes').html(options);


    // 
    $('#run').click(function() {
        try {
            var solucaoInicial = TTP.GeraSolucaoInicial();
            var temperatura = InputValueToNumber('Temperatura', 1, 10000, 1);
            var alfa = InputValueToNumber('Alfa', 0, 1, 0.001);
            var maxIteracoes = InputValueToNumber('MaxIteracoes', 0, 99999, 1);
            var maxPerturb = InputValueToNumber('MaxPerturb', 0, 999, 1);
            var maxSucessos = InputValueToNumber('MaxSucessos', 0, 999, 1);
        } catch (ex) {
    		alert(ex);
        }

        var opt = SA.Exec(solucaoInicial, temperatura, alfa, maxIteracoes, maxPerturb, maxSucessos);
        $('#result-optimal').html('Novo valor ótimo: ' + Math.floor(TTP.FuncaoObj(opt) * 1000) / 1000 + ' (Solução: ' + Math.floor(opt * 1000) / 1000 + ')');
    });

});

function InputValueToNumber(idInput, min, max, precisao) {
    valor = $.trim($('#' + idInput).val());
    if (!parseFloat(valor) || !isFinite(valor)) {
        throw "Todos os campos são obrigatórios e devem ser numéricos.";
    }

    valor = Math.floor(valor * (1 / precisao)) * precisao;
    $('#' + idInput).val(valor);

    if (valor < min || valor > max) {
        throw 'O campo "' + $('#' + idInput).closest('label').replace + '" deve estar entre ' + min + ' e ' + max + ', inclusive';
    }

    return valor;
}