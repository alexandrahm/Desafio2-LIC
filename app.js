var app = angular.module('Tienda', []);

app.controller('TiendaController', ['$scope', '$http', function($scope, $http) {
    // INICIA EL CARRITO Y CATEGORIA SELECCIONADA
    $scope.carrito = [];
    $scope.categoriaSeleccionada = '';
    $scope.filtroNombre = '';
    $scope.productoSeleccionado = null;

    // CARGAMOS PRODUCTOS DESDE JSON
    $http.get('productos.json').then(function(response) {
        $scope.productos = response.data;
        $scope.productosFiltrados = response.data;
    });

    // FUNCION PARA CORTAR EL TEXTO
    $scope.truncateText = function(text, maxWords) {
        if (!text) {
            return '';
        }

        var words = text.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }

        return text;
    };

    // FILTRAR POR CATEGORIA Y NOMBRE
    $scope.filtrarProductos = function() {
        $scope.productosFiltrados = $scope.productos.filter(function(producto) {
            // CATEGORIA
            var porCategoria = !$scope.categoriaSeleccionada || producto.category === $scope.categoriaSeleccionada;

            // NOMBRE
            var porNombre = !$scope.filtroNombre || producto.title.toLowerCase().includes($scope.filtroNombre.toLowerCase());

            return porCategoria && porNombre;
        });
    };

    // DETALLES DEL PRODUCTO
    $scope.mostrarDetalles = function(producto) {
        $scope.productoSeleccionado = producto;
        $('#detallesModal').modal('show');  
    };

    // AGREGA PRODUCTO AL CARRITO
    $scope.agregarAlCarrito = function(producto) {
        $scope.carrito.push(producto);
    };

    // CALCULA EL TOTAL DINERO CARRITO
    $scope.calcularTotal = function() {
        var total = 0;
        for (var i = 0; i < $scope.carrito.length; i++) {
            total += $scope.carrito[i].price;
        }
        return total;
    };

    $scope.mostrarCarrito = function() {
        $('#carritoModal').modal('show');  
    };

    // SIMULA EL PAGO Y LIMPIA CARRITO
    $scope.pagar = function() {
        alert('Pago exitoso!');
        $scope.carrito = [];
    };
}]);
