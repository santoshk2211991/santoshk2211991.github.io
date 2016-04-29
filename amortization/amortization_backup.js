'use strict';

angular.module('myApp.amortization', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/amortization', {
    templateUrl: 'amortization/amortization.html',
    controller: 'AmortizationCtrl'
  });
}])

.controller('AmortizationCtrl', ['$scope',function($scope) {
   $scope.val = '0'; 
   $scope.interest ='';
   $scope.loan = '';
   $scope.months = '';
   $scope.cusDur = '';
   $scope.checked = false;
   $scope.yearly = false;
   $scope.half  = false;
   $scope.quaterly = false;
   $scope.customInp = false;

   $scope.val4='';
   $scope.formCount ='';
   $scope.formMnth='';
   $scope.formPrincipal='';

$scope.custom = function(x) {
    $scope.cusDur = x;
    if (x==1){
 $scope.yearly = true;
   $scope.half  = false;
   $scope.quaterly = false;
   $scope.customInp = false;
    }
    else if(x==2){
 $scope.yearly = false;
   $scope.half  = true;
   $scope.quaterly = false;
   $scope.customInp = false;
    }
    else if(x==3){
        $scope.yearly = false;
   $scope.half  = false;
   $scope.quaterly = true; 
   $scope.customInp = false;
    }
    else if(x==4){
        $scope.yearly = false;
   $scope.half  = false;
   $scope.quaterly = false;
   $scope.customInp = true;
    }
     else{
        $scope.yearly = false;
   $scope.half  = false;
   $scope.quaterly = false;
   $scope.customInp = false;
    }

}


$scope.compute2 = function() {


}
$scope.range = function() {
        var n= $scope.val4;
        console.log(typeof(n));
        $scope.formCount= new Array(parseInt(n));
        $scope.formMnth= new Array(parseInt(n));
        $scope.formPrincipal= new Array(parseInt(n));
    };

    $scope.compute1 = function() {
$scope.checked = true;

    	var i = ($scope.interest/12)/100;
/*    	i= i/100;
*/
    	var P = $scope.loan;
    	var n = $scope.months;
    	var exp = Math.pow((1+ i),n);
    	/*var temp = i* P*exp;
    	console.log('temp '+ temp+'exp'+exp);
    	*/console.log('interest'+i+',loan'+P+',months'+n);
    var amount = (i*P*exp)/(exp-1);
    $scope.val = amount.toFixed(2);
   /* $scope.totAmt = amount*n;
    $scope.totAmt = $scope.totAmt.toFixed(2);*/
    /*$scope.totInt = $scope.totAmt-P;
    $scope.totInt = $scope.totInt.toFixed(2);*/
    $scope.totInt = 0;

    $scope.list = [];
    /*
*/    /*$scope.list.interest= [];
    $scope.list.principal = [];*/
    var interest;
    var principal;
    var tempBal = P;
    var tempPrincipal;
    var tempInt;

    for (var j=0 ;j<n;j++){
    	var arr= {};
    	tempInt = tempBal*i;
        var flag=false;

        for (var k=0;k<$scope.val4;k++){
            if(parseInt($scope.formMnth[k])==(j+1))
            {
                console.log('found month '+ (j+1)+'amount'+$scope.formPrincipal[k])
                flag=true;
                break;
            }
            else{flag=false;}
        }
        if(flag==true){
        tempPrincipal = amount-tempInt;
        tempPrincipal+=parseInt($scope.formPrincipal)
        console.log('flag==true:k:'+ k +'tempPrincipal'+(tempPrincipal+parseInt($scope.formPrincipal)));
        }
        else{
        tempPrincipal = amount-tempInt;
        console.log('flag:false');
 
        }
                tempBal= tempBal - tempPrincipal;


    	console.log(tempInt+'---------'+tempPrincipal+'----------'+tempBal);

    	arr.interest = tempInt.toFixed(2);
        var flag1 = false;
        if (tempBal<0){
            console.log('tempBal<0');
            flag1=true;
            tempPrincipal=tempPrincipal+tempBal;
                                arr.principal = tempPrincipal.toFixed(2);
                                tempBal=0;
        }
        else{
                    arr.principal = tempPrincipal.toFixed(2);

        }
    	arr.balance = tempBal.toFixed(2);
    	$scope.list.push(arr);
        $scope.totInt = parseFloat($scope.totInt) + parseFloat(tempInt) ;
        console.log($scope.totInt);
        if(flag1){
            break;
        }
        /*if(j==(n-1)){
            $scope.totAmt = 
            $scope.totInt =
        }*/
/*    	console.log($scope.list.interest + '-------' + $scope.list.principal);
*/    }
    

    $scope.totAmt = parseFloat($scope.totInt) + parseFloat(P);
    $scope.totAmt = $scope.totAmt.toFixed(2);
    $scope.totInt = $scope.totInt.toFixed(2);
    console.log($scope.list);
     console.log($scope.cusDur);
     console.log($scope.formCount);
     console.log($scope.formMnth);
     console.log($scope.formPrincipal);
  };
}]);


