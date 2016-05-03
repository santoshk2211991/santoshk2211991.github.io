'use strict';

angular.module('myApp.amortization', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/amortization', {
        templateUrl : 'ammortization/amortization.html',
        controller : 'AmortizationCtrl'
      });
    }
  ])

.controller('AmortizationCtrl', ['$scope', function ($scope) {
      $scope.val = '0';
      $scope.interest = '';
      $scope.loan = '';
      $scope.months = '';
      $scope.cusDur = '';
      $scope.checked = false;
      $scope.yearly = false;
      $scope.half = false;
      $scope.quaterly = false;
      $scope.customInp = false;

      $scope.val4 = '';
      $scope.formCount = '';
      $scope.formMnth = '';
      $scope.formPrincipal = '';

      $scope.date = '';

      function monthDifference(date1, date2) {
        console.log('entering function' + '------' + date2 + '------' + date1)
        var months;
        var d1y = date1.getFullYear();
        var d2y = date2.getFullYear();

        months = (d2y - d1y) * 12;

        months = Math.abs(months) + Math.abs(date2.getMonth() - date1.getMonth());
        // months = months + date2.getMonth();

        console.log(months);
        return months;

      }
      $scope.custom = function (x) {
        $scope.cusDur = x;
        $scope.customInp = true;

        if (x == 1) {
          /* $scope.yearly = true;
          $scope.half  = false;
          $scope.quaterly = false;
          $scope.customInp = false;*/
          $scope.val4 = 1;
          $scope.range();
          $scope.formMnth[0] = 12;
        } else if (x == 2) {
          /*$scope.yearly = false;
          $scope.half  = true;
          $scope.quaterly = false;
          $scope.customInp = false;*/
          $scope.val4 = 2;
          $scope.range();
          $scope.formMnth[0] = 6;
          $scope.formMnth[1] = 12;

        } else if (x == 3) {
          /*$scope.yearly = false;
          $scope.half  = false;
          $scope.quaterly = true;
          $scope.customInp = false;*/
          $scope.val4 = 4;
          $scope.range();
          $scope.formMnth[0] = 3;
          $scope.formMnth[1] = 6;
          $scope.formMnth[2] = 9;
          $scope.formMnth[3] = 12;
        } else if (x == 4) {
          /*  $scope.yearly = false;
          $scope.half  = false;
          $scope.quaterly = false;
          $scope.customInp = true;*/
          $scope.val4 = 0;
          $scope.range();
        } else {
          /*$scope.yearly = false;
          $scope.half  = false;
          $scope.quaterly = false;
          $scope.customInp = false;*/
          $scope.customInp = false;
        }

      }

      $scope.range = function () {
        var n = $scope.val4;
        console.log(typeof(n));
        $scope.formCount = new Array(parseInt(n));
        $scope.formMnth = new Array(parseInt(n));
        $scope.formPrincipal = new Array(parseInt(n));
      };

      $scope.compute1 = function () {

        $scope.checked = true;

        var i = ($scope.interest / 12) / 100;
        var P = $scope.loan;
        var n = $scope.months;
        var exp = Math.pow((1 + i), n);

        var dateEmpty = true;

        console.log($scope.date);
        if ($scope.date == '' || $scope.date == undefined) {
          var x = new Date();
          x.setMonth(x.getMonth() + 1);
        } else {
          var x = new Date($scope.date);
          dateEmpty = false;

        }

        console.log('interest' + i + ',loan' + P + ',months' + n);
        var amount = (i * P * exp) / (exp - 1);
        $scope.val = amount.toFixed(2);
        console.log('$scope.val' + $scope.val);

        $scope.totInt = 0;
        $scope.list = [];

        var tempBal = P;
        var tempInt;
        var tempPrincipal;
        for (var j = 0; j < n; j++) {

          var arr = {};
          tempInt = parseFloat(tempBal) * parseFloat(i);
          tempPrincipal = parseFloat(amount) - parseFloat(tempInt);

          for (var k = 0; k < $scope.val4; k++) {
            var formFieldDate = new Date($scope.formMnth[k]);

            console.log('formMnth- ' + monthDifference(x, formFieldDate));
            // console.log('j+1- '+(j+1));
            // if (parseInt($scope.formMnth[k]) == (j + 1)) {
            if (parseInt(monthDifference(x, formFieldDate)) == 0) {
              console.log($scope.formPrincipal[k]);
              if($scope.formPrincipal[k] == ''|| $scope.formPrincipal[k]==undefined){
                $scope.formPrincipal[k]=0;
              }
              console.log('found month ' + (j + 1) + 'amount' + $scope.formPrincipal[k])
              tempPrincipal = parseFloat(tempPrincipal) + parseFloat($scope.formPrincipal[k]);
              break;
            } else {
              /*flag=false;*/
            }
          }

          tempBal = parseFloat(tempBal) - parseFloat(tempPrincipal);

          $scope.totInt = parseFloat($scope.totInt) + parseFloat(tempInt);
          if (tempBal < 0) {

            console.log('balance less than 0');

            tempPrincipal = tempPrincipal + tempBal;
            tempBal = 0;

            var yDate = x.toDateString().split(' ');
            arr.tempDate = yDate[1] + '-' + yDate[3];
            arr.interest = tempInt.toFixed(2);
            arr.principal = tempPrincipal.toFixed(2);
            arr.balance = tempBal.toFixed(2);
            $scope.list.push(arr);
            x.setMonth(x.getMonth() + 1);

            break;
          } else {

            // x.setMonth(x.getMonth()+1);
            var yDate = x.toDateString().split(' ');
            arr.tempDate = yDate[1] + '-' + yDate[3];
            arr.interest = tempInt.toFixed(2);
            arr.principal = tempPrincipal.toFixed(2);
            arr.balance = tempBal.toFixed(2);

            $scope.list.push(arr);
            x.setMonth(x.getMonth() + 1);

          }

          console.log(i);
        }

        $scope.totAmt = parseFloat($scope.totInt) + parseFloat(P);
        $scope.totAmt = $scope.totAmt.toFixed(2);
        $scope.totInt = $scope.totInt.toFixed(2);
        console.log($scope.list);
      }
    }
  ]);
