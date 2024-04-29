const app = angular.module('imc-app', [])

function ImcCalculate(peso, altura) {
    const alturaMetros = altura / 100; 
    return peso / (alturaMetros * alturaMetros);
}

function imcFilter(imc) {
    if (imc < 18.5) {
        return 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 25) {
        return 'Peso normal';
    } else if (imc >= 25 && imc < 30) {
        return 'Sobrepeso';
    } else {
        return 'Obesidade';
    }
}

app.controller('imc-controller', ($scope, $http) => {
    $scope.userName = ''
    $scope.userPeso = ''
    $scope.userAltura = ''
    $scope.data = ''
    $scope.userList = [];

    $scope.addTask = () => {
        if(!$scope.userName) {
            return alert('DIGITE UM NOME!!')
        }
        $scope.imc = ImcCalculate($scope.userPeso, $scope.userAltura)
        $scope.classificacao = imcFilter($scope.imc)
        $scope.data = new Date()
        $http.post('http://localhost:3322/api/users', { nome: $scope.userName, peso: $scope.userPeso, altura: $scope.userAltura, imc: $scope.imc, data: $scope.data })
            .then(() => {
                $scope.loadTaskList()
            }, () => {
                alert('OPS ACONTECEU UM ERRO!')
            });
    }

    $scope.loadTaskList = async () => {
        const { data } = await $http.get('http://localhost:3322/api/users');
        console.log(data);
        $scope.userList = data
        $scope.$apply();
    }
    $scope.loadTaskList();

    $scope.excluirUser = (id) => {
        $http.delete(`http://localhost:3322/api/users/${id}`).then(() => {
            $scope.loadTaskList();
        })
    }
});
